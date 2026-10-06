import React from "react";
import { Loader2 } from "lucide-react";

const variants = {
  primary: "bg-[#dc2626] text-white border-[#dc2626] hover:bg-[#b91c1c] shadow-sm",
  secondary: "bg-[#fff1f2] text-[#dc2626] border-[#fecdd3] hover:bg-[#ffe4e6]",
  outline: "bg-white text-[#dc2626] border-[#dc2626] hover:bg-[#fff1f2]",
  ghost: "bg-transparent text-[#dc2626] border-transparent hover:bg-[#fff1f2]",
  destructive: "bg-[#dc2626] text-white border-[#dc2626] hover:bg-[#b91c1c]",
};

const sizes = {
  sm: "h-8 px-3 text-xs rounded-lg",
  md: "h-10 px-4 text-sm rounded-lg",
  lg: "h-11 px-5 text-sm rounded-xl",
  icon: "h-10 w-10 rounded-lg p-0",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon: Icon,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={[
        "inline-flex items-center justify-center gap-2 border font-semibold transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 active:scale-[0.98]",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      ].join(" ")}
      {...props}
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : Icon ? <Icon size={16} /> : null}
      {children}
    </button>
  );
}