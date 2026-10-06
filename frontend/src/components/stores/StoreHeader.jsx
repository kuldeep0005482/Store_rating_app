import React from "react";
import { Store, Plus } from "lucide-react";
import Button from "../ui/Button";

export default function StoreHeader({ title = "Stores", description = "Manage all registered stores.", onAdd }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#e5e7eb] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1f2] text-[#dc2626]">
          <Store size={19} />
        </div>
        <div>
          <h2 className="text-base font-bold">{title}</h2>
          <p className="text-xs text-[#6b7280]">{description}</p>
        </div>
      </div>
      <Button onClick={onAdd} icon={Plus}>Add Store</Button>
    </div>
  );
}