import React from "react";

export default function Textarea({
  label,
  error,
  hint,
  className = "",
  textareaClassName = "",
  id,
  ...props
}) {
  const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s+/g, "-") || "field"}`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="mb-1.5 block text-xs font-medium text-[#111827]">
          {label}{props.required && <span className="ml-0.5 text-[#dc2626]">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        className={[
          "min-h-24 w-full resize-y rounded-lg border bg-white px-3 py-2.5 text-sm",
          "text-[#111827] placeholder:text-[#9ca3af] outline-none transition-all duration-200",
          "focus:border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/10",
          "disabled:cursor-not-allowed disabled:bg-[#f3f4f6]",
          error ? "border-[#dc2626]" : "border-[#e5e7eb]",
          textareaClassName,
        ].join(" ")}
        {...props}
      />
      {error ? <p className="mt-1 text-[11px] text-[#dc2626]">{error}</p> : hint ? <p className="mt-1 text-[11px] text-[#6b7280]">{hint}</p> : null}
    </div>
  );
}