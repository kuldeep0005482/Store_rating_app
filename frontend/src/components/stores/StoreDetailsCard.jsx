import React from "react";
import { MapPin, Mail, UserRound } from "lucide-react";
import RatingSummary from "../rating/RatingSummary";

export default function StoreDetailsCard({ store }) {
  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white p-5">
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="h-36 w-full overflow-hidden rounded-xl bg-[#f8fafc] md:w-48">
          {store.image ? (
            <img src={store.image} alt={store.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-[#dc2626]">Store</div>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{store.name}</h2>
          <p className="mt-1 text-xs text-[#6b7280]">{store.category || "General"}</p>
          <div className="mt-4 space-y-2 text-xs text-[#4b5563]">
            <p className="flex gap-2"><MapPin size={15}/>{store.address}</p>
            <p className="flex gap-2"><Mail size={15}/>{store.email}</p>
            <p className="flex gap-2"><UserRound size={15}/>{store.ownerName}</p>
          </div>
        </div>
      </div>
      <div className="mt-5"><RatingSummary average={store.rating || 0} total={store.reviewCount || 0} distribution={store.distribution || {5:0,4:0,3:0,2:0,1:0}} /></div>
    </div>
  );
}