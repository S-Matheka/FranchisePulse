import React from 'react';
import { TrendingUp } from 'lucide-react';

interface MarketingTrendingTopicsProps {
  isDarkMode: boolean;
}

const topics = [
  { name: 'Dealer Financing', count: 156, trend: 12 },
  { name: 'May Service Promotion', count: 134, trend: 8 },
  { name: 'Airbag recall', count: 89, trend: -5 },
  { name: 'Trade-in Values', count: 76, trend: 15 },
  { name: 'New Model Availability', count: 65, trend: 10 }
];

export const MarketingTrendingTopicsSection = ({ isDarkMode }: MarketingTrendingTopicsProps) => {
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
          Marketing Impact
        </span>
      </div>

      <div className="p-4 space-y-4">
        {topics.map((topic, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>
                {topic.name}
              </span>
              <div className="flex items-center space-x-3">
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {topic.count} mentions
                </span>
                <span className={`text-sm ${
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
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`p-4 border-t ${
        isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-100 bg-gray-50'
      }`}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className={`text-sm font-medium mb-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Most Discussed
            </h3>
            <p className={`text-lg font-semibold ${
              isDarkMode ? 'text-gray-200' : 'text-gray-900'
            }`}>
              Dealer Financing
            </p>
            <p className="text-sm text-green-500">↑ 12% this week</p>
          </div>
          <div>
            <h3 className={`text-sm font-medium mb-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Fastest Growing
            </h3>
            <p className={`text-lg font-semibold ${
              isDarkMode ? 'text-gray-200' : 'text-gray-900'
            }`}>
              Trade-in Values
            </p>
            <p className="text-sm text-green-500">↑ 15% this week</p>
          </div>
        </div>
      </div>
    </div>
  );
};