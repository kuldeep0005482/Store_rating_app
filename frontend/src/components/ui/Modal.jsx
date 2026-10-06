import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ open, onClose, title, description, children, footer, size = "md" }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [open, onClose]);

  if (!open) return null;

  const widths = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 animate-in fade-in bg-black/50 backdrop-blur-[2px]" />
      <div className={`relative w-full ${widths[size]} animate-in fade-in zoom-in-95 rounded-xl bg-white shadow-2xl`}>
        <div className="flex items-start justify-between border-b border-[#e5e7eb] px-5 py-4">
          <div>
            <h2 className="text-base font-bold text-[#111827]">{title}</h2>
            {description && <p className="mt-0.5 text-xs text-[#6b7280]">{description}</p>}
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]"><X size={17} /></button>
        </div>
        <div className="p-5">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-[#e5e7eb] px-5 py-3">{footer}</div>}
      </div>
    </div>
  );
}