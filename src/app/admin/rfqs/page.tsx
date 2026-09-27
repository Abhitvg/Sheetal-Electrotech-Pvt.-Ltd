import { createClient } from "@supabase/supabase-js";
import RfqRow from "./RfqRow";
import { LogOut } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Admin - RFQ Submissions",
};

export default async function AdminRfqPage() {
  let rfqs: any[] = [];
  
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from("rfq_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      rfqs = data;
    } else {
      console.error("Failed to fetch RFQs:", error);
    }
  }

  // Generate CSV data for export
  const csvHeaders = ["Date", "Company", "Contact", "Email", "Phone", "Status", "Volume", "Timeline", "Source"];
  const csvRows = rfqs.map(r => [
    new Date(r.created_at).toLocaleDateString(),
    `"${r.company}"`,
    `"${r.full_name}"`,
    r.work_email,
    r.phone,
    r.status,
    `"${r.monthly_volume}"`,
    `"${r.target_delivery}"`,
    r.utm_source || "direct"
  ].join(","));
  
  const csvContent = [csvHeaders.join(","), ...csvRows].join("\\n");
  const dataUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;

  return (
    <div className="min-h-screen bg-mist p-8">
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
