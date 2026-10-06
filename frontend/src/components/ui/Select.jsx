import React from "react";
import { ChevronDown } from "lucide-react";

export default function Select({
  label,
  error,
  options = [],
  placeholder = "Select an option",
  className = "",
  ...props
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="mb-1.5 block text-xs font-medium text-[#111827]">
          {label}{props.required && <span className="ml-0.5 text-[#dc2626]">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          className={[
            "h-10 w-full appearance-none rounded-lg border bg-white px-3 pr-9 text-sm",
            "text-[#111827] outline-none transition-all duration-200",
            "focus:border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/10",
            error ? "border-[#dc2626]" : "border-[#e5e7eb]",
          ].join(" ")}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value ?? option} value={option.value ?? option}>
              {option.label ?? option}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280]" />
      </div>
      {error && <p className="mt-1 text-[11px] text-[#dc2626]">{error}</p>}
    </div>
  );
}