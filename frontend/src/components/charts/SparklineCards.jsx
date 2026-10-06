import React from 'react';
import {ResponsiveContainer,LineChart,Line} from 'recharts';
import ChartCard from './ChartCard';
const defaultData=[['Total Users','1,248',[20,25,23,32,31,38,36,43]],['Total Stores','184',[12,18,15,21,19,23,20,24]],['Total Ratings','8,426',[30,35,33,42,39,48,45,54]]];
export default function SparklineCards({data=defaultData}){return <ChartCard title="Sparkline Cards"><div className="space-y-2">{data.map((c,i)=><div key={c[0]} className="flex items-center gap-3 rounded-lg border border-[#f1f5f9] p-2"><div className="flex-1"><p className="text-[10px] text-[#6b7280]">{c[0]}</p><strong>{c[1]}</strong></div><div className="h-10 w-24"><ResponsiveContainer><LineChart data={c[2].map((v,x)=>({x,v}))}><Line dataKey="v" stroke={i===1?'#f97316':i===2?'#16a34a':'#dc2626'} strokeWidth={2} dot={false}/></LineChart></ResponsiveContainer></div></div>)}</div></ChartCard>}
