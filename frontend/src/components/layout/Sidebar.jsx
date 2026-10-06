
import React from "react";
import { LayoutDashboard, Users, Store, Settings, LogOut, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SidebarItem from "../ui/SidebarItem";
import { getAuthUser } from "../../utils/auth";

const config = {
  ADMIN: [
    ["Dashboard", LayoutDashboard, "/admin/dashboard"],
    ["Users", Users, "/admin/users"],
    ["Stores", Store, "/admin/stores"],
    ["Settings", Settings, "/settings"],
  ],
  USER: [
    ["Stores", Store, "/stores"],
    ["Settings", Settings, "/settings"],
  ],
  STORE_OWNER: [
    ["Dashboard", LayoutDashboard, "/owner/dashboard"],
    ["Stores", Store, "/stores"],
    ["Ratings", Star, "/owner/ratings"],
    ["Settings", Settings, "/settings"],
  ],
};

export default function Sidebar({
  activeItem = "Dashboard",
  onNavigate,
  onLogout,
  mobile = false,
}) {
  const navigate = useNavigate();
  const user = getAuthUser();
  const role = String(user?.role || "ADMIN").toUpperCase();
  const items = config[role] || config.USER;

  const go = (path, label) => {
    if (onNavigate) onNavigate(label);
    navigate(path);
  };

  return (
    <aside
      className={
        mobile
          ? "flex h-full w-60 flex-col bg-[#991b1b] text-white"
          : "fixed inset-y-0 left-0 z-40 hidden w-60 bg-[#991b1b] text-white lg:flex lg:flex-col"
      }
    >
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white font-black text-[#991b1b]">
          A
        </div>
        <div>
          <div className="text-sm font-bold">StoreRate</div>
          <div className="text-[9px] text-red-100">
            {role === "ADMIN" ? "Admin Portal" : role === "STORE_OWNER" ? "Store Owner" : "User Portal"}
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {items.map(([label, Icon, path]) => (
          <SidebarItem
            key={label}
            icon={Icon}
            label={label}
            active={activeItem === label}
            onClick={() => go(path, label)}
          />
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <SidebarItem
          icon={LogOut}
          label="Logout"
          onClick={onLogout}
        />
      </div>
    </aside>
  );
}
