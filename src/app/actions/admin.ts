"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export async function updateRfqStatus(id: string, status: string, internalNotes: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing Supabase credentials");
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { error } = await supabase
    .from("rfq_submissions")
    .update({ status, internal_notes: internalNotes })
    .eq("id", id);

  if (error) {
    console.error("Update error:", error);
    return { success: false, message: "Failed to update RFQ status" };
  }

  revalidatePath("/admin/rfqs");
  return { success: true };
}
