
import React, { useEffect, useState } from "react";
import { Star, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { api } from "../../services/api";

function Stars({ value }) {
  return <div className="flex gap-0.5">{[1,2,3,4,5].map(n=><Star key={n} size={14} className={n<=value?"fill-[#f59e0b] text-[#f59e0b]":"text-[#d1d5db]"}/>)}</div>;
}

function formatDate(value) {
  return value ? new Date(value).toLocaleString("en-IN") : "—";
}

export default function AdminRatings() {
  const navigate=useNavigate();
  const [rows,setRows]=useState([]); const [loading,setLoading]=useState(true); const [error,setError]=useState("");
  useEffect(()=>{api.get("/admin/ratings?page=1&limit=100").then(r=>setRows(r.data||[])).catch(e=>setError(e.message)).finally(()=>setLoading(false))},[]);
  return <AdminLayout activeItem="Dashboard"><div className="mx-auto max-w-[1200px]"><div className="mb-5 flex items-center justify-between"><div><h1 className="text-2xl font-bold">All Ratings</h1><p className="mt-1 text-sm text-[#6b7280]">Latest ratings across the platform.</p></div><Button variant="outline" icon={ArrowLeft} onClick={()=>navigate("/admin/dashboard")}>Dashboard</Button></div><Card>{error&&<div className="p-4 text-sm text-red-600">{error}</div>}{loading?<div className="p-5 text-sm">Loading ratings...</div>:<div className="overflow-x-auto"><table className="w-full min-w-[700px]"><thead><tr className="border-b bg-[#fafafa] text-left text-xs text-[#64748b]"><th className="p-3">#</th><th className="p-3">User</th><th className="p-3">Store</th><th className="p-3">Rating</th><th className="p-3">Date</th></tr></thead><tbody>{rows.map((r,i)=><tr key={r.id} className="border-b last:border-0"><td className="p-3 text-xs">{i+1}</td><td className="p-3 text-xs font-semibold">{r.user?.name||"Unknown"}</td><td className="p-3 text-xs">{r.store?.name||"Unknown"}</td><td className="p-3"><Stars value={r.rating}/></td><td className="p-3 text-xs text-[#64748b]">{formatDate(r?.createdAt || r?.date)}</td></tr>)}</tbody></table></div>}</Card></div></AdminLayout>;
}
