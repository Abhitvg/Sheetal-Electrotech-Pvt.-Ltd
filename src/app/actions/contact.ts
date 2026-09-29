"use server";

import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export async function submitContact(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
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
