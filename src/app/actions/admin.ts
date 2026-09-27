"use server";

import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function updateRfqStatus(id: string, status: string, internalNotes: string) {
  try {
    const rfqRef = doc(db, "rfq_submissions", id);
    await updateDoc(rfqRef, { status, internal_notes: internalNotes });
  } catch (error) {
    console.error("Update error:", error);
    return { success: false, message: "Failed to update RFQ status" };
  }

  revalidatePath("/admin/rfqs");
  return { success: true };
}
