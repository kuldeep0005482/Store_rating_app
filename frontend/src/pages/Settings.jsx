
import React, { useState } from "react";
import { Lock, User, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { api } from "../services/api";
import { getAuthUser, saveAuthUser } from "../utils/auth";

export default function Settings() {
  const navigate = useNavigate();
  const user = getAuthUser() || {};
  const [name, setName] = useState(user.name || "");
  const [address, setAddress] = useState(user.address || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });

  const saveProfile = async (e) => {
    e.preventDefault();
    setMessage(""); setError(""); setSaving(true);
    try {
      const result = await api.patch("/auth/profile", { name, address });
      const updated = result.user || result.data || {};
      saveAuthUser({ ...user, ...updated });
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setMessage(""); setError(""); setSaving(true);
    try {
      await api.patch("/auth/password", passwords);
      setPasswords({ currentPassword: "", newPassword: "" });
      setMessage("Password updated successfully.");
    } catch (err) {
      setError(err.message || "Unable to update password.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout activeItem="Settings">
      <div className="mx-auto w-full max-w-[900px]">
        <div className="mb-5">
          <h1 className="text-2xl font-bold sm:text-[28px]">Settings</h1>
          <p className="mt-1 text-xs text-[#6b7280] sm:text-sm">
            Manage your account and password.
          </p>
        </div>

        {message && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            <CheckCircle2 size={17} /> {message}
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <div className="mb-4 flex items-center gap-2 border-b border-[#f1f5f9] pb-4">
              <User size={18} className="text-[#dc2626]" />
              <div>
                <h2 className="font-bold">Profile</h2>
                <p className="text-[11px] text-[#94a3b8]">{user.email}</p>
              </div>
            </div>

            <form onSubmit={saveProfile} className="space-y-4">
              <label className="block text-xs font-semibold">
                Name
                <input value={name} onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#dfe3e8] p-2.5 text-sm" />
              </label>
              <label className="block text-xs font-semibold">
                Address
                <textarea value={address} onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 min-h-24 w-full rounded-lg border border-[#dfe3e8] p-2.5 text-sm" />
              </label>
              <Button type="submit" disabled={saving}>Save Changes</Button>
            </form>
          </Card>

          <Card>
            <div className="mb-4 flex items-center gap-2 border-b border-[#f1f5f9] pb-4">
              <Lock size={18} className="text-[#dc2626]" />
              <div>
                <h2 className="font-bold">Change Password</h2>
                <p className="text-[11px] text-[#94a3b8]">Use 8–16 characters with uppercase and special character.</p>
              </div>
            </div>

            <form onSubmit={changePassword} className="space-y-4">
              <label className="block text-xs font-semibold">
                Current Password
                <input type="password" value={passwords.currentPassword}
                  onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[#dfe3e8] p-2.5 text-sm" required />
              </label>
              <label className="block text-xs font-semibold">
                New Password
                <input type="password" value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-[#dfe3e8] p-2.5 text-sm" required />
              </label>
              <Button type="submit" disabled={saving}>Update Password</Button>
            </form>
          </Card>
        </div>

        <button onClick={() => navigate(-1)} className="mt-5 text-xs font-semibold text-[#dc2626]">
          ← Go back
        </button>
      </div>
    </AdminLayout>
  );
}
