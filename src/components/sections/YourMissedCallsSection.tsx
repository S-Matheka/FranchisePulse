import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { VoiceMailModal } from '../modals/VoiceMailModal';

interface MissedCall {
  id: string;
  name: string;
  phone: string;
  line: string;
  hasVoiceMail: boolean;
}

const missedCalls: MissedCall[] = [
  {
    id: '1',
    name: 'Sam Smith',
    phone: '202-555-1212',
    line: 'Service',
    hasVoiceMail: true
  },
  {
    id: '2',
    name: 'Mary Berry',
    phone: '404-555-1212',
    line: 'Service',
    hasVoiceMail: false
  }
];

interface YourMissedCallsSectionProps {
  isDarkMode: boolean;
}

export const YourMissedCallsSection = ({ isDarkMode }: YourMissedCallsSectionProps) => {
  const [selectedCall, setSelectedCall] = useState<MissedCall | null>(null);

  return (
    <div className={`rounded-lg overflow-hidden ${
      isDarkMode ? 'bg-gray-800/90 border border-gray-700/50' : 'bg-white border border-gray-200'
    }`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Your Missed Calls
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                Caller
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                Line
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                Voice Mail
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-white'
          }`}>
            {missedCalls.map((call) => (
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
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {call.line}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {call.hasVoiceMail ? (
                    <button
                      onClick={() => setSelectedCall(call)}
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg transition-colors ${
                        isDarkMode
                          ? 'text-blue-400 hover:bg-blue-500/10'
                          : 'text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Volume2 className="w-4 h-4 mr-1.5" />
                      Listen
                    </button>
                  ) : (
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                      None Left
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <VoiceMailModal
        isOpen={selectedCall !== null}
        onClose={() => setSelectedCall(null)}
        call={selectedCall}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};