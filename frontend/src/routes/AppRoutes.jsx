import React, { useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import { demoRoutes } from "./DemoRoutes";

import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AddUser from "../pages/admin/AddUser";
import AdminUserDetails from "../pages/admin/AdminUserDetails";
import AdminStores from "../pages/admin/Stores";
import AdminRatings from "../pages/admin/Ratings";
import AddStore from "../pages/admin/AddStore";
import EditUser from "../pages/admin/EditUser";
import StoreDetails from "../pages/admin/StoreDetails";
import EditStore from "../pages/admin/EditStore";
import UserStoreDetails from "../pages/user/StoreDetails";
import OwnerEditStore from "../pages/owner/EditStore";
import OwnerRatings from "../pages/owner/Ratings";
import Settings from "../pages/Settings";
import UserStores from "../pages/user/Stores";
import OwnerDashboard from "../pages/owner/Dashboard";
import Signup from "../pages/Signup";
import { api } from "../services/api";
import { getHomePath } from "../utils/auth";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthenticatedUser } = useAuth();
  const [email, setEmail] = useState("admin@storerate.com");
  const [password, setPassword] = useState("Admin@123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await api.post("/auth/login", { email, password });
      const user = result.user || result.data?.user || result.data;
      if (!user) throw new Error("Login response did not contain a user");
      setAuthenticatedUser(user);
      const from = location.state?.from?.pathname;
      navigate(from && from !== "/login" ? from : getHomePath(user), { replace: true });
    } catch (loginError) {
      setError(loginError.message || "Unable to connect to the backend");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff7f3] p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#991b1b] font-black text-white">A</div>
        <h1 className="text-2xl font-bold text-[#111827]">Sign in</h1>
        <p className="mt-1 text-sm text-[#6b7280]">Sign in to access your StoreRate account.</p>
        <label className="mt-6 block text-sm font-medium text-[#374151]">Email
          <input className="mt-1 w-full rounded-lg border border-[#d1d5db] p-2.5" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label className="mt-4 block text-sm font-medium text-[#374151]">Password
          <input className="mt-1 w-full rounded-lg border border-[#d1d5db] p-2.5" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button className="mt-6 w-full rounded-lg bg-[#dc2626] px-4 py-2.5 font-semibold text-white disabled:opacity-60" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
        <p className="mt-4 text-center text-sm text-[#6b7280]">
          Don't have an account? <button type="button" onClick={() => navigate("/signup")} className="font-semibold text-[#dc2626] hover:underline">Create account</button>
        </p>
      </form>
    </main>
  );
}

function NotFound() {
  return <div className="p-8">404 - Page Not Found</div>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      {demoRoutes}

      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/ratings" element={<AdminRatings />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/users/new" element={<AddUser />} />
          <Route path="/admin/users/:id" element={<AdminUserDetails />} />
          <Route path="/admin/users/:id/edit" element={<EditUser />} />
          <Route path="/admin/stores" element={<AdminStores />} />
          <Route path="/admin/stores/new" element={<AddStore />} />
          <Route path="/admin/stores/:id" element={<StoreDetails />} />
          <Route path="/admin/stores/:id/edit" element={<EditStore />} />
        </Route>

        <Route element={<RoleRoute allowedRoles={["USER", "STORE_OWNER"]} />}>
          <Route path="/stores" element={<UserStores />} />
          <Route path="/stores/:storeId" element={<UserStoreDetails />} />
        </Route>

        <Route element={<RoleRoute allowedRoles={["STORE_OWNER"]} />}>
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/store/edit" element={<OwnerEditStore />} />
          <Route path="/owner/ratings" element={<OwnerRatings />} />
        </Route>

        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<RoleRedirect />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function RoleRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={getHomePath(user)} replace />;
}
