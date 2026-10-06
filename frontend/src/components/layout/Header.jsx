
import React, { useState } from "react";
import { Bell, ChevronDown, Menu, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Avatar from "../ui/Avatar";

export default function Header({
  user = { name: "Admin", role: "System Administrator" },
  onMenu,
  onNotifications,
  onLogout,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#e5e7eb] bg-white/95 px-4 backdrop-blur sm:px-6">
      <button
        onClick={onMenu}
        aria-label="Open navigation"
        className="rounded-lg p-2 text-[#6b7280] hover:bg-[#f3f4f6] lg:hidden"
      >
        <Menu size={20} />
      </button>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen((v) => !v);
              onNotifications?.();
            }}
            aria-label="Notifications"
            className="relative rounded-lg p-2 text-[#6b7280] transition hover:bg-[#fff1f2] hover:text-[#dc2626]"
          >
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#dc2626]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-[#e5e7eb] bg-white p-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2">
                <p className="text-sm font-bold">Notifications</p>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs text-[#dc2626]"
                >
                  Close
                </button>
              </div>
              <div className="py-5 text-center text-xs text-[#94a3b8]">
                No new notifications
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-[#f9fafb]"
          >
            <Avatar name={user.name} size="sm" />
            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold">{user.name}</p>
              <p className="text-[9px] text-[#6b7280]">{user.role}</p>
            </div>
            <ChevronDown size={14} className="text-[#6b7280]" />
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-1 w-44 rounded-lg border border-[#e5e7eb] bg-white p-1 shadow-lg">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/settings");
                }}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs hover:bg-[#f9fafb]"
              >
                <Settings size={14} /> Settings
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  onLogout?.();
                }}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs text-[#dc2626] hover:bg-[#fff1f2]"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
