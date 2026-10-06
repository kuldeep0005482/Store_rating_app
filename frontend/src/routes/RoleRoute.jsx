import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getHomePath, normalizeRole } from "../utils/auth";

export default function RoleRoute({ allowedRoles = [] }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const role = normalizeRole(user.role);
  const allowed = allowedRoles.map(normalizeRole);

  if (!allowed.includes(role)) {
    return <Navigate to={getHomePath(user)} replace />;
  }

  return <Outlet />;
}
