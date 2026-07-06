'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

interface RevenueChartProps {
  data: { name: string; revenue: number }[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
        <XAxis dataKey="name" stroke="#a1a1aa" />
        <YAxis stroke="#a1a1aa" />
        <RechartsTooltip 
          contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a' }}
          itemStyle={{ color: '#fff' }}
        />
        <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}
