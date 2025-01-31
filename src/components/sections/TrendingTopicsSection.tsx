import React from 'react';
import { TrendingUp } from 'lucide-react';

interface Topic {
  name: string;
  count: number;
  trend: number;
}

const topics: Topic[] = [
  { name: 'Heater Service', count: 156, trend: 12 },
  { name: 'Seasonal Promotion', count: 134, trend: 8 },
  { name: 'Air Conditioning Maintenance', count: 89, trend: -5 },
  { name: 'HVAC Financing', count: 76, trend: 15 },
  { name: 'Trane Rebate', count: 65, trend: 10 }
];

interface TrendingTopicsSectionProps {
  isDarkMode: boolean;
}

export const TrendingTopicsSection = ({ isDarkMode }: TrendingTopicsSectionProps) => {
  const maxCount = Math.max(...topics.map(t => t.count));

  return (
    <div className={`rounded-lg overflow-hidden ${
      isDarkMode ? 'bg-gray-800/90 border border-gray-700/50' : 'bg-white border border-gray-200'
    }`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Trending Topics
          </h2>
        </div>
        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Team Overview
        </span>
      </div>

      <div className="p-6 space-y-8">
        {topics.map((topic, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-base font-medium ${
                isDarkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>
                {topic.name}
              </span>
              <div className="flex items-center space-x-4">
                <span className={`text-base ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {topic.count} mentions
                </span>
                <span className={`text-base ${
                  topic.trend > 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {topic.trend > 0 ? '+' : ''}{topic.trend}%
                </span>
              </div>
            </div>

            <div className="relative">
              <div className={`w-full h-2 rounded-full ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <div
                  className={`absolute left-0 top-0 h-2 rounded-full transition-all duration-500 ${
                    isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
                  }`}
                  style={{ width: `${(topic.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-8 pt-4 mt-8 border-t border-gray-700">
          <div>
            <h3 className="text-base text-gray-400 mb-2">
              Most Discussed
            </h3>
            <p className="text-xl font-semibold text-white mb-1">
              Heater Service
            </p>
            <p className="text-base text-green-500">↑ 12% this week</p>
          </div>
          <div>
            <h3 className="text-base text-gray-400 mb-2">
              Fastest Growing
            </h3>
            <p className="text-xl font-semibold text-white mb-1">
              HVAC Financing
            </p>
            <p className="text-base text-green-500">↑ 15% this week</p>
          </div>
        </div>
      </div>
    </div>
  );
};