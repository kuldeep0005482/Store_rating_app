import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, MoreVertical } from "lucide-react";

export default function Dropdown({ label = "Actions", iconOnly = false, items = [], className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-3 text-xs font-semibold text-[#374151] transition hover:border-[#dc2626] hover:text-[#dc2626]"
      >
        {iconOnly ? <MoreVertical size={16} /> : <>{label}<ChevronDown size={15} className={open ? "rotate-180 transition" : "transition"} /></>}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 min-w-44 origin-top-right animate-in fade-in zoom-in-95 rounded-xl border border-[#e5e7eb] bg-white p-1.5 shadow-xl">
          {items.map((item, i) => (
            <button
              key={item.label || i}
              onClick={() => { item.onClick?.(); setOpen(false); }}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition hover:bg-[#fff1f2] ${item.danger ? "text-[#dc2626]" : "text-[#374151]"}`}
            >
              {item.icon && <item.icon size={15} />}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}