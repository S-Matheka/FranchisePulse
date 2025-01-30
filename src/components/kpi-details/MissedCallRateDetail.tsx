import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, TrendingDown, Users, Clock } from 'lucide-react';

const data = [
  { hour: '6AM', rate: 2.1, leads: 3 },
  { hour: '8AM', rate: 3.5, leads: 5 },
  { hour: '10AM', rate: 4.2, leads: 8 },
  { hour: '12PM', rate: 5.8, leads: 12 },
  { hour: '2PM', rate: 4.7, leads: 9 },
  { hour: '4PM', rate: 3.9, leads: 7 },
  { hour: '6PM', rate: 2.8, leads: 4 }
];

const leadData = {
  totalMissed: 48,
  highPriority: 18,
  callbackRequested: 32,
  averageCallbackTime: '28m',
  conversionRate: '45%'
};

interface MissedCallRateDetailProps {
  isDarkMode: boolean;
}

export const MissedCallRateDetail = ({ isDarkMode }: MissedCallRateDetailProps) => {
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const subTextColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const bgColor = isDarkMode ? 'bg-gray-700' : 'bg-gray-100';
  const chartTextColor = isDarkMode ? '#FFFFFF' : '#000000';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className={`p-4 rounded-lg ${bgColor}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-lg font-semibold ${textColor}`}>Current Rate</h3>
              <p className={`text-sm ${subTextColor}`}>Last 24 hours</p>
            </div>
            <div className="flex items-center text-green-500">
              <TrendingDown className="w-5 h-5 mr-1" />
              <span>-2.1%</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className={`text-3xl font-bold ${textColor}`}>4.2%</p>
              <p className={`text-sm ${subTextColor}`}>Overall Rate</p>
            </div>
            <div>
              <p className={`text-3xl font-bold text-red-500`}>119</p>
              <p className={`text-sm ${subTextColor}`}>Total Missed</p>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${bgColor}`}>
          <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>Lead Recovery</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className={`text-3xl font-bold text-green-500`}>{leadData.conversionRate}</p>
              <p className={`text-sm ${subTextColor}`}>Recovery Rate</p>
            </div>
            <div>
              <p className={`text-3xl font-bold ${textColor}`}>{leadData.averageCallbackTime}</p>
              <p className={`text-sm ${subTextColor}`}>Avg Callback Time</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg ${bgColor}`}>
        <h3 className={`text-lg font-semibold mb-4 ${textColor}`}>Hourly Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
              <XAxis 
                dataKey="hour" 
                stroke={chartTextColor}
                tick={{ fill: chartTextColor }}
              />
              <YAxis 
                stroke={chartTextColor}
                tick={{ fill: chartTextColor }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1F2937' : 'white',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  color: chartTextColor
                }}
                formatter={(value: number) => [`${value}%`, 'Missed Rate']}
              />
              <Bar dataKey="rate" fill="#DC2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className={`p-4 rounded-lg ${bgColor}`}>
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className={`w-5 h-5 text-red-500`} />
            <h4 className={`font-medium ${textColor}`}>High Priority</h4>
          </div>
          <p className={`text-2xl font-bold ${textColor}`}>{leadData.highPriority}</p>
          <p className={`text-sm ${subTextColor}`}>Require immediate attention</p>
        </div>

        <div className={`p-4 rounded-lg ${bgColor}`}>
          <div className="flex items-center space-x-2 mb-2">
            <Users className={`w-5 h-5 text-blue-500`} />
            <h4 className={`font-medium ${textColor}`}>Callback Requested</h4>
          </div>
          <p className={`text-2xl font-bold ${textColor}`}>{leadData.callbackRequested}</p>
          <p className={`text-sm ${subTextColor}`}>Scheduled callbacks</p>
        </div>

        <div className={`p-4 rounded-lg ${bgColor}`}>
          <div className="flex items-center space-x-2 mb-2">
            <Clock className={`w-5 h-5 text-yellow-500`} />
            <h4 className={`font-medium ${textColor}`}>Peak Time</h4>
          </div>
          <p className={`text-2xl font-bold ${textColor}`}>12:00 PM</p>
          <p className={`text-sm ${subTextColor}`}>Highest miss rate</p>
        </div>
      </div>
    </div>
  );
};