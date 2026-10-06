import React from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";

const config = {
  success: { Icon: CheckCircle2, wrap: "border-[#86efac] bg-[#f0fdf4]", icon: "text-[#16a34a]", title: "text-[#166534]" },
  error: { Icon: XCircle, wrap: "border-[#fecaca] bg-[#fef2f2]", icon: "text-[#dc2626]", title: "text-[#991b1b]" },
  warning: { Icon: AlertTriangle, wrap: "border-[#fde68a] bg-[#fffbeb]", icon: "text-[#d97706]", title: "text-[#92400e]" },
  info: { Icon: Info, wrap: "border-[#bfdbfe] bg-[#eff6ff]", icon: "text-[#2563eb]", title: "text-[#1e40af]" },
};

export default function Toast({ type = "success", title, message, onClose }) {
  const c = config[type] || config.success;
  const Icon = c.Icon;
  return (
    <div className={`flex w-full max-w-sm items-start gap-3 rounded-lg border p-3 shadow-lg animate-in slide-in-from-right-3 ${c.wrap}`}>
      <Icon size={20} className={`mt-0.5 shrink-0 ${c.icon}`} />
      <div className="min-w-0 flex-1">
        <p className={`text-xs font-bold ${c.title}`}>{title}</p>
        {message && <p className="mt-0.5 text-[11px] text-[#4b5563]">{message}</p>}
      </div>
      <button onClick={onClose} className="text-[#6b7280] hover:text-[#111827]"><X size={15} /></button>
    </div>
  );
}