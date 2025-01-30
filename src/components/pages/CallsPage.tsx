import React, { useState } from 'react';
import { CallList } from '../calls/CallList';
import { CallDetails } from '../calls/CallDetails';
import { CallQualityIndicator } from '../analytics/CallQualityIndicator';
import { LeadManagementDetails } from '../analytics/LeadManagementDetails';

interface CallsPageProps {
  isDarkMode: boolean;
}

// Add dummy calls data
const dummyCalls = [
  {
    id: '1',
    customerName: 'James Wilson',
    customerNumber: '214-555-1000',
    timestamp: 'Today 10:34 AM',
    duration: 133,
    status: 'Connected',
    agent: 'Simeon Parker',
    summary: 'Customer called to ask about store hours and directions. Agent provided office address and operating hours (8:30 AM - 7:00 PM everyday except Sundays).',
    hasConversation: true,
    vehicleDiscussed: '2024 Honda Civic',
    appointmentType: 'firm' as const,
    needsFollowUp: false,
    followUpPriority: 'low' as const
  },
  // ... other dummy calls
];

export const CallsPage = ({ isDarkMode }: CallsPageProps) => {
  const [activeTab, setActiveTab] = useState('calls');
  const [selectedCall, setSelectedCall] = useState(dummyCalls[0]);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('calls')}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === 'calls'
                ? 'text-white bg-primary dark:bg-primary-dark rounded-t-lg'
                : isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Calls
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === 'leads'
                ? 'text-white bg-primary dark:bg-primary-dark rounded-t-lg'
                : isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Lead Management
          </button>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === 'calls' ? (
          <div className="md:grid md:grid-cols-2 md:gap-6">
            <div className="space-y-4 mb-4 md:mb-0">
              <h2 className={`text-xl font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Recent Calls
              </h2>
              <div className={showDetails ? 'hidden md:block' : 'block'}>
                <CallList 
                  calls={dummyCalls} 
                  onSelectCall={(call) => {
                    setSelectedCall(call);
                    setShowDetails(true);
                  }}
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>
            <div className={!showDetails ? 'hidden md:block' : 'block'}>
              <div className="space-y-4">
                <CallQualityIndicator call={selectedCall} isDarkMode={isDarkMode} />
                <CallDetails call={selectedCall} isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>
        ) : (
          <LeadManagementDetails isDarkMode={isDarkMode} />
        )}
      </div>
    </div>
  );
};