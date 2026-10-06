import React from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search by name, email, or address...", className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]" />
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white pl-9 pr-9 text-sm outline-none transition focus:border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/10"
      />
      {value && (
        <button onClick={() => onChange?.("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#374151]">
          <X size={15} />
        </button>
      )}
    </div>
  );
}