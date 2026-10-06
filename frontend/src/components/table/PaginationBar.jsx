import React from "react";
import Pagination from "../ui/Pagination";

export default function PaginationBar({
  page,
  totalPages,
  total = 0,
  pageSize = 10,
  onPageChange,
}) {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col gap-3 border-t border-[#e5e7eb] px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[11px] text-[#6b7280]">
        Showing <strong>{start}</strong>–<strong>{end}</strong> of <strong>{total}</strong>
      </p>
      <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
    </div>
  );
}