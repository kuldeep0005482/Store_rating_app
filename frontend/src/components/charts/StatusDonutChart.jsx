import React from 'react';
import {ResponsiveContainer,PieChart,Pie,Cell} from 'recharts';
import ChartCard from './ChartCard';
const defaultData=[['Active',120],['Pending',40],['Inactive',24]].map(([name,value])=>({name,value}));
const colors=['#16a34a','#f59e0b','#f87171'];
export default function StatusDonutChart({data=defaultData}){return <ChartCard title="Store Status"><div className="flex items-center gap-4"><div className="h-44 w-1/2"><ResponsiveContainer><PieChart><Pie data={data} dataKey="value" innerRadius={48} outerRadius={70}>{data.map((_,i)=><Cell key={i} fill={colors[i%3]}/>)}</Pie></PieChart></ResponsiveContainer></div><div className="space-y-2 text-xs">{data.map((x,i)=><div key={x.name} className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full" style={{background:colors[i%3]}}/>{x.name}: <strong>{x.value}</strong></div>)}</div></div></ChartCard>}
