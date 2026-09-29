import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { get } from "@vercel/blob";
import { neon } from "@neondatabase/serverless";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return new Response("Database is not configured", { status: 503 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return new Response("Missing RFQ id", { status: 400 });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`
      SELECT attachment_paths
      FROM rfq_submissions
      WHERE id = ${id}
      LIMIT 1
    `;

    const pathname = rows[0]?.attachment_paths?.[0];
    if (!pathname) {
      return new Response("Attachment not found", { status: 404 });
    }

    const result = await get(pathname, { access: "private" });
    if (!result) {
      return new Response("Attachment not found", { status: 404 });
    }

    return new Response(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType || "application/octet-stream",
        "Content-Disposition": `inline; filename="${result.blob.pathname.split("/").pop()?.replace(/"/g, "") || "attachment"}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("RFQ attachment retrieval error:", error);
    return new Response("Unable to retrieve attachment", { status: 500 });
  }
}
