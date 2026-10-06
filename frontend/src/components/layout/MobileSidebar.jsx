
import React from "react";
import { X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function MobileSidebar({ open, onClose, activeItem, onLogout }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] lg:hidden">
      <button
        aria-label="Close navigation"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div className="relative h-full w-60">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded p-1 text-white"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
        <Sidebar
          mobile
          activeItem={activeItem}
          onLogout={onLogout}
          onNavigate={onClose}
        />
      </div>
    </div>
  );
}
