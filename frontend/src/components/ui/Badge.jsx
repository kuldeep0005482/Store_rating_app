import React from "react";

const styles = {
  active: "bg-[#dcfce7] text-[#15803d]",
  inactive: "bg-[#f3f4f6] text-[#4b5563]",
  admin: "bg-[#fee2e2] text-[#dc2626]",
  owner: "bg-[#dbeafe] text-[#2563eb]",
  user: "bg-[#f3e8ff] text-[#7e22ce]",
  pending: "bg-[#fef3c7] text-[#d97706]",
  success: "bg-[#dcfce7] text-[#15803d]",
  danger: "bg-[#fee2e2] text-[#dc2626]",
  warning: "bg-[#fef3c7] text-[#b45309]",
  info: "bg-[#dbeafe] text-[#2563eb]",
};

export default function Badge({ children, variant = "active", dot = false, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold ${styles[variant] || styles.active} ${className}`}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}