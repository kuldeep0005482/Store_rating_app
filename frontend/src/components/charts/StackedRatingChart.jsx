import React from 'react';
import {ResponsiveContainer,BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend} from 'recharts';
import ChartCard from './ChartCard';
const defaultData=[['Jan',150,120,100,70,40],['Feb',180,140,120,75,45],['Mar',220,150,130,80,50],['Apr',170,135,110,72,44],['May',205,145,125,78,48],['Jun',240,160,135,85,52]].map(([month,a,b,c,d,e])=>({month,a,b,c,d,e}));
export default function StackedRatingChart({data=defaultData}){return <ChartCard title="Ratings by Month"><ResponsiveContainer width="100%" height={250}><BarChart data={data}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month" tick={{fontSize:9}}/><YAxis tick={{fontSize:9}}/><Tooltip/><Legend/><Bar dataKey="a" stackId="r" fill="#991b1b"/><Bar dataKey="b" stackId="r" fill="#f97316"/><Bar dataKey="c" stackId="r" fill="#f59e0b"/><Bar dataKey="d" stackId="r" fill="#fca5a5"/><Bar dataKey="e" stackId="r" fill="#fecaca"/></BarChart></ResponsiveContainer></ChartCard>}
