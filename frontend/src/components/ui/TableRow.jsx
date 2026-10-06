import React from "react";
import Avatar from "./Avatar";
import Badge from "./Badge";
import Dropdown from "./Dropdown";

export default function TableRow({ user, onView, onEdit, onDelete }) {
  return (
    <tr className="border-b border-[#f1f5f9] transition hover:bg-[#fffafa]">
      <td className="px-3 py-3"><input type="checkbox" className="accent-[#dc2626]" /></td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-2.5"><Avatar name={user.name} size="sm" /><span className="text-xs font-semibold text-[#111827]">{user.name}</span></div>
      </td>
      <td className="px-3 py-3 text-xs text-[#6b7280]">{user.email}</td>
      <td className="px-3 py-3"><Badge variant={user.role === "ADMIN" ? "admin" : user.role === "STORE OWNER" ? "owner" : "user"}>{user.role}</Badge></td>
      <td className="px-3 py-3"><Badge variant="active" dot>{user.status || "Active"}</Badge></td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-2">
          <button onClick={() => onView?.(user)} className="rounded-md border border-[#e5e7eb] px-2.5 py-1 text-[11px] font-semibold hover:border-[#dc2626] hover:text-[#dc2626]">View</button>
          <Dropdown iconOnly items={[
            { label: "Edit User", onClick: () => onEdit?.(user) },
            { label: "Delete User", danger: true, onClick: () => onDelete?.(user) },
          ]} />
        </div>
      </td>
    </tr>
  );
}