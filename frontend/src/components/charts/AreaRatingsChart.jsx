import React from 'react';
import {ResponsiveContainer,AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip} from 'recharts';
import ChartCard from './ChartCard';
const defaultData=[320,390,430,500,470,580,620,760,900,840,610,720].map((ratings,i)=>({month:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],ratings}));
export default function AreaRatingsChart({data=defaultData}){return <ChartCard title="Ratings Over Time"><ResponsiveContainer width="100%" height={260}><AreaChart data={data}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month"/><YAxis/><Tooltip/><Area type="monotone" dataKey="ratings" stroke="#dc2626" fill="#fecaca" strokeWidth={2}/></AreaChart></ResponsiveContainer></ChartCard>}
