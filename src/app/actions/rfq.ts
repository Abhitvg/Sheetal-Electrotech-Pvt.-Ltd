"use server";

import { z } from "zod";
import { Resend } from "resend";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { headers } from "next/headers";

const rfqSchema = z.object({
  categories: z.array(z.string()).min(1, "Please select at least one category"),
  volume: z.string().min(1, "Monthly volume is required"),
  timeline: z.string().min(1, "Timeline is required"),
  notes: z.string().optional(),
  fullName: z.string().min(1, "Full name is required"),
  company: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  honeypot: z.string().max(0, "Spam detected").optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

// Simple in-memory rate limiter (resets on serverless cold starts, but provides baseline protection)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

export async function submitRfq(formData: FormData) {
  try {
    // 1. Rate Limiting
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const rateData = rateLimitMap.get(ip);

    if (rateData && now - rateData.timestamp < RATE_LIMIT_WINDOW_MS) {
      if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
        return { success: false, message: "Too many submissions. Please try again later." };
      }
      rateLimitMap.set(ip, { count: rateData.count + 1, timestamp: rateData.timestamp });
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    // 2. Check honeypot
    const honeypot = formData.get("website");
    if (honeypot) {
      console.warn("Spam bot detected via honeypot.");
      return { success: true, message: "RFQ submitted successfully." };
    }

    // 3. Parse and validate
    const categories = formData.getAll("categories") as string[];
    const rawData = {
      categories,
      volume: formData.get("volume") as string,
      timeline: formData.get("timeline") as string,
      notes: formData.get("notes") as string,
      fullName: formData.get("fullName") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      honeypot: honeypot as string,
      utm_source: formData.get("utm_source") as string || "",
      utm_medium: formData.get("utm_medium") as string || "",
      utm_campaign: formData.get("utm_campaign") as string || "",
    };

    const validatedData = rfqSchema.parse(rawData);

    // 4. File Upload (Vercel Blob)
    const file = formData.get("file") as File | null;
    let attachmentUrls: string[] = [];

    if (file && file.size > 0) {
      if (file.size > 20 * 1024 * 1024) {
        return { success: false, message: "File exceeds 20MB limit." };
      }
      
      const fileName = file.name.toLowerCase();
      if (!fileName.endsWith('.pdf') && !fileName.endsWith('.dxf') && !fileName.endsWith('.step') && !fileName.endsWith('.stp') && !fileName.endsWith('.dwg')) {
         return { success: false, message: "Invalid file type. Only PDF, DXF, STEP, or DWG allowed." };
      }

      try {
        const storageRef = ref(storage, `rfq-uploads/${Date.now()}-${file.name}`);
        const arrayBuffer = await file.arrayBuffer();
        await uploadBytes(storageRef, arrayBuffer, { contentType: file.type });
        const downloadUrl = await getDownloadURL(storageRef);
        attachmentUrls.push(downloadUrl);
      } catch (uploadError) {
        console.error("Firebase upload error:", uploadError);
        return { success: false, message: "Failed to upload file." };
      }
    }

    // 5. Persist to DB
    const adminLink = "https://sheetal-electrotech-pvt-ltd.vercel.app/admin/rfqs";
    const dbRecord = {
      status: 'new',
      product_categories: validatedData.categories,
      monthly_volume: validatedData.volume,
      target_delivery: validatedData.timeline,
      additional_notes: validatedData.notes || "",
      full_name: validatedData.fullName,
      company: validatedData.company,
      work_email: validatedData.email,
      phone: validatedData.phone,
      attachment_urls: attachmentUrls,
      utm_source: validatedData.utm_source,
      utm_medium: validatedData.utm_medium,
      utm_campaign: validatedData.utm_campaign,
    };

    try {
      const dbRecordWithTime = {
        ...dbRecord,
        created_at: new Date().toISOString(),
      };
      await addDoc(collection(db, "rfq_submissions"), dbRecordWithTime);
    } catch (dbError) {
      console.error("Firebase insert error:", dbError);
      throw new Error("Failed to save RFQ data.");
    }

    // 6. Send Emails
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      // To Sales
      await resend.emails.send({
        from: "RFQ System <rfq@sheetalelectrotech.com>",
        to: "sales@sheetalelectrotech.com", // update to actual sales email
        subject: `New RFQ — ${validatedData.company} (${validatedData.categories.join(", ")})`,
        text: `New RFQ submitted on the website.

Company: ${validatedData.company}
Contact: ${validatedData.fullName} — ${validatedData.email} / ${validatedData.phone}

Sourcing: ${validatedData.categories.join(", ")}
Monthly volume: ${validatedData.volume}
Target delivery: ${validatedData.timeline}

Notes:
${validatedData.notes || "None"}

Attachments: ${attachmentUrls.join(", ")}

Submitted: ${new Date().toISOString()}

View in admin: ${adminLink}`,
      });

      // To Customer
      await resend.emails.send({
        from: "Sheetal Electrotech <rfq@sheetalelectrotech.com>",
        to: validatedData.email,
        subject: "We've received your RFQ — Sheetal Electrotech",
        text: `Hi ${validatedData.fullName},

Thanks for reaching out. We've received your specification for ${validatedData.categories.join(", ")} and our engineering team is reviewing it now.

Here's what happens next:
1. Technical review — within 4 hours
2. Capability check against our in-house facilities
3. A detailed production proposal with pricing, lead times, and MOQs — within 48 hours

If you have drawings or specs you didn't attach, just reply to this email and we'll add them to your request.

— Sheetal Electrotech`,
      });
    }

    return { success: true, message: "RFQ submitted successfully." };

  } catch (error: any) {
    console.error("RFQ Submission Error:", error);
    if (error && error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
      return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}
