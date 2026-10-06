import React from 'react';
import {ResponsiveContainer,ComposedChart,Bar,Line,XAxis,YAxis,CartesianGrid,Tooltip} from 'recharts';
import ChartCard from './ChartCard';
const defaultData=[320,370,480,400,470,570,560,680,580,610,540,460].map((ratings,i)=>({month:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],ratings}));
export default function RatingOverviewChart({data=defaultData}){return <ChartCard title="Rating Overview" description="Monthly rating activity"><ResponsiveContainer width="100%" height={250}><ComposedChart data={data} margin={{top:10,right:8,left:-18,bottom:0}}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month" tick={{fontSize:10}}/><YAxis tick={{fontSize:10}}/><Tooltip/><Bar dataKey="ratings" fill="#fecaca" radius={[4,4,0,0]}/><Line type="monotone" dataKey="ratings" stroke="#dc2626" strokeWidth={2.5} dot={{r:3}}/></ComposedChart></ResponsiveContainer></ChartCard>}
