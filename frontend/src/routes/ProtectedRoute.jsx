import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AuthLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff7f3]">
      <div className="rounded-xl bg-white px-6 py-5 text-sm font-medium text-[#6b7280] shadow-sm">
        Checking your session...
      </div>
    </div>
  );
}

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <AuthLoading />;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  return <Outlet />;
}
