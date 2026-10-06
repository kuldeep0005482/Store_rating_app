import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck, Store, UserRound } from "lucide-react";
import { api } from "../services/api";
import { getHomePath } from "../utils/auth";
import { useAuth } from "../context/AuthContext";

const roles = [
  {
    value: "USER",
    title: "Normal User",
    description: "Browse stores and submit ratings.",
    icon: UserRound,
  },
  {
    value: "STORE_OWNER",
    title: "Store Owner",
    description: "Manage your store and ratings.",
    icon: Store,
  },
  {
    value: "ADMIN",
    title: "Administrator",
    description: "Manage users, stores and platform data.",
    icon: ShieldCheck,
  },
];

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthenticatedUser } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  async function submit(event) {
    event.preventDefault();
    setError("");

    if (form.name.trim().length < 20 || form.name.trim().length > 60) {
      setError("Name must be between 20 and 60 characters.");
      return;
    }
    if (form.password.length < 8 || form.password.length > 16) {
      setError("Password must be 8–16 characters.");
      return;
    }
    if (!/[A-Z]/.test(form.password) || !/[^A-Za-z0-9]/.test(form.password)) {
      setError("Password must contain an uppercase letter and a special character.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const result = await api.post("/auth/register", {
        name: form.name.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        password: form.password,
        role: form.role,
      });

      const user = result.user || result.data?.user || result.data;
      if (!user) throw new Error("Registration response did not contain a user");

      setAuthenticatedUser(user);
      const from = location.state?.from?.pathname;
      navigate(from && from !== "/login" && from !== "/signup" ? from : getHomePath(user), { replace: true });
    } catch (err) {
      setError(err.message || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fff7f3] px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#991b1b] text-lg font-black text-white">A</div>
          <h1 className="mt-3 text-2xl font-bold text-[#111827]">Create your StoreRate account</h1>
          <p className="mt-1 text-sm text-[#6b7280]">Choose your account type and enter your details.</p>
        </div>

        <form onSubmit={submit} className="rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-lg sm:p-7">
          <div>
            <h2 className="text-sm font-bold text-[#111827]">Account Type</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {roles.map(({ value, title, description, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => update("role", value)}
                  className={`rounded-xl border p-4 text-left transition ${form.role === value ? "border-[#dc2626] bg-[#fff1f2] ring-2 ring-[#dc2626]/10" : "border-[#e5e7eb] hover:border-[#fca5a5]"}`}
                >
                  <Icon size={19} className={form.role === value ? "text-[#dc2626]" : "text-[#64748b]"} />
                  <p className="mt-2 text-sm font-bold text-[#111827]">{title}</p>
                  <p className="mt-1 text-[11px] leading-4 text-[#6b7280]">{description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-[#f1f5f9] pt-6">
            <h2 className="text-sm font-bold text-[#111827]">Personal Information</h2>
            <div className="mt-4 grid gap-4">
              <label className="block text-xs font-semibold text-[#111827]">
                Name *
                <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Enter full name (20–60 characters)" className="mt-1 w-full rounded-lg border border-[#dfe3e8] p-2.5 text-sm outline-none focus:border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/10" required />
              </label>
              <label className="block text-xs font-semibold text-[#111827]">
                Email *
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Enter email address" className="mt-1 w-full rounded-lg border border-[#dfe3e8] p-2.5 text-sm outline-none focus:border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/10" required />
              </label>
              <label className="block text-xs font-semibold text-[#111827]">
                Address *
                <textarea value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Enter address (max 400 characters)" className="mt-1 min-h-24 w-full rounded-lg border border-[#dfe3e8] p-2.5 text-sm outline-none focus:border-[#dc2626] focus:ring-2 focus:ring-[#dc2626]/10" required />
              </label>
            </div>
          </div>

          <div className="mt-6 border-t border-[#f1f5f9] pt-6">
            <h2 className="text-sm font-bold text-[#111827]">Account Details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="relative block text-xs font-semibold text-[#111827]">
                Password *
                <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="8–16 characters" className="mt-1 w-full rounded-lg border border-[#dfe3e8] p-2.5 pr-10 text-sm outline-none focus:border-[#dc2626]" required />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-7 text-[#6b7280]">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </label>
              <label className="relative block text-xs font-semibold text-[#111827]">
                Confirm Password *
                <input type={showConfirm ? "text" : "password"} value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} placeholder="Confirm password" className="mt-1 w-full rounded-lg border border-[#dfe3e8] p-2.5 pr-10 text-sm outline-none focus:border-[#dc2626]" required />
                <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute right-3 top-7 text-[#6b7280]">{showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </label>
            </div>
          </div>

          {error && <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

          <button disabled={loading} className="mt-6 w-full rounded-lg bg-[#dc2626] px-4 py-2.5 font-semibold text-white transition hover:bg-[#b91c1c] disabled:opacity-60">
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="mt-4 text-center text-sm text-[#6b7280]">
            Already have an account? <Link to="/login" className="font-semibold text-[#dc2626] hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
