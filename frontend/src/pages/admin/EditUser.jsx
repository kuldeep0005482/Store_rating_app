
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { api } from "../../services/api";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", address: "", role: "USER" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/admin/users/${id}`)
      .then((r) => setForm(r.data?.user || {}))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault(); setSaving(true); setError("");
    try {
      await api.patch(`/admin/users/${id}`, {
        name: form.name, email: form.email, address: form.address, role: form.role,
      });
      navigate(`/admin/users/${id}`);
    } catch (e) { setError(e.message || "Unable to update user"); }
    finally { setSaving(false); }
  };

  return (
    <AdminLayout activeItem="Users">
      <div className="mx-auto max-w-[800px]">
        <div className="mb-5"><h1 className="text-2xl font-bold">Edit User</h1><p className="mt-1 text-sm text-[#6b7280]">Update user information.</p></div>
        <Card>
          {loading ? <p className="text-sm text-[#6b7280]">Loading...</p> : (
            <form onSubmit={submit} className="space-y-4">
              {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
              <label className="block text-xs font-semibold">Name<input value={form.name || ""} onChange={e=>setForm({...form,name:e.target.value})} className="mt-1 w-full rounded-lg border p-2.5" required /></label>
              <label className="block text-xs font-semibold">Email<input type="email" value={form.email || ""} onChange={e=>setForm({...form,email:e.target.value})} className="mt-1 w-full rounded-lg border p-2.5" required /></label>
              <label className="block text-xs font-semibold">Address<textarea value={form.address || ""} onChange={e=>setForm({...form,address:e.target.value})} className="mt-1 w-full rounded-lg border p-2.5" required /></label>
              <label className="block text-xs font-semibold">Role<select value={form.role || "USER"} onChange={e=>setForm({...form,role:e.target.value})} className="mt-1 w-full rounded-lg border p-2.5"><option value="USER">USER</option><option value="STORE_OWNER">STORE_OWNER</option><option value="ADMIN">ADMIN</option></select></label>
              <div className="flex justify-end gap-2"><Button variant="outline" type="button" onClick={()=>navigate(-1)}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button></div>
            </form>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}
