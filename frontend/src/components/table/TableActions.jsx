import React from "react";
import { MoreVertical } from "lucide-react";
import Dropdown from "../ui/Dropdown";

export default function TableActions({ onView, onEdit, onDelete }) {
  return (
    <Dropdown
      iconOnly
      items={[
        { label: "View Details", onClick: onView },
        { label: "Edit", onClick: onEdit },
        { label: "Delete", danger: true, onClick: onDelete },
      ]}
    />
  );
}