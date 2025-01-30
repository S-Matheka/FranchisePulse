import React from 'react';
import { Calendar, Download, Filter } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { topic: 'Financing Inquiry', value: 35, color: '#1a237e' },
  { topic: 'Inventory Check', value: 25, color: '#1b5e20' },
  { topic: 'Service Scheduling', value: 20, color: '#0277bd' },
  { topic: 'Price Quotes', value: 12, color: '#b71c1c' },
  { topic: 'Test Drive', value: 8, color: '#4a148c' }
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, topic, value }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.7;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const textAnchor = x > cx ? 'start' : 'end';
  const xPadding = x > cx ? 5 : -5;
  
  return (
    <g>
      <path
        d={`M${cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN)},${
          cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN)
        }L${x - xPadding},${y}`}
        stroke="#000000"
        fill="none"
        strokeWidth={1}
      />
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        fill="#000000"
        className="text-xs md:text-sm"
        dominantBaseline="central"
      >
        {`${topic} (${value}%)`}
      </text>
    </g>
  );
};

interface CallTopicsChartProps {
  isDarkMode: boolean;
}

export const CallTopicsChart = ({ isDarkMode }: CallTopicsChartProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Call Topics</h2>
          <p className="text-sm text-gray-600">Most common conversation themes</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Calendar className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="h-[400px]">
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
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                color: '#000000'
              }}
              formatter={(value: number) => [`${value}%`, 'Percentage']}
              labelStyle={{ color: '#000000' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-1">Top Topic</h3>
          <p className="text-lg font-semibold text-gray-900">Financing Inquiry</p>
          <p className="text-sm text-gray-600">35% of all calls</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-1">Trending Topic</h3>
          <p className="text-lg font-semibold text-gray-900">Service Scheduling</p>
          <p className="text-sm text-green-700">↑ 12% this week</p>
        </div>
      </div>
    </div>
  );
};