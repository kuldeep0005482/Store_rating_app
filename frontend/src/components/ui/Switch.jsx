import React from "react";

export default function Switch({ checked = false, onChange, disabled = false, label, className = "" }) {
  return (
    <label className={`inline-flex items-center gap-2 ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${checked ? "bg-[#dc2626]" : "bg-[#d1d5db]"}`}
      >
        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-6" : "translate-x-1"}`} />
      </button>
      {label && <span className="text-xs font-medium text-[#374151]">{label}</span>}
    </label>
  );
}