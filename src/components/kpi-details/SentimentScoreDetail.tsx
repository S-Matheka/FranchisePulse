import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '6AM', score: 8.2 },
  { time: '8AM', score: 8.5 },
  { time: '10AM', score: 8.8 },
  { time: '12PM', score: 8.4 },
  { time: '2PM', score: 8.9 },
  { time: '4PM', score: 9.1 },
  { time: '6PM', score: 8.7 }
];

export const SentimentScoreDetail = () => {
  return (
    <div>
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f8edb" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4f8edb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="time" stroke="#58677f" />
            <YAxis stroke="#58677f" domain={[0, 10]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number) => [`${value}/10`, 'Score']}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#4f8edb"
              fillOpacity={1}
              fill="url(#colorScore)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Average Score</h3>
          <p className="text-lg font-semibold text-[#1f3653]">8.7/10</p>
        </div>
        <div className="bg-white/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Highest Score</h3>
          <p className="text-lg font-semibold text-[#1f3653]">9.1/10</p>
        </div>
        <div className="bg-white/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Positive Calls</h3>
          <p className="text-lg font-semibold text-[#1f3653]">92%</p>
        </div>
        <div className="bg-white/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Trend</h3>
          <p className="text-lg font-semibold text-green-500">+1.5%</p>
        </div>
      </div>
    </div>
  );
};