import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { UnaddressedLeadsDetail } from '../kpi-details/UnaddressedLeadsDetail';
import { ResponseTimeDetail } from '../kpi-details/ResponseTimeDetail';
import { ConversionRateDetail } from '../kpi-details/ConversionRateDetail';
import { TotalCallVolumeDetail } from '../kpi-details/TotalCallVolumeDetail';
import { SentimentScoreDetail } from '../kpi-details/SentimentScoreDetail';
import { MissedCallRateDetail } from '../kpi-details/MissedCallRateDetail';

interface KPIDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isDarkMode: boolean;
}

export const KPIDetailModal = ({ isOpen, onClose, title, isDarkMode }: KPIDetailModalProps) => {
  const renderContent = () => {
    switch (title) {
      case 'Total Call Volume':
        return <TotalCallVolumeDetail isDarkMode={isDarkMode} />;
      case 'Missed Call Rate':
        return <MissedCallRateDetail isDarkMode={isDarkMode} />;
      case 'Avg Call Duration':
        return <ResponseTimeDetail isDarkMode={isDarkMode} />;
      case 'Resolution Rate':
        return <ConversionRateDetail isDarkMode={isDarkMode} />;
      case 'Sentiment Score':
        return <SentimentScoreDetail isDarkMode={isDarkMode} />;
      default:
        return null;
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`w-full max-w-4xl rounded-xl shadow-xl p-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className={`text-xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {title} Details
            </Dialog.Title>
            <button 
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {renderContent()}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};