import React from "react";
import { X } from "lucide-react";

export default function FilterChip({ label, value, onRemove, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md bg-[#eff6ff] px-2.5 py-1.5 text-[11px] font-medium text-[#2563eb] ${className}`}>
      {label}: <strong>{value}</strong>
      <button onClick={onRemove} className="rounded-full hover:bg-[#dbeafe]"><X size={12} /></button>
    </span>
  );
}