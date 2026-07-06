'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

interface PurposeChartProps {
  data: { name: string; value: number }[];
}

export default function PurposeChart({ data }: PurposeChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
        <XAxis dataKey="name" stroke="#a1a1aa" angle={-45} textAnchor="end" height={60} />
        <YAxis stroke="#a1a1aa" />
        <RechartsTooltip 
          contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a' }}
          itemStyle={{ color: '#fff' }}
        />
        <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
