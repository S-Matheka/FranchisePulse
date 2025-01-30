import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ActivityBySourceSectionProps {
  isDarkMode: boolean;
}

const sourceData = [
  {
    source: 'Google Ad 1',
    totalCalls: 245,
    callsAnswered: 198,
    callsMissed: 47,
    appointmentsSet: 52
  },
  {
    source: 'Google Ad 2',
    totalCalls: 189,
    callsAnswered: 156,
    callsMissed: 33,
    appointmentsSet: 41
  },
  {
    source: 'Google Business',
    totalCalls: 312,
    callsAnswered: 267,
    callsMissed: 45,
    appointmentsSet: 78
  },
  {
    source: 'Facebook',
    totalCalls: 178,
    callsAnswered: 145,
    callsMissed: 33,
    appointmentsSet: 38
  }
];

export const ActivityBySourceSection = ({ isDarkMode }: ActivityBySourceSectionProps) => {
  return (
    <div className={`rounded-lg overflow-hidden ${
      isDarkMode ? 'bg-gray-800/90 border border-gray-700/50' : 'bg-white border border-gray-200'
    }`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Activity by Source
        </h2>
        <button
          className={`inline-flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
            isDarkMode 
              ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' 
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
        >
          View Details
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                Total Calls
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                Calls Answered
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                Calls Missed
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                Total Appointments Set
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-white'
          }`}>
            {sourceData.map((source, index) => (
              <tr key={index} className={`
                transition-colors duration-150
                ${isDarkMode 
                  ? 'hover:bg-gray-700/50' 
                  : 'hover:bg-gray-50'
                }
              `}>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  {source.source}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {source.totalCalls}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`}>
                  {source.callsAnswered}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}>
                  {source.callsMissed}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {source.appointmentsSet}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};