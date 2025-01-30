import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { InboundCallsModal } from '../modals/InboundCallsModal';

interface InboundCallsSectionProps {
  isDarkMode: boolean;
}

const inboundData = {
  metrics: [
    {
      title: 'Total Inbound Calls',
      value: '1,847'
    },
    {
      title: 'Total Live Conversations',
      value: '1,234'
    },
    {
      title: 'Total Voice Mail',
      value: '456'
    },
    {
      title: 'Total Abandoned Calls',
      value: '157'
    }
  ]
};

export const InboundCallsSection = ({ isDarkMode }: InboundCallsSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Inbound Calls
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {inboundData.metrics.map((metric, index) => (
          <div
            key={index}
            className={`rounded-lg p-4 shadow-lg border ${
              isDarkMode 
                ? 'bg-gray-800/90 hover:bg-gray-800 border-gray-700/50 hover:border-gray-600' 
                : 'bg-white hover:bg-gray-50 border-gray-100 hover:border-gray-200'
            } transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl`}
          >
            <h3 className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {metric.title}
            </h3>
            <p className={`text-2xl font-bold mt-2 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      <InboundCallsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};