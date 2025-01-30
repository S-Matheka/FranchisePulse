import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { CallViewModal } from '../../modals/CallViewModal';

interface ReviewCall {
  id: string;
  name: string;
  phone: string;
  summary: string;
  reason: string;
}

const reviewCalls: ReviewCall[] = [
  {
    id: 'caller-2',  // Updated to match transcript ID
    name: 'Caller 2',
    phone: '425-555-1212',
    summary: 'Customer expressed high satisfaction with service department experience.',
    reason: 'Caller was very positive'
  },
  {
    id: 'marketing',  // Updated to match transcript ID
    name: 'Caller 1',
    phone: '303-555-1212',
    summary: 'Long-time customer praising dealership service quality.',
    reason: 'Caller is very loyal to our dealership'
  }
];

interface MarketingCallsToReviewSectionProps {
  isDarkMode: boolean;
}

export const MarketingCallsToReviewSection = ({ isDarkMode }: MarketingCallsToReviewSectionProps) => {
  const [selectedCall, setSelectedCall] = useState<ReviewCall | null>(null);

  return (
    <div className={`rounded-lg overflow-hidden ${
      isDarkMode ? 'bg-gray-800/90 border border-gray-700/50' : 'bg-white border border-gray-200'
    }`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Calls to Review
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                Lead
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                Summary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                View Call
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-white'
          }`}>
            {reviewCalls.map((call) => (
              <tr key={call.id} className={`
                transition-colors duration-150
                ${isDarkMode 
                  ? 'hover:bg-gray-700/50' 
                  : 'hover:bg-gray-50'
                }
              `}>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  {call.name}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {call.phone}
                </td>
                <td className={`px-6 py-4 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {call.summary}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400">
                    {call.reason}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => setSelectedCall(call)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'text-blue-400 hover:bg-blue-500/10'
                        : 'text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Eye className="w-4 h-4 mr-1.5" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CallViewModal
        isOpen={selectedCall !== null}
        onClose={() => setSelectedCall(null)}
        lead={selectedCall}
        type="review"
        isDarkMode={isDarkMode}
      />
    </div>
  );
};