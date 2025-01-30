import React from 'react';
import { Calendar, Download, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { hour: '8AM', calls: 45, missedCalls: 3 },
  { hour: '9AM', calls: 78, missedCalls: 5 },
  { hour: '10AM', calls: 95, missedCalls: 8 },
  { hour: '11AM', calls: 85, missedCalls: 6 },
  { hour: '12PM', calls: 65, missedCalls: 4 },
  { hour: '1PM', calls: 55, missedCalls: 3 },
  { hour: '2PM', calls: 88, missedCalls: 7 },
  { hour: '3PM', calls: 92, missedCalls: 8 },
  { hour: '4PM', calls: 75, missedCalls: 5 },
  { hour: '5PM', calls: 45, missedCalls: 2 }
];

interface PeakHoursChartProps {
  isDarkMode: boolean;
}

export const PeakHoursChart = ({ isDarkMode }: PeakHoursChartProps) => {
  const textColor = isDarkMode ? '#FFFFFF' : '#1F2937';
  const gridColor = '#E5E7EB';
  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const cardBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-50';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Peak Hours
          </h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Busiest periods and staffing needs
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className={`p-2 rounded-lg transition-colors ${
            isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
          }`}>
            <Calendar className="w-5 h-5" />
          </button>
          <button className={`p-2 rounded-lg transition-colors ${
            isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
          }`}>
            <Filter className="w-5 h-5" />
          </button>
          <button className={`p-2 rounded-lg transition-colors ${
            isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
          }`}>
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={gridColor} 
              vertical={false}
            />
            <XAxis 
              dataKey="hour" 
              stroke={textColor}
              tick={{ fill: textColor, fontSize: 12 }}
              tickLine={{ stroke: textColor }}
              axisLine={{ stroke: textColor }}
            />
            <YAxis 
              stroke={textColor}
              tick={{ fill: textColor, fontSize: 12 }}
              tickLine={{ stroke: textColor }}
              axisLine={{ stroke: textColor }}
              tickCount={6}
              domain={[0, 'dataMax + 20']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? '#1F2937' : 'white',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                color: textColor
              }}
              labelStyle={{ color: textColor, fontWeight: 'bold' }}
              itemStyle={{ color: textColor }}
            />
            <Bar 
              dataKey="calls" 
              fill="#1E40AF" 
              name="Total Calls" 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="missedCalls" 
              fill="#DC2626" 
              name="Missed Calls" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className={`${cardBg} rounded-lg p-4`}>
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-900'} mb-1`}>
            Peak Time
          </h3>
          <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            10:00 AM
          </p>
        </div>
        <div className={`${cardBg} rounded-lg p-4`}>
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-900'} mb-1`}>
            Busiest Period
          </h3>
          <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            10AM - 3PM
          </p>
        </div>
        <div className={`${cardBg} rounded-lg p-4`}>
          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-900'} mb-1`}>
            Staff Required
          </h3>
          <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            5 Agents
          </p>
        </div>
      </div>
    </div>
  );
};