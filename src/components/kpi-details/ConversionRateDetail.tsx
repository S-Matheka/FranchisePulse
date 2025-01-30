import React from 'react';
import { TrendingUp, Users, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = {
  current: '32%',
  previousPeriod: '27%',
  trend: 5,
  bySource: {
    website: '35%',
    phone: '40%',
    email: '25%'
  },
  timeline: [
    { date: 'Mon', rate: 28 },
    { date: 'Tue', rate: 32 },
    { date: 'Wed', rate: 35 },
    { date: 'Thu', rate: 30 },
    { date: 'Fri', rate: 34 },
    { date: 'Sat', rate: 38 },
    { date: 'Sun', rate: 32 }
  ]
};

export const ConversionRateDetail = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Current Rate</h3>
          <p className="text-2xl font-bold text-green-600">{data.current}</p>
          <div className="flex items-center mt-1">
            <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
            <span className="text-sm text-green-500">+{data.trend}% vs last period</span>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Previous Period</h3>
          <p className="text-2xl font-bold text-[#4f8edb]">{data.previousPeriod}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4">
        <h3 className="font-medium text-[#1f3653] mb-4">Conversion Rate Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.timeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" stroke="#58677f" />
              <YAxis stroke="#58677f" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number) => [`${value}%`, 'Conversion Rate']}
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#4f8edb" 
                strokeWidth={2}
                dot={{ fill: '#4f8edb', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg">
        <div className="p-4 border-b">
          <h3 className="font-medium text-[#1f3653]">Conversion by Source</h3>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {Object.entries(data.bySource).map(([source, rate]) => (
              <div key={source} className="flex items-center justify-between">
                <div className="flex items-center">
                  {source === 'website' && <Target className="w-5 h-5 text-[#4f8edb] mr-2" />}
                  {source === 'phone' && <Users className="w-5 h-5 text-[#e0a731] mr-2" />}
                  {source === 'email' && <TrendingUp className="w-5 h-5 text-[#cee0cf] mr-2" />}
                  <span className="text-[#58677f] capitalize">{source}</span>
                </div>
                <span className="font-medium text-[#1f3653]">{rate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};