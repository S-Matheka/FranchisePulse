import React from 'react';
import { Trophy, Star, TrendingUp, PhoneCall, CheckCircle } from 'lucide-react';

interface KudosSectionProps {
  isDarkMode: boolean;
}

export const KudosSection = ({ isDarkMode }: KudosSectionProps) => {
  const kudos = [
    {
      icon: <Trophy className="w-5 h-5 text-yellow-500" />,
      title: "Top Performer in Vehicle Conversations",
      description: "You had 45 vehicle-specific conversations yesterday, 28% above average"
    },
    {
      icon: <Star className="w-5 h-5 text-blue-500" />,
      title: "Excellent Call Quality",
      description: "Your average call quality score was 9.2/10"
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
      title: "Improved Conversion Rate",
      description: "Your lead-to-appointment conversion rate increased by 15%"
    },
    {
      icon: <PhoneCall className="w-5 h-5 text-purple-500" />,
      title: "Quick Response Time",
      description: "Average response time of 12 minutes, beating the target of 15 minutes"
    }
  ];

  return (
    <div className={`rounded-lg overflow-hidden ${
      isDarkMode ? 'bg-gray-800/90 border border-gray-700/50' : 'bg-white border border-gray-200'
    }`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Yesterday's Kudos
        </h2>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Here's what you did great yesterday
        </p>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {kudos.map((kudo, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-700/50 hover:bg-gray-700/70' 
                : 'bg-gray-50 hover:bg-gray-100'
            } transition-colors duration-200`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-gray-600' : 'bg-white'
              }`}>
                {kudo.icon}
              </div>
              <div>
                <h3 className={`font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  {kudo.title}
                </h3>
                <p className={`text-sm mt-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {kudo.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};