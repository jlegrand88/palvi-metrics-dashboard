'use client';

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, Typography } from 'antd';

interface Props {
  data: any[];
  metricKey: string;
  label: string;
  color?: string;
}

export const TrendChart = ({ data, metricKey, label, color = "#1677ff" }: Props) => {
  // Solo mostramos los últimos 30 días para que no se vea amontonado
  const recentData = data.slice(-30).map(d => ({
    date: new Date(d.date).toLocaleDateString('es-CL', { day: '2-digit', month: 'short' }),
    value: d.metrics[metricKey]
  }));

  return (
    <Card title={`Tendencia: ${label} (Últimos 30 días)`} className="shadow-sm border-0">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={recentData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.1}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
            <YAxis tick={{fontSize: 10}} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              fillOpacity={1} 
              fill="url(#colorValue)" 
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};