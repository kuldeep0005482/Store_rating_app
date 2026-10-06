import React from "react";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-[#6b7280]" aria-label="Breadcrumb">
      <Home size={14} />
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <ChevronRight size={13} className="text-[#9ca3af]" />
          <span className={i === items.length - 1 ? "font-semibold text-[#dc2626]" : ""}>{item.label ?? item}</span>
        </React.Fragment>
      ))}
    </nav>
  );
}