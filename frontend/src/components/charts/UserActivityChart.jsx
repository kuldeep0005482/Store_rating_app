import React from 'react';
import {ResponsiveContainer,BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip} from 'recharts';
import ChartCard from './ChartCard';
const defaultData=[['Mon',90],['Tue',125],['Wed',100],['Thu',140],['Fri',130],['Sat',175],['Sun',155]].map(([day,users])=>({day,users}));
export default function UserActivityChart({data=defaultData}){return <ChartCard title="User Activity"><ResponsiveContainer width="100%" height={240}><BarChart data={data}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="day"/><YAxis/><Tooltip/><Bar dataKey="users" fill="#ef4444" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></ChartCard>}
