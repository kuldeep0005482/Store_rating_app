import React from "react";
import { Star } from "lucide-react";

export default function RatingStars({ value = 0, max = 5, size = 16, showValue = false, interactive = false, onChange }) {
  return (
    <div className="inline-flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i + 1 <= Math.round(value);
        return (
          <button key={i} type="button" disabled={!interactive} onClick={() => onChange?.(i + 1)} className={interactive ? "cursor-pointer transition hover:scale-110" : "cursor-default"}>
            <Star size={size} fill={filled ? "#f59e0b" : "transparent"} className={filled ? "text-[#f59e0b]" : "text-[#d1d5db]"} />
          </button>
        );
      })}
      {showValue && <span className="ml-1.5 text-xs font-semibold text-[#374151]">{Number(value).toFixed(1)}</span>}
    </div>
  );
}