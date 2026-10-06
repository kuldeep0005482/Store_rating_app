import React from "react";

export default function Tabs({ items = [], value, onChange, className = "" }) {
  return (
    <div className={`flex border-b border-[#e5e7eb] ${className}`}>
      {items.map((item) => {
        const active = value === item.value;
        return (
          <button
            key={item.value}
            onClick={() => onChange?.(item.value)}
            className={`relative px-4 py-3 text-xs font-semibold transition-colors ${active ? "text-[#dc2626]" : "text-[#4b5563] hover:text-[#111827]"}`}
          >
            {item.label}
            {active && <span className="absolute inset-x-0 bottom-[-1px] h-0.5 bg-[#dc2626]" />}
          </button>
        );
      })}
    </div>
  );
}