"use client";

import { useState } from "react";
import { updateRfqStatus } from "@/app/actions/admin";
import { Loader2 } from "lucide-react";

export default function RfqRow({ rfq }: { rfq: any }) {
  const [status, setStatus] = useState(rfq.status);
  const [notes, setNotes] = useState(rfq.internal_notes || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    await updateRfqStatus(rfq.id, status, notes);
    setLoading(false);
  };

  return (
    <tr className="border-b border-steel/10 text-sm">
      <td className="p-4 align-top">
        <p className="font-medium text-ink">{rfq.company}</p>
        <p className="text-steel">{rfq.full_name}</p>
        <p className="text-steel/70 text-xs">{rfq.work_email} | {rfq.phone}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {rfq.product_categories?.map((cat: string) => (
             <span key={cat} className="bg-mist text-accent px-2 py-0.5 rounded text-xs">{cat}</span>
          ))}
        </div>
      </td>
      <td className="p-4 align-top">
        <p className="text-ink">Vol: {rfq.monthly_volume}</p>
        <p className="text-ink">Timeline: {rfq.target_delivery}</p>
        <div className="mt-2 text-xs text-steel">
          <strong>Source:</strong> {rfq.utm_source || "direct"}<br/>
          <strong>Date:</strong> {new Date(rfq.created_at).toLocaleDateString()}
        </div>
      </td>
      <td className="p-4 align-top max-w-xs">
        <p className="text-steel text-xs line-clamp-3 mb-2">{rfq.additional_notes || "No notes."}</p>
        {rfq.attachment_urls && rfq.attachment_urls.length > 0 && (
          <a href={rfq.attachment_urls[0]} target="_blank" rel="noreferrer" className="text-accent text-xs hover:underline">
            View Attachment
          </a>
        )}
      </td>
      <td className="p-4 align-top">
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-steel/20 px-2 py-1 bg-white text-ink text-xs mb-2 focus:border-accent"
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="quoted">Quoted</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
        <textarea 
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Internal notes..."
          className="w-full border border-steel/20 px-2 py-1 bg-white text-ink text-xs h-16 resize-none focus:border-accent mb-2"
        />
        <button 
          onClick={handleUpdate} 
          disabled={loading || (status === rfq.status && notes === (rfq.internal_notes || ""))}
          className="bg-accent text-ink text-xs px-3 py-1 w-full flex items-center justify-center hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Save"}
        </button>
      </td>
    </tr>
  );
}
