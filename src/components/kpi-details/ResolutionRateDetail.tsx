import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Resolved', value: 94.8, color: '#cee0cf' },
  { name: 'Escalated', value: 3.2, color: '#e0a731' },
  { name: 'Unresolved', value: 2, color: '#ce1215' }
];

export const ResolutionRateDetail = () => {
  return (
    <div>
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, value }) => `${name} (${value}%)`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number) => [`${value}%`]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Resolution Rate</h3>
          <p className="text-lg font-semibold text-[#1f3653]">94.8%</p>
        </div>
        <div className="bg-white/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">First Call</h3>
          <p className="text-lg font-semibold text-[#1f3653]">82.5%</p>
        </div>
        <div className="bg-white/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Follow-ups</h3>
          <p className="text-lg font-semibold text-[#1f3653]">12.3%</p>
        </div>
        <div className="bg-white/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Trend</h3>
          <p className="text-lg font-semibold text-green-500">+5.2%</p>
        </div>
      </div>
    </div>
  );
};