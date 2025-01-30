import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', inbound: 45, outbound: 32 },
  { time: '04:00', inbound: 30, outbound: 25 },
  { time: '08:00', inbound: 85, outbound: 70 },
  { time: '12:00', inbound: 120, outbound: 95 },
  { time: '16:00', inbound: 95, outbound: 85 },
  { time: '20:00', inbound: 60, outbound: 45 },
  { time: '23:59', inbound: 40, outbound: 30 },
];

export const TotalCallVolumeDetail = () => {
  return (
    <div>
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f8edb" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4f8edb" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e0a731" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#e0a731" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="time" stroke="#58677f" />
            <YAxis stroke="#58677f" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="inbound" 
              stroke="#4f8edb" 
              fillOpacity={1} 
              fill="url(#colorInbound)" 
              name="Inbound"
            />
            <Area 
              type="monotone" 
              dataKey="outbound" 
              stroke="#e0a731" 
              fillOpacity={1} 
              fill="url(#colorOutbound)" 
              name="Outbound"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Total Today</h3>
          <p className="text-lg font-semibold text-[#1f3653]">2,847</p>
        </div>
        <div className="bg-white/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Peak Hour</h3>
          <p className="text-lg font-semibold text-[#1f3653]">12:00 PM</p>
        </div>
        <div className="bg-white/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Inbound</h3>
          <p className="text-lg font-semibold text-[#1f3653]">1,245</p>
        </div>
        <div className="bg-white/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Outbound</h3>
          <p className="text-lg font-semibold text-[#1f3653]">1,602</p>
        </div>
      </div>
    </div>
  );
};