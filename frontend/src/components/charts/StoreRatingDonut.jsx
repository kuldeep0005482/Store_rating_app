import React from 'react';
import {ResponsiveContainer,PieChart,Pie,Cell} from 'recharts';
import ChartCard from './ChartCard';
export default function StoreRatingDonut({value=4.6,total=320}){const p=value/5*100;return <ChartCard title="Small Donut for Store Rating"><div className="relative h-40"><ResponsiveContainer><PieChart><Pie startAngle={90} endAngle={-270} data={[{v:p},{v:100-p}]} dataKey="v" innerRadius={50} outerRadius={65} strokeWidth={0}><Cell fill="#dc2626"/><Cell fill="#fee2e2"/></Pie></PieChart></ResponsiveContainer><div className="absolute inset-0 flex flex-col items-center justify-center"><strong className="text-2xl">{value}</strong><span className="text-[10px] text-[#6b7280]">{total} ratings</span></div></div></ChartCard>}
