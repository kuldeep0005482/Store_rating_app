import React from "react";
import RatingStars from "./RatingStars";

export default function RatingSummary({
  average = 4.6,
  total = 320,
  distribution = { 5: 65, 4: 22, 3: 8, 2: 3, 1: 2 },
}) {
  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white p-5">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="min-w-36 text-center">
          <p className="text-4xl font-bold">{average.toFixed(1)}</p>
          <div className="mt-1 flex justify-center"><RatingStars value={average} /></div>
          <p className="mt-1 text-xs text-[#6b7280]">{total} total ratings</p>
        </div>

        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="grid grid-cols-[35px_1fr_35px] items-center gap-2 text-xs">
              <span>{star} star</span>
              <div className="h-2 overflow-hidden rounded-full bg-[#f1f5f9]">
                <div
                  className="h-full rounded-full bg-[#f59e0b] transition-all duration-700"
                  style={{ width: `${distribution[star] || 0}%` }}
                />
              </div>
              <span className="text-right text-[#6b7280]">{distribution[star] || 0}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}