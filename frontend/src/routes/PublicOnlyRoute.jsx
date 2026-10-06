import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getHomePath } from "../utils/auth";

export default function PublicOnlyRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (user) {
    const from = location.state?.from?.pathname;
    return <Navigate to={from || getHomePath(user)} replace />;
  }

  return <Outlet />;
}
