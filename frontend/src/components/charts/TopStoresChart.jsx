import React from 'react';
import ChartCard from './ChartCard';
const defaultData=[['Urban Basket',4.8,482],['FreshMart',4.6,320],['City Fashion',4.2,276],['TechWorld',4.1,220]].map(([name,rating,reviews])=>({name,rating,reviews}));
export default function TopStoresChart({data=defaultData}){return <ChartCard title="Top Rated Stores"><div className="divide-y divide-[#f1f5f9]">{data.map((s,i)=><div key={s.name} className="flex items-center gap-3 py-3"><span className="w-4 text-xs font-bold">{i+1}</span><div className="h-8 w-8 rounded-lg bg-[#f3f4f6]"/><span className="flex-1 text-xs font-semibold">{s.name}</span><span className="text-xs font-bold text-[#f59e0b]">★ {s.rating}</span><span className="text-[10px] text-[#6b7280]">({s.reviews})</span></div>)}</div></ChartCard>}
