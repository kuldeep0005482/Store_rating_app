import React from "react";

export default function SidebarItem({ icon: Icon, label, active = false, badge, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-medium transition-all duration-200 ${active ? "bg-[#991b1b] text-white shadow-sm" : "text-[#fef2f2] hover:bg-[#7f1d1d] hover:translate-x-0.5"}`}
    >
      {Icon && <Icon size={16} className="shrink-0" />}
      <span className="flex-1">{label}</span>
      {badge && <span className={`rounded-full px-1.5 py-0.5 text-[9px] ${active ? "bg-white/20" : "bg-white/10"}`}>{badge}</span>}
    </button>
  );
}