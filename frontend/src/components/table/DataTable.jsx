import React from "react";
import EmptyState from "../ui/EmptyState";
import Pagination from "../ui/Pagination";

export default function DataTable({
  columns = [],
  data = [],
  rowKey = "id",
  renderRow,
  loading = false,
  emptyTitle = "No records found",
  emptyDescription = "There are no records to display.",
  page,
  totalPages,
  onPageChange,
  selectable = false,
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-[#e5e7eb] bg-[#f8fafc]">
              {selectable && <th className="px-3 py-3"><input type="checkbox" className="accent-[#dc2626]" /></th>}
              {columns.map((column) => (
                <th key={column.key} className="px-3 py-3 text-[10px] font-bold uppercase tracking-wide text-[#6b7280]">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-b border-[#f1f5f9]">
                    {Array.from({ length: columns.length + (selectable ? 1 : 0) }).map((__, j) => (
                      <td key={j} className="px-3 py-4">
                        <div className="h-3 animate-pulse rounded bg-[#e5e7eb]" />
                      </td>
                    ))}
                  </tr>
                ))
              : data.map((row, index) =>
                  renderRow ? renderRow(row, index) : (
                    <tr key={row[rowKey] ?? index} className="border-b border-[#f1f5f9] hover:bg-[#fffafa]">
                      {selectable && <td className="px-3 py-3"><input type="checkbox" className="accent-[#dc2626]" /></td>}
                      {columns.map((column) => (
                        <td key={column.key} className="px-3 py-3 text-xs text-[#374151]">
                          {column.render ? column.render(row, index) : row[column.key]}
                        </td>
                      ))}
                    </tr>
                  )
                )}
          </tbody>
        </table>
      </div>

      {!loading && data.length === 0 && (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      )}

      {page && totalPages && totalPages > 1 && (
        <div className="border-t border-[#e5e7eb] p-3">
          <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
        </div>
      )}
    </div>
  );
}