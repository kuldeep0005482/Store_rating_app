import React from "react";
import { Star } from "lucide-react";

export default function RatingStars({
  value = 0,
  size = 18,
  interactive = false,
  onChange,
  showValue = false,
}) {
  return (
    <div className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const active = i + 1 <= Math.round(value);
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(i + 1)}
            className={interactive ? "transition hover:scale-110" : "cursor-default"}
          >
            <Star
              size={size}
              fill={active ? "#f59e0b" : "transparent"}
              className={active ? "text-[#f59e0b]" : "text-[#d1d5db]"}
            />
          </button>
        );
      })}
      {showValue && <span className="ml-1 text-xs font-semibold text-[#374151]">{Number(value).toFixed(1)}</span>}
    </div>
  );
}