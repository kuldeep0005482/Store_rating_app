import React from "react";
import { UserRound } from "lucide-react";

const sizes = { xs: "h-6 w-6 text-[9px]", sm: "h-8 w-8 text-[11px]", md: "h-10 w-10 text-xs", lg: "h-12 w-12 text-sm", xl: "h-16 w-16 text-base" };

export default function Avatar({ src, name = "", size = "md", fallback, className = "" }) {
  const initials = fallback || name.split(" ").map((x) => x[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#fee2e2] font-bold text-[#dc2626] ${sizes[size]} ${className}`}>
      {src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : initials ? initials : <UserRound size={18} />}
    </div>
  );
}