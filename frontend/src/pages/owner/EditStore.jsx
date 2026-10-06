
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { api } from "../../services/api";

export default function OwnerEditStore() {
  const navigate=useNavigate();
  const [form,setForm]=useState({name:"",email:"",address:"",category:"",image:""});
  const [loading,setLoading]=useState(true); const [saving,setSaving]=useState(false); const [error,setError]=useState("");
  useEffect(()=>{api.get("/owner/store").then(r=>{const s=r.data||{};setForm({name:s.name||"",email:s.email||"",address:s.address||"",category:s.category||"",image:s.image||""})}).catch(e=>setError(e.message)).finally(()=>setLoading(false))},[]);
  const submit=async e=>{e.preventDefault();setSaving(true);setError("");try{await api.patch("/owner/store",form);navigate("/owner/dashboard")}catch(e){setError(e.message)}finally{setSaving(false)}};
  return <AdminLayout activeItem="Dashboard"><div className="mx-auto max-w-[800px]"><div className="mb-5"><h1 className="text-2xl font-bold">Edit Store</h1><p className="mt-1 text-sm text-[#6b7280]">Update your store information.</p></div><Card>{loading?<p>Loading...</p>:<form onSubmit={submit} className="space-y-4">{error&&<div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}<label className="block text-xs font-semibold">Store Name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="mt-1 w-full rounded-lg border p-2.5" required/></label><label className="block text-xs font-semibold">Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="mt-1 w-full rounded-lg border p-2.5" required/></label><label className="block text-xs font-semibold">Address<textarea value={form.address} onChange={e=>setForm({...form,address:e.target.value})} className="mt-1 w-full rounded-lg border p-2.5" required/></label><label className="block text-xs font-semibold">Category<input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="mt-1 w-full rounded-lg border p-2.5"/></label><label className="block text-xs font-semibold">Image URL<input value={form.image} onChange={e=>setForm({...form,image:e.target.value})} className="mt-1 w-full rounded-lg border p-2.5"/></label><div className="flex justify-end gap-2"><Button variant="outline" type="button" onClick={()=>navigate(-1)}>Cancel</Button><Button type="submit" disabled={saving}>{saving?"Saving...":"Save Changes"}</Button></div></form>}</Card></div></AdminLayout>;
}
