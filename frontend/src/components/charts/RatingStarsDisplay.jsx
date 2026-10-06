import React from 'react';
import {Star} from 'lucide-react';
import ChartCard from './ChartCard';
export default function RatingStarsDisplay(){return <ChartCard title="Star Rating Display"><div className="space-y-2">{[5,4,3,2,1].map(n=><div key={n} className="flex items-center gap-3"><div className="flex">{[1,2,3,4,5].map(i=><Star key={i} size={20} fill={i<=n?'#f59e0b':'transparent'} className={i<=n?'text-[#f59e0b]':'text-[#d1d5db]'}/>)}</div><span className="text-xs font-semibold">{n}.0</span></div>)}</div></ChartCard>}
