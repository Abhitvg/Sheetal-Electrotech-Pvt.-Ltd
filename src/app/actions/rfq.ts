"use server";

import { z } from "zod";
import { Resend } from "resend";
import { put } from "@vercel/blob";
import { neon } from "@neondatabase/serverless";
import { headers } from "next/headers";

const rfqSchema = z.object({
  categories: z.array(z.string()).min(1, "Please select at least one category"),
  volume: z.string().min(1, "Monthly volume is required"),
  timeline: z.string().min(1, "Timeline is required"),
  notes: z.string().optional(),
  fullName: z.string().min(1, "Full name is required"),
  company: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(100).optional(),
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
    const categories = formData.getAll("categories").map(String);
    const rawData = {
      categories,
      volume: String(formData.get("volume") ?? ""),
      timeline: String(formData.get("timeline") ?? ""),
      notes: String(formData.get("notes") ?? ""),
      fullName: String(formData.get("fullName") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      honeypot,
      utm_source: String(formData.get("utm_source") ?? ""),
      utm_medium: String(formData.get("utm_medium") ?? ""),
      utm_campaign: String(formData.get("utm_campaign") ?? ""),
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
        const blob = await put(`rfq-uploads/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`, file, {
          access: 'public',
        });
        attachmentUrls.push(blob.url);
      } catch (uploadError) {
        console.error("Vercel Blob upload error:", uploadError);
        return { success: false, message: "Failed to upload file." };
      }
    }

    try {
      if (process.env.DATABASE_URL) {
        const sql = neon(process.env.DATABASE_URL);
        await sql`
          INSERT INTO rfq_submissions 
           (product_categories, monthly_volume, target_delivery, additional_notes, full_name, company, work_email, phone, attachment_urls, utm_source, utm_medium, utm_campaign)
           VALUES (
             ${validatedData.categories}, 
             ${validatedData.volume}, 
             ${validatedData.timeline}, 
             ${validatedData.notes || ""}, 
             ${validatedData.fullName}, 
             ${validatedData.company}, 
             ${validatedData.email}, 
             ${validatedData.phone}, 
             ${attachmentUrls}, 
             ${validatedData.utm_source}, 
             ${validatedData.utm_medium}, 
             ${validatedData.utm_campaign}
           )
        `;
      } else {
        console.error("DATABASE_URL is not configured");
        return { success: false, message: "RFQ service is temporarily unavailable." };
      }
    } catch (dbError) {
      console.error("Postgres insert error:", dbError);
      throw new Error("Failed to save RFQ data.");
    }

    const adminLink = "https://sheetalelectrotech.com/admin/rfqs";
    // 6. Send Emails
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return { success: false, message: "RFQ service is temporarily unavailable." };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // To Sales
      await resend.emails.send({
        from: "Sheetal Electrotech RFQ <info@sheetalelectrotech.com>",
        to: process.env.RFQ_SALES_EMAIL || "info@sheetalelectrotech.com",
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
        from: "Sheetal Electrotech <info@sheetalelectrotech.com>",
        to: validatedData.email,
        subject: "We've received your RFQ — Sheetal Electrotech",
        text: `Hi ${validatedData.fullName},

Thanks for reaching out. We've received your specification for ${validatedData.categories.join(", ")} and our engineering team is reviewing it now.

Here's what happens next:
1. Technical review
2. Capability check against our in-house facilities
3. A detailed production proposal with pricing, lead times, and MOQs

If you have drawings or specs you didn't attach, just reply to this email and we'll add them to your request.

— Sheetal Electrotech`,
    });

    return { success: true, message: "RFQ submitted successfully." };

  } catch (error: any) {
    console.error("RFQ Submission Error:", error);
    if (error && error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
      return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}
