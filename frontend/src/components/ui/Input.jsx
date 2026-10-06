import React from "react";

export default function Input({
  label,
  error,
  hint,
  icon: Icon,
  className = "",
  inputClassName = "",
  id,
  ...props
}) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-") || "field"}`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-xs font-medium text-[#111827]">
          {label}
          {props.required && <span className="ml-0.5 text-[#dc2626]">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280]"
          />
        )}
        <input
          id={inputId}
          className={[
            "h-10 w-full rounded-lg border bg-white px-3 text-sm text-[#111827]",
            "placeholder:text-[#9ca3af] outline-none transition-all duration-200",
            "focus:border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/10",
            "disabled:cursor-not-allowed disabled:bg-[#f3f4f6]",
            error ? "border-[#dc2626] pr-9" : "border-[#e5e7eb]",
            Icon ? "pl-9" : "",
            inputClassName,
          ].join(" ")}
          {...props}
        />
        {error && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#dc2626]">!</span>}
      </div>
      {error ? (
        <p className="mt-1 text-[11px] text-[#dc2626]">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-[11px] text-[#6b7280]">{hint}</p>
      ) : null}
    </div>
  );
}