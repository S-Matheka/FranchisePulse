import React from 'react';
import { Award, TrendingDown, Eye } from 'lucide-react';

interface SalesAssociateCoachingProps {
  isDarkMode: boolean;
  onViewAgent: (agentId: string) => void;
}

const coachingData = [
  {
    id: '1',
    name: 'Sarah Wilson',
    bestMetrics: [
      'Total Call Volume',
      'Live Conversations',
      'Total Vehicle Conversations',
      'Firm Appointments',
      'Appointment Requests'
    ],
    laggingMetrics: [],
    recommendations: [
      'Consistently maintains high performance across all metrics',
      'Excellent follow-up strategy with leads',
      'Strong phone presence and customer engagement'
    ]
  },
  {
    id: '2',
    name: 'Tom Davis',
    bestMetrics: [
      'Total Call Volume',
      'Live Conversations'
    ],
    laggingMetrics: [
      'Total Vehicle Conversations',
      'Firm Appointments',
      'Appointment Requests'
    ],
    recommendations: [
      'Focus on vehicle-specific conversations',
      'Improve appointment setting techniques',
      'Review successful conversion strategies'
    ]
  },
  {
    id: '3',
    name: 'John Smith',
    bestMetrics: [
      'Live Conversations',
      'Vehicle Conversations'
    ],
    laggingMetrics: [
      'Total Call Volume',
      'Appointment Requests'
    ],
    recommendations: [
      'Increase daily call volume',
      'Enhance lead follow-up frequency',
      'Implement structured time management'
    ]
  }
];

export const SalesAssociateCoachingSection = ({ isDarkMode, onViewAgent }: SalesAssociateCoachingProps) => {
  return (
    <div className={`rounded-lg overflow-hidden ${
      isDarkMode ? 'bg-gray-800/90 border border-gray-700/50' : 'bg-white border border-gray-200'
    }`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Sales Associate Coaching
        </h2>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {coachingData.map((agent) => (
          <div key={agent.id} className={`p-6 ${
            isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
          } transition-colors`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className={`text-lg font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  {agent.name}
                </h3>
                {agent.bestMetrics.length > 0 && (
                  <div className="flex items-center mt-1">
                    <Award className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-500">Top Performer</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => onViewAgent(agent.id)}
                className={`inline-flex items-center px-3 py-1.5 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'text-blue-400 hover:bg-blue-500/10'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Eye className="w-4 h-4 mr-1.5" />
                View
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                {agent.bestMetrics.length > 0 && (
                  <div className="mb-4">
                    <h4 className={`text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Best Metrics
                    </h4>
                    <ul className="space-y-1">
                      {agent.bestMetrics.map((metric, index) => (
                        <li key={index} className={`text-sm flex items-center ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {agent.laggingMetrics.length > 0 && (
                  <div>
                    <h4 className={`text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Lagging Metrics
                    </h4>
                    <ul className="space-y-1">
                      {agent.laggingMetrics.map((metric, index) => (
                        <li key={index} className={`text-sm flex items-center ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <h4 className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Recommendations
                </h4>
                <ul className="space-y-2">
                  {agent.recommendations.map((recommendation, index) => (
                    <li key={index} className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      • {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};