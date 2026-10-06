
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileSidebar from "./MobileSidebar";
import { getAuthUser, clearAuthUser } from "../../utils/auth";
import { api } from "../../services/api";

export default function AdminLayout({
  children,
  activeItem = "Dashboard",
  user: userProp,
}) {
  const user = userProp || getAuthUser() || {
    name: "Admin",
    role: "ADMIN",
  };
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {});
    } catch {}
    clearAuthUser();
    window.location.replace("/login");
  };

  return (
    <div className="min-h-screen bg-[#fff7f3] text-[#111827]">
      <Sidebar activeItem={activeItem} onLogout={handleLogout} />
      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeItem={activeItem}
        onLogout={handleLogout}
      />

      <div className="min-h-screen lg:pl-60">
        <Header
          user={user}
          onMenu={() => setMobileOpen(true)}
          onLogout={handleLogout}
        />
        <main className="p-4 sm:p-5 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
