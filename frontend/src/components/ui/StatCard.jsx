import React from "react";
import { ArrowUpRight } from "lucide-react";

const variants = {
  users: { icon: "bg-[#fee2e2] text-[#dc2626]" },
  stores: { icon: "bg-[#fef3c7] text-[#f59e0b]" },
  ratings: { icon: "bg-[#fee2e2] text-[#dc2626]" },
  default: { icon: "bg-[#f3f4f6] text-[#374151]" },
};

export default function StatCard({ title, value, change, icon: Icon, variant = "default", subtitle = "from last month" }) {
  const v = variants[variant] || variants.default;
  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${v.icon}`}>{Icon && <Icon size={19} />}</div>
        <div className="min-w-0">
          <p className="text-[11px] font-medium text-[#6b7280]">{title}</p>
          <p className="mt-0.5 text-xl font-bold tracking-tight text-[#111827]">{value}</p>
          {change !== undefined && (
            <p className="mt-1 inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#16a34a]">
              <ArrowUpRight size={12} /> {change}% <span className="font-normal text-[#6b7280]">{subtitle}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}