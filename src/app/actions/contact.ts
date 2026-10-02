"use server";

import { z } from "zod";
import { Resend } from "resend";
import { neon } from "@neondatabase/serverless";
import { headers } from "next/headers";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120, "Name is too long"),
  email: z.string().trim().email("Invalid email address").max(320, "Email is too long"),
  phone: z.string().trim().max(100, "Phone number is too long").optional(),
  company: z.string().trim().max(160, "Company name is too long").optional(),
  subject: z.string().trim().min(1, "Subject is required").max(120, "Subject is too long"),
  message: z.string().trim().min(1, "Message is required").max(5000, "Message is too long"),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

const RATE_LIMIT_WINDOW_MINUTES = 10;
const MAX_REQUESTS_PER_WINDOW = 5;

async function checkContactRateLimit(ip: string) {
  if (!process.env.DATABASE_URL) {
    return true;
  }

  const sql = neon(process.env.DATABASE_URL);

  await sql`
    CREATE TABLE IF NOT EXISTS contact_rate_limits (
      ip_address TEXT PRIMARY KEY,
      window_started_at TIMESTAMPTZ NOT NULL,
      request_count INTEGER NOT NULL DEFAULT 0
    )
  `;

  const rows = await sql`
    INSERT INTO contact_rate_limits (ip_address, window_started_at, request_count)
    VALUES (${ip}, NOW(), 1)
    ON CONFLICT (ip_address) DO UPDATE
    SET
      request_count = CASE
        WHEN NOW() - contact_rate_limits.window_started_at < INTERVAL '10 minutes'
          THEN contact_rate_limits.request_count + 1
        ELSE 1
      END,
      window_started_at = CASE
        WHEN NOW() - contact_rate_limits.window_started_at < INTERVAL '10 minutes'
          THEN contact_rate_limits.window_started_at
        ELSE NOW()
      END
    RETURNING request_count
  `;

  return Number(rows[0]?.request_count ?? 1) <= MAX_REQUESTS_PER_WINDOW;
}

export async function submitContact(formData: FormData) {
  try {
    const honeypot = String(formData.get("website") ?? "");

    if (honeypot) {
      return { success: true, message: "Message sent successfully." };
    }

    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || headersList.get("x-real-ip") || "unknown";

    const allowed = await checkContactRateLimit(ip);
    if (!allowed) {
      return { success: false, message: "Too many submissions. Please try again later." };
    }

    const rawData = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      company: String(formData.get("company") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
      honeypot,
    };

    const validatedData = contactSchema.parse(rawData);

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return {
        success: false,
        message: "Contact service is temporarily unavailable."
      };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Contact Form <info@sheetalelectrotech.com>",
      to: "info@sheetalelectrotech.com", // update to actual email
      subject: `Contact Form: ${validatedData.subject}`,
      text: `New contact message from ${validatedData.name} (${validatedData.email}):\n\nCompany: ${validatedData.company || "N/A"}\nPhone: ${validatedData.phone || "N/A"}\n\nMessage:\n${validatedData.message}`,
    });

    return { success: true, message: "Message sent successfully." };
  } catch (error: any) {
    console.error("Contact Submission Error:", error);
    if (error && error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
      return { success: false, message: error.errors[0].message };
    }
    return { success: false, message: "Failed to send message." };
  }
}
