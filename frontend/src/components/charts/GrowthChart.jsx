import React from 'react';
import {ResponsiveContainer,AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,Legend} from 'recharts';
import ChartCard from './ChartCard';
const defaultData=[['Jan',320,90],['Feb',460,150],['Mar',520,190],['Apr',700,260],['May',590,280],['Jun',810,450]].map(([month,users,stores])=>({month,users,stores}));
export default function GrowthChart({data=defaultData}){return <ChartCard title="User / Store Growth"><ResponsiveContainer width="100%" height={250}><AreaChart data={data}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month" tick={{fontSize:9}}/><YAxis tick={{fontSize:9}}/><Tooltip/><Legend/><Area type="monotone" dataKey="users" stroke="#dc2626" fill="#fee2e2"/><Area type="monotone" dataKey="stores" stroke="#f97316" fill="#ffedd5"/></AreaChart></ResponsiveContainer></ChartCard>}
