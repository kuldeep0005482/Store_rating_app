import React from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

export default function TableHeader({ label, sort, active, direction, onSort }) {
  if (!sort) return <span>{label}</span>;

  const Icon = active ? (direction === "asc" ? ArrowUp : ArrowDown) : ChevronsUpDown;

  return (
    <button
      onClick={onSort}
      className="inline-flex items-center gap-1 transition hover:text-[#dc2626]"
    >
      {label}
      <Icon size={12} />
    </button>
  );
}