
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapPin, Tag, Star, ArrowLeft } from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { api } from "../../services/api";
import { getAuthUser } from "../../utils/auth";

export default function StoreDetails() {
  const { storeId }=useParams(); const navigate=useNavigate();
  const [data,setData]=useState(null); const [error,setError]=useState(""); const [rating,setRating]=useState(0); const [saving,setSaving]=useState(false);
  useEffect(()=>{api.get(`/stores/${storeId}`).then(r=>{setData(r.data);setRating(r.data?.myRating || r.data?.userRating || 0)}).catch(e=>setError(e.message))},[storeId]);
  const submit=async()=>{if(!rating)return;setSaving(true);try{await api.put(`/stores/${storeId}/rating`,{value:rating});const r=await api.get(`/stores/${storeId}`);setData(r.data);setRating(r.data?.myRating || r.data?.userRating || rating)}catch(e){setError(e.message)}finally{setSaving(false)}};
  if(error)return <AdminLayout activeItem="Stores"><p className="p-8 text-red-600">{error}</p></AdminLayout>;
  if(!data)return <AdminLayout activeItem="Stores"><p className="p-8">Loading store...</p></AdminLayout>;
  const s=data.store || data, stats=data.statistics || { averageRating: data.rating, totalRatings: data.ratingsCount };
  const isUser = String(getAuthUser()?.role || "").toUpperCase() === "USER";
  return <AdminLayout activeItem="Stores"><div className="mx-auto max-w-[1000px]"><div className="mb-5"><Button variant="outline" icon={ArrowLeft} onClick={()=>navigate("/stores")}>Back to Stores</Button></div><Card><div className="grid gap-6 md:grid-cols-[220px_1fr]"><div className="flex h-52 items-center justify-center overflow-hidden rounded-lg bg-[#f3f4f6]">{s.image?<img src={s.image} className="h-full w-full object-cover" />:<span className="text-sm text-[#94a3b8]">Store Image</span>}</div><div><h1 className="text-2xl font-bold">{s.name}</h1><p className="mt-2 flex items-center gap-2 text-sm text-[#64748b]"><Tag size={15}/>{s.category||"General"}</p><p className="mt-2 flex items-center gap-2 text-sm text-[#64748b]"><MapPin size={15}/>{s.address}</p><div className="mt-4 flex items-center gap-2"><Star className="fill-[#f59e0b] text-[#f59e0b]"/><b>{stats.averageRating||0}</b><span className="text-sm text-[#64748b]">({stats.totalRatings||0} ratings)</span></div>{isUser && <div className="mt-6 rounded-lg border border-[#f1f5f9] p-4"><p className="text-sm font-bold">Your Rating</p><div className="mt-3 flex gap-2">{[1,2,3,4,5].map(n=><button key={n} onClick={()=>setRating(n)}><Star size={28} className={n<=rating?"fill-[#f59e0b] text-[#f59e0b]":"text-[#d1d5db]"}/></button>)}</div><Button className="mt-4" onClick={submit} disabled={!rating||saving}>{saving?"Saving...":rating?"Update Rating":"Select Rating"}</Button></div>}</div></div></Card></div></AdminLayout>;
}
