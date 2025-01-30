import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '6AM', duration: 180 },
  { time: '8AM', duration: 240 },
  { time: '10AM', duration: 320 },
  { time: '12PM', duration: 420 },
  { time: '2PM', duration: 380 },
  { time: '4PM', duration: 300 },
  { time: '6PM', duration: 260 }
];

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

export const CallDurationDetail = () => {
  return (
    <div>
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="time" stroke="#58677f" />
            <YAxis 
              stroke="#58677f"
              tickFormatter={formatDuration}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number) => [formatDuration(value), 'Duration']}
            />
            <Line 
              type="monotone" 
              dataKey="duration" 
              stroke="#e0a731" 
              strokeWidth={2}
              dot={{ fill: '#e0a731', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Average Duration</h3>
          <p className="text-lg font-semibold text-[#1f3653]">5m 23s</p>
        </div>
        <div className="bg-white/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Longest Call</h3>
          <p className="text-lg font-semibold text-[#1f3653]">15m 42s</p>
        </div>
        <div className="bg-white/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Shortest Call</h3>
          <p className="text-lg font-semibold text-[#1f3653]">45s</p>
        </div>
        <div className="bg-white/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Trend</h3>
          <p className="text-lg font-semibold text-green-500">+3.8%</p>
        </div>
      </div>
    </div>
  );
};