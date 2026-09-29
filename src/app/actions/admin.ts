"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";

const VALID_STATUSES = ["new", "contacted", "quoted", "won", "lost"] as const;

export async function updateRfqStatus(id: string, status: string, internalNotes: string) {
  if (!process.env.DATABASE_URL) {
    return { success: false, message: "Database is not configured." };
  }

  if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
    return { success: false, message: "Invalid RFQ status." };
  }

  if (!id || internalNotes.length > 5000) {
    return { success: false, message: "Invalid RFQ update." };
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    await sql`
      UPDATE rfq_submissions
      SET status = ${status}, internal_notes = ${internalNotes}
      WHERE id = ${id}
    `;
    revalidatePath("/admin/rfqs");
    return { success: true };
  } catch (error) {
    console.error("RFQ status update error:", error);
    return { success: false, message: "Failed to update RFQ status." };
  }
}
