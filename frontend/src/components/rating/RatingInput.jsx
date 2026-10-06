import React from "react";
import RatingStars from "./RatingStars";

export default function RatingInput({ value, onChange, error }) {
  return (
    <div>
      <RatingStars value={value} size={28} interactive onChange={onChange} />
      {error && <p className="mt-1 text-[11px] text-[#dc2626]">{error}</p>}
    </div>
  );
}