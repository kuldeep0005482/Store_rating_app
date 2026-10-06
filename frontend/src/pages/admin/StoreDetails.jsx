
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapPin, Mail, Star, Edit, ArrowLeft } from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { api } from "../../services/api";

export default function StoreDetails() {
  const { id } = useParams(); const navigate = useNavigate();
  const [data, setData] = useState(null); const [error, setError] = useState("");
  useEffect(()=>{ api.get(`/admin/stores/${id}`).then(r=>setData(r.data)).catch(e=>setError(e.message)); },[id]);
  if (error) return <AdminLayout activeItem="Stores"><div className="p-8 text-red-600">{error}</div></AdminLayout>;
  if (!data) return <AdminLayout activeItem="Stores"><div className="p-8">Loading store...</div></AdminLayout>;
  const s=data.store || data, stats=data.statistics || { averageRating: data.rating, totalRatings: data.ratingsCount };
  return <AdminLayout activeItem="Stores"><div className="mx-auto max-w-[1000px]">
    <div className="mb-5 flex items-center justify-between"><div><h1 className="text-2xl font-bold">Store Details</h1><p className="mt-1 text-sm text-[#6b7280]">Complete store information and ratings.</p></div><div className="flex gap-2"><Button variant="outline" icon={ArrowLeft} onClick={()=>navigate("/admin/stores")}>Back</Button><Button icon={Edit} onClick={()=>navigate(`/admin/stores/${id}/edit`)}>Edit Store</Button></div></div>
    <Card><div className="grid gap-6 md:grid-cols-[180px_1fr]"><div className="flex h-44 items-center justify-center rounded-lg bg-[#f3f4f6] overflow-hidden">{s.image?<img src={s.image} className="h-full w-full object-cover" />:<span className="text-sm text-[#94a3b8]">Store Image</span>}</div><div><h2 className="text-2xl font-bold">{s.name}</h2><p className="mt-2 flex items-center gap-2 text-sm text-[#64748b]"><Mail size={15}/>{s.email}</p><p className="mt-2 flex items-center gap-2 text-sm text-[#64748b]"><MapPin size={15}/>{s.address}</p><p className="mt-2 text-sm text-[#64748b]">{s.category || "General"}</p><div className="mt-4 flex items-center gap-2"><Star size={18} className="fill-[#f59e0b] text-[#f59e0b]"/><b>{stats.averageRating ?? 0}</b><span className="text-sm text-[#64748b]">({stats.totalRatings ?? 0} ratings)</span></div></div></div></Card>
  </div></AdminLayout>;
}
