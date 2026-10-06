import React from "react";

export default function FormField({
  label,
  required = false,
  error,
  hint,
  children,
  className = "",
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-medium text-[#111827]">
          {label}
          {required && <span className="ml-0.5 text-[#dc2626]">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-[11px] text-[#dc2626]">{error}</p>
      ) : hint ? (
        <p className="text-[11px] text-[#6b7280]">{hint}</p>
      ) : null}
    </div>
  );
}