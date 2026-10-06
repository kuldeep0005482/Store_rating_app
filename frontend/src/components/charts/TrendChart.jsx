import React from 'react';
import {ResponsiveContainer,AreaChart,Area,XAxis,Tooltip} from 'recharts';
import ChartCard from './ChartCard';
const defaultData=[30,42,35,48,50,67,66,82,74,88,84,96].map((value,x)=>({x,value}));
export default function TrendChart({data=defaultData,title='Mini Trend Chart'}){return <ChartCard title={title}><ResponsiveContainer width="100%" height={120}><AreaChart data={data}><XAxis dataKey="x" hide/><Tooltip/><Area type="monotone" dataKey="value" stroke="#16a34a" fill="#dcfce7" strokeWidth={2}/></AreaChart></ResponsiveContainer><p className="mt-2 text-xs font-semibold text-[#16a34a]">↗ 12% <span className="font-normal text-[#6b7280]">from last month</span></p></ChartCard>}
