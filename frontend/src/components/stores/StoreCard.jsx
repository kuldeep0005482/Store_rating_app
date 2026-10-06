import React from "react";
import { MapPin, Mail, Star } from "lucide-react";
import RatingBadge from "../rating/RatingBadge";
import Button from "../ui/Button";

export default function StoreCard({
  store,
  onView,
  onRate,
}) {
  return (
    <article className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-[0_1px_3px_rgba(0,0,0,.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-36 items-center justify-center bg-[#f8fafc] text-[#9ca3af]">
        {store.image ? (
          <img src={store.image} alt={store.name} className="h-full w-full object-cover" />
        ) : (
          <StoreIcon />
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold text-[#111827]">{store.name}</h3>
        <p className="mt-1 text-[11px] text-[#6b7280]">{store.category || "General"}</p>

        <div className="mt-3 space-y-1.5 text-[11px] text-[#6b7280]">
          <p className="flex items-center gap-1.5"><MapPin size={13} />{store.address}</p>
          {store.email && <p className="flex items-center gap-1.5"><Mail size={13} />{store.email}</p>}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <RatingBadge rating={store.rating || 0} count={store.reviewCount || 0} compact />
        </div>

        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="outline" className="flex-1" onClick={() => onView?.(store)}>
            View Store
          </Button>
          {onRate && (
            <Button size="sm" className="flex-1" onClick={() => onRate(store)}>
              Rate Store
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

function StoreIcon() {
  return <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fee2e2] text-[#dc2626]"><Star size={25} /></div>;
}