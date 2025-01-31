import React from 'react';
import { CallVolumeChart } from './charts/CallVolumeChart';
import { CallDistributionChart } from './charts/CallDistributionChart';
import { PeakHoursChart } from './charts/PeakHoursChart';
import { TrendingTopicsSection } from './sections/TrendingTopicsSection'; // Add this import

interface MainChartsProps {
  isDarkMode: boolean;
}

export const MainCharts = ({ isDarkMode }: MainChartsProps) => {
  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <div className={`${bgColor} rounded-xl shadow-sm p-6`}>
        <CallVolumeChart isDarkMode={isDarkMode} />
      </div>
      <div className={`${bgColor} rounded-xl shadow-sm p-6`}>
        <CallDistributionChart isDarkMode={isDarkMode} />
      </div>
      <div className={`${bgColor} rounded-xl shadow-sm p-6`}>
        <PeakHoursChart isDarkMode={isDarkMode} />
      </div>
      <div>
        <TrendingTopicsSection isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};