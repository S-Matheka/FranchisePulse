import React from 'react';
import { ActivityBySourceSection } from '../sections/marketing/ActivityBySourceSection';
import { MarketingCallsToReviewSection } from '../sections/marketing/MarketingCallsToReviewSection';
import { MarketingTrendingTopicsSection } from '../sections/marketing/MarketingTrendingTopicsSection';

interface MarketingDashboardProps {
  isDarkMode: boolean;
}

export const MarketingDashboard = ({ isDarkMode }: MarketingDashboardProps) => {
  return (
    <div className="space-y-6">
      <ActivityBySourceSection isDarkMode={isDarkMode} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <MarketingCallsToReviewSection isDarkMode={isDarkMode} />
        </div>
        <div className="space-y-6">
          <MarketingTrendingTopicsSection isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};