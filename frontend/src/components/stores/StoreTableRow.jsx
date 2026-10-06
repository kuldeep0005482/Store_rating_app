import React from "react";
import RatingBadge from "../rating/RatingBadge";
import TableRow from "../table/TableRow";
import TableActions from "../table/TableActions";

export default function StoreTableRow({ store, onView, onEdit, onDelete }) {
  return (
    <TableRow>
      <td className="px-3 py-3 text-xs text-[#6b7280]">{store.index}</td>
      <td className="px-3 py-3 text-xs font-semibold text-[#111827]">{store.name}</td>
      <td className="px-3 py-3 text-xs text-[#6b7280]">{store.email}</td>
      <td className="px-3 py-3 text-xs text-[#6b7280]">{store.address}</td>
      <td className="px-3 py-3"><RatingBadge rating={store.rating} count={store.reviewCount} compact /></td>
      <td className="px-3 py-3">
        <div className="flex justify-end">
          <TableActions
            onView={() => onView?.(store)}
            onEdit={() => onEdit?.(store)}
            onDelete={() => onDelete?.(store)}
          />
        </div>
      </td>
    </TableRow>
  );
}