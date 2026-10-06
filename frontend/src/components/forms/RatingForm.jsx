import React, { useState } from "react";
import { Button, Textarea } from "../ui";
import { RatingStars } from "../ui";

export default function RatingForm({
  store,
  initialRating = 0,
  initialComment = "",
  onSubmit,
  onCancel,
  loading = false,
}) {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!rating) {
      setError("Please select a rating");
      return;
    }
    setError("");
    onSubmit?.({ rating, comment, storeId: store?.id });
  };

  return (
    <form onSubmit={submit} className="rounded-xl border border-[#e5e7eb] bg-white p-5">
      <h3 className="text-sm font-bold text-[#111827]">
        {initialRating ? "Modify Rating" : "Rate Store"}
      </h3>
      {store?.name && <p className="mt-1 text-xs text-[#6b7280]">{store.name}</p>}

      <div className="mt-5">
        <p className="mb-2 text-xs font-medium">Your Rating <span className="text-[#dc2626]">*</span></p>
        <RatingStars value={rating} size={28} interactive onChange={(value) => { setRating(value); setError(""); }} />
        {error && <p className="mt-1 text-[11px] text-[#dc2626]">{error}</p>}
      </div>

      <div className="mt-5">
        <Textarea
          label="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          maxLength={500}
        />
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={loading}>
          {initialRating ? "Update Rating" : "Submit Rating"}
        </Button>
      </div>
    </form>
  );
}