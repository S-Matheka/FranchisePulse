import React from 'react';
import { Calendar, Download, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', inbound: 45, outbound: 62 },
  { day: 'Tue', inbound: 62, outbound: 78 },
  { day: 'Wed', inbound: 78, outbound: 55 },
  { day: 'Thu', inbound: 55, outbound: 80 },
  { day: 'Fri', inbound: 80, outbound: 95 },
  { day: 'Sat', inbound: 95, outbound: 60 },
  { day: 'Sun', inbound: 60, outbound: 75 },
];

interface CallVolumeChartProps {
  isDarkMode: boolean;
}

export const CallVolumeChart = ({ isDarkMode }: CallVolumeChartProps) => {
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const gridColor = isDarkMode ? '#374151' : '#E5E7EB';

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Call Volume
        </h2>
        <div className="flex items-center space-x-2">
          <button className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <Calendar className="w-5 h-5" />
          </button>
          <button className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <Filter className="w-5 h-5" />
          </button>
          <button className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis 
              dataKey="day" 
              stroke={textColor}
              tick={{ fill: textColor }}
            />
            <YAxis 
              stroke={textColor}
              tick={{ fill: textColor }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? '#1F2937' : 'white',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                color: textColor
              }}
            />
            <Line 
              type="monotone" 
              dataKey="inbound" 
              stroke="#1a237e" 
              strokeWidth={2}
              dot={{ fill: '#1a237e', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="outbound" 
              stroke="#1b5e20" 
              strokeWidth={2}
              dot={{ fill: '#1b5e20', strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center space-x-8 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#1a237e]" />
          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Inbound</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#1b5e20]" />
          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Outbound</span>
        </div>
      </div>
    </>
  );
};