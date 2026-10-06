import React from "react";
import RatingBadge from "../rating/RatingBadge";

export default function StoreRating({ rating, reviewCount }) {
  return (
    <div className="rounded-lg border border-[#e5e7eb] bg-white p-3">
      <p className="mb-1 text-[10px] uppercase tracking-wide text-[#6b7280]">Store Rating</p>
      <RatingBadge rating={rating} count={reviewCount} />
    </div>
  );
}