import { neon } from "@neondatabase/serverless";
import RfqRow from "./RfqRow";
import { LogOut } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Admin - RFQ Submissions",
};

export const revalidate = 0; // Disable static rendering for this page

export default async function AdminRfqPage() {
  let rfqs: any[] = [];

  try {
    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL);
      rfqs = await sql`
        SELECT id, created_at, status, product_categories, monthly_volume,
               target_delivery, additional_notes, full_name, company,
               work_email, phone, attachment_urls, attachment_paths, utm_source, internal_notes
        FROM rfq_submissions
        ORDER BY created_at DESC
      `;
    } else {
      console.error("DATABASE_URL is not configured");
    }
  } catch (error) {
    console.error("Failed to fetch RFQs:", error);
  }

  // Generate CSV data for export
  const csvEscape = (value: unknown) => {
    const text = String(value ?? "");
    return `"${text.replace(/"/g, '""')}"`;
  };

  const csvHeaders = ["Date", "Company", "Contact", "Email", "Phone", "Status", "Volume", "Timeline", "Source"];
  const csvRows = rfqs.map((r) => [
    new Date(r.created_at).toISOString(),
    r.company,
    r.full_name,
    r.work_email,
    r.phone,
    r.status,
    r.monthly_volume,
    r.target_delivery,
    r.utm_source || "direct",
  ].map(csvEscape).join(","));

  const csvContent = [csvHeaders.map(csvEscape).join(","), ...csvRows].join("\\n");
  const dataUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;

  return (
    <div className="bg-mist p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-ink">RFQ Pipeline</h1>
            <p className="text-steel">Manage and update incoming manufacturing requests.</p>
          </div>
          <div className="flex gap-4">
            <a href={dataUri} download="rfq_export.csv" className="btn-primary bg-white text-ink border border-steel/20 hover:bg-slate-50">
              Export CSV
            </a>
            <Link href="/api/auth/signout" className="btn-primary flex items-center gap-2">
              Sign Out <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="bg-white border border-steel/20 rounded-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-steel/20">
              <tr>
                <th className="p-4 font-mono text-xs uppercase tracking-wider text-steel font-medium">Lead Info</th>
                <th className="p-4 font-mono text-xs uppercase tracking-wider text-steel font-medium">Requirements</th>
                <th className="p-4 font-mono text-xs uppercase tracking-wider text-steel font-medium">Notes & Files</th>
                <th className="p-4 font-mono text-xs uppercase tracking-wider text-steel font-medium w-48">Status & Internal Notes</th>
              </tr>
            </thead>
            <tbody>
              {rfqs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-steel">
                    No RFQ submissions found or database disconnected.
                  </td>
                </tr>
              ) : (
                rfqs.map(rfq => (
                  <RfqRow key={rfq.id} rfq={rfq} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
