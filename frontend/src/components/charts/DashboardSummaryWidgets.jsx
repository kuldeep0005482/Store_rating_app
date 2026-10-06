import React from 'react';
import {Users,Store,Star,Activity} from 'lucide-react';
import StatCard from '../ui/StatCard';
export default function DashboardSummaryWidgets(){return <div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><StatCard title="Total Users" value="1,248" change={12} variant="users" icon={Users}/><StatCard title="Total Stores" value="184" change={8} variant="stores" icon={Store}/><StatCard title="Total Ratings" value="8,426" change={24} variant="ratings" icon={Star}/><StatCard title="Active Users" value="320" change={6} variant="users" icon={Activity}/></div>}
