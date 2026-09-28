import Link from "next/link";
import { LogOut, Inbox, FileText, LayoutDashboard } from "lucide-react";
import "../globals.css"; // Ensure globals CSS is loaded here since it's outside [locale]

export const metadata = {
  title: "Sheetal Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-slate-50 text-ink">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
          <div className="p-6 border-b border-slate-200">
            <h2 className="font-display font-bold text-xl text-ink">Admin Panel</h2>
            <p className="text-sm text-steel">Sheetal Group</p>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Link
              href="/admin/rfqs"
              className="flex items-center gap-3 px-4 py-3 rounded-md text-steel hover:text-accent hover:bg-slate-50 transition-colors"
            >
              <Inbox className="w-5 h-5" />
              RFQ Leads
            </Link>
            <Link
              href="/admin/blog"
              className="flex items-center gap-3 px-4 py-3 rounded-md text-steel hover:text-accent hover:bg-slate-50 transition-colors"
            >
              <FileText className="w-5 h-5" />
              Manage Blog
            </Link>
          </nav>
          <div className="p-4 border-t border-slate-200">
            <Link
              href="/api/auth/signout"
              className="flex items-center justify-center gap-2 w-full py-2 bg-slate-100 text-steel hover:bg-slate-200 rounded-md transition-colors text-sm font-medium"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-mist">
          {children}
        </main>
      </body>
    </html>
  );
}
