import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { CallViewModal } from '../modals/CallViewModal';

interface Lead {
  id: string;
  name: string;
  phone: string;
  summary: string;
}

const pursueLeads: Lead[] = [
  {
    id: 'sally-smith',  // Updated to match transcript ID exactly
    name: 'Sally Smith',
    phone: '770-555-1212',
    summary: 'Customer interested in 2024 Honda Civic, requested financing information.'
  },
  {
    id: 'jim-jones',    // Updated to match transcript ID exactly
    name: 'Jim Jones',
    phone: '678-555-1212',
    summary: 'Follow-up needed regarding service appointment scheduling and warranty coverage.'
  }
];

interface PursueForYouSectionProps {
  isDarkMode: boolean;
}

export const PursueForYouSection = ({ isDarkMode }: PursueForYouSectionProps) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  return (
    <div className={`rounded-lg overflow-hidden ${
      isDarkMode ? 'bg-gray-800/90 border border-gray-700/50' : 'bg-white border border-gray-200'
    }`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Pursue for You
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
                View Call
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-white'
          }`}>
            {pursueLeads.map((lead) => (
              <tr key={lead.id} className={`
                transition-colors duration-150
                ${isDarkMode 
                  ? 'hover:bg-gray-700/50' 
                  : 'hover:bg-gray-50'
                }
              `}>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  {lead.name}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {lead.phone}
                </td>
                <td className={`px-6 py-4 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {lead.summary}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => setSelectedLead(lead)}
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
        isOpen={selectedLead !== null}
        onClose={() => setSelectedLead(null)}
        lead={selectedLead}
        type="call"
        isDarkMode={isDarkMode}
      />
    </div>
  );
};