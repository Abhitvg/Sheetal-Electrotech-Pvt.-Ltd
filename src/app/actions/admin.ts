"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const VALID_STATUSES = ["new", "contacted", "quoted", "won", "lost"] as const;

export async function updateRfqStatus(id: number | string, status: string, internalNotes: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { success: false, message: "Unauthorized." };
  }

  if (!process.env.DATABASE_URL) {
    return { success: false, message: "Database is not configured." };
  }

  if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
    return { success: false, message: "Invalid RFQ status." };
  }

  if (id === "" || id === null || id === undefined || internalNotes.length > 5000) {
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
