import React from 'react';
import ChartCard from './ChartCard';
const defaultData=[['5 Stars',34],['4 Stars',28],['3 Stars',18],['2 Stars',12],['1 Star',8]];
export default function RatingBreakdownBar({data=defaultData}){return <ChartCard title="Rating Breakdown"><div className="space-y-3">{data.map(([name,value],i)=><div key={name} className="grid grid-cols-[55px_1fr_35px] items-center gap-2 text-xs"><span>{name}</span><div className="h-3 overflow-hidden rounded-full bg-[#f1f5f9]"><div className="h-full rounded-full bg-[#dc2626] transition-all duration-700" style={{width:`${value}%`,opacity:1-i*.12}}/></div><strong>{value}%</strong></div>)}</div></ChartCard>}
