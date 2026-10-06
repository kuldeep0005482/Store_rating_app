import React from 'react';
import {ResponsiveContainer,BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip} from 'recharts';
import ChartCard from './ChartCard';
const defaultData=[['Urban Basket',482],['TechWorld',390],['FreshMart',305],['City Fashion',190]].map(([store,rating])=>({store,rating}));
export default function StoreComparisonChart({data=defaultData}){return <ChartCard title="Store Comparison"><ResponsiveContainer width="100%" height={250}><BarChart data={data} margin={{left:-20,bottom:25}}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="store" tick={{fontSize:9}} angle={-15} textAnchor="end"/><YAxis tick={{fontSize:9}}/><Tooltip/><Bar dataKey="rating" fill="#dc2626" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></ChartCard>}
