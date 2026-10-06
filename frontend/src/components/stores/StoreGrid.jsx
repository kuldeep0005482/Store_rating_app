import React from "react";
import StoreCard from "./StoreCard";

export default function StoreGrid({ stores = [], onView, onRate }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} onView={onView} onRate={onRate} />
      ))}
    </div>
  );
}