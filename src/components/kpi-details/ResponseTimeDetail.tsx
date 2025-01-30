import React from 'react';
import { Clock, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = {
  current: '18m',
  target: '15m',
  trend: 5,
  breakdown: {
    under15min: 65,
    under30min: 85,
    over30min: 15
  },
  hourlyData: [
    { hour: '9AM', avgTime: 12 },
    { hour: '10AM', avgTime: 18 },
    { hour: '11AM', avgTime: 15 },
    { hour: '12PM', avgTime: 22 },
    { hour: '1PM', avgTime: 16 },
    { hour: '2PM', avgTime: 14 },
    { hour: '3PM', avgTime: 20 }
  ]
};

export const ResponseTimeDetail = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Current Average</h3>
          <p className="text-2xl font-bold text-[#4f8edb]">{data.current}</p>
          <div className="flex items-center mt-1">
            <Clock className="w-4 h-4 mr-1 text-[#58677f]" />
            <span className="text-sm text-[#58677f]">Target: {data.target}</span>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Improvement</h3>
          <div className="flex items-center">
            <TrendingUp className="w-5 h-5 text-green-500 mr-1" />
            <p className="text-2xl font-bold text-green-500">+{data.trend}%</p>
          </div>
          <p className="text-sm text-[#58677f] mt-1">vs last period</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4">
        <h3 className="font-medium text-[#1f3653] mb-4">Response Time Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="hour" stroke="#58677f" />
              <YAxis stroke="#58677f" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number) => [`${value}m`, 'Average Response Time']}
              />
              <Bar dataKey="avgTime" fill="#4f8edb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Under 15 min</h3>
          <p className="text-lg font-semibold text-green-500">{data.breakdown.under15min}%</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Under 30 min</h3>
          <p className="text-lg font-semibold text-[#4f8edb]">{data.breakdown.under30min}%</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Over 30 min</h3>
          <p className="text-lg font-semibold text-[#ce1215]">{data.breakdown.over30min}%</p>
        </div>
      </div>
    </div>
  );
};