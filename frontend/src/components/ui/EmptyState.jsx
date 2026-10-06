import React from "react";
import { UsersRound } from "lucide-react";
import Button from "./Button";

export default function EmptyState({ icon: Icon = UsersRound, title = "No Users Found", description = "There are no records to display.", actionLabel, onAction }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center px-6 py-10 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f3f4f6] text-[#9ca3af]">
        <Icon size={34} strokeWidth={1.7} />
      </div>
      <h3 className="text-base font-bold text-[#111827]">{title}</h3>
      <p className="mt-1 max-w-sm text-xs leading-5 text-[#6b7280]">{description}</p>
      {actionLabel && <Button className="mt-4" onClick={onAction}>+ {actionLabel}</Button>}
    </div>
  );
}