import React from "react";

export default function TableRow({ children, selected = false, onClick, className = "" }) {
  return (
    <tr
      onClick={onClick}
      className={`border-b border-[#f1f5f9] transition hover:bg-[#fffafa] ${selected ? "bg-[#fff1f2]" : ""} ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </tr>
  );
}