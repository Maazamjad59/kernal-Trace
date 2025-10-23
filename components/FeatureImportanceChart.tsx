import React from 'react';
import type { FeatureImportance } from '../types';

interface FeatureImportanceChartProps {
  data: FeatureImportance[];
}

const COLORS = ['#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc'];

export const FeatureImportanceChart: React.FC<FeatureImportanceChartProps> = ({ data }) => {
  // Access Recharts from the window object at render time
  const Recharts = (window as any).Recharts;

  // If the library isn't loaded yet, show a loading message
  if (!Recharts) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Loading chart component...</p>
      </div>
    );
  }

  // Destructure components from the Recharts object
  const { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } = Recharts;

  const sortedData = [...data].sort((a, b) => b.importance - a.importance);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/80 backdrop-blur-sm p-2 border border-gray-600 rounded-md shadow-lg">
          <p className="label text-gray-200">{`${label}`}</p>
          <p className="intro text-cyan-400">{`Importance: ${payload[0].value.toFixed(2)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
        <XAxis type="number" stroke="#9ca3af" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
        <YAxis 
          type="category" 
          dataKey="feature" 
          stroke="#9ca3af" 
          width={80} 
          tick={{ fontSize: 12, fill: '#d1d5db' }}
          />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(107, 114, 128, 0.2)' }}/>
        <Bar dataKey="importance" fill="#06b6d4" barSize={20}>
            {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
