import React from "react";
import RatingStars from "./RatingStars";

export default function RatingBadge({ rating = 0, count, compact = false }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <RatingStars value={rating} size={compact ? 12 : 14} />
      <span className="text-xs font-semibold text-[#374151]">{Number(rating).toFixed(1)}</span>
      {count !== undefined && <span className="text-[10px] text-[#6b7280]">({count})</span>}
    </div>
  );
}