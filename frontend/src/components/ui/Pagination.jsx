import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page = 1, totalPages = 1, onChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => totalPages <= 7 || p === 1 || p === totalPages || Math.abs(p - page) <= 2);

  return (
    <div className="flex items-center justify-between gap-3 text-xs">
      <button disabled={page <= 1} onClick={() => onChange?.(page - 1)} className="inline-flex h-9 items-center gap-1 rounded-lg border border-[#e5e7eb] px-3 font-medium text-[#4b5563] disabled:opacity-40"><ChevronLeft size={14} /> Previous</button>
      <div className="flex items-center gap-1">
        {pages.map((p, i) => (
          <React.Fragment key={p}>
            {i > 0 && p - pages[i - 1] > 1 && <span className="px-1 text-[#9ca3af]">...</span>}
            <button onClick={() => onChange?.(p)} className={`h-9 min-w-9 rounded-lg px-2 font-semibold ${page === p ? "bg-[#dc2626] text-white" : "text-[#374151] hover:bg-[#f3f4f6]"}`}>{p}</button>
          </React.Fragment>
        ))}
      </div>
      <button disabled={page >= totalPages} onClick={() => onChange?.(page + 1)} className="inline-flex h-9 items-center gap-1 rounded-lg border border-[#e5e7eb] px-3 font-medium text-[#4b5563] disabled:opacity-40">Next <ChevronRight size={14} /></button>
    </div>
  );
}