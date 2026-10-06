import React from 'react';
import {ResponsiveContainer,PieChart,Pie,Cell,Tooltip} from 'recharts';
import ChartCard from './ChartCard';
const defaultData=[['5 Stars',2865],['4 Stars',2363],['3 Stars',1516],['2 Stars',1011],['1 Star',674]].map(([name,value])=>({name,value}));
const colors=['#991b1b','#dc2626','#f97316','#fca5a5','#fecaca'];
export default function RatingDistributionChart({data=defaultData}){return <ChartCard title="Rating Distribution"><div className="flex items-center gap-4"><div className="h-[220px] w-1/2"><ResponsiveContainer><PieChart><Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={2}>{data.map((_,i)=><Cell key={i} fill={colors[i%colors.length]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></div><div className="flex-1 space-y-2">{data.map((x,i)=><div key={x.name} className="flex justify-between text-xs"><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full" style={{background:colors[i%colors.length]}}/>{x.name}</span><strong>{x.value.toLocaleString()}</strong></div>)}</div></div></ChartCard>}
