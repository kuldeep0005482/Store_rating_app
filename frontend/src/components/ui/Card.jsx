import React from "react";

export default function Card({ children, title, description, action, className = "", contentClassName = "" }) {
  return (
    <section className={`rounded-xl border border-[#e5e7eb] bg-white shadow-[0_1px_3px_rgba(0,0,0,.04)] ${className}`}>
      {(title || description || action) && (
        <header className="flex items-start justify-between border-b border-[#f1f5f9] px-5 py-4">
          <div>
            {title && <h3 className="text-sm font-bold text-[#111827]">{title}</h3>}
            {description && <p className="mt-0.5 text-xs text-[#6b7280]">{description}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={contentClassName || "p-5"}>{children}</div>
    </section>
  );
}