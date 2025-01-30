import React from 'react';
import { PursueSection } from '../sections/PursueSection';
import { CallsToReviewSection } from '../sections/CallsToReviewSection';
import { MissedCallsSection } from '../sections/MissedCallsSection';
import { TeamPerformanceSection } from '../sections/TeamPerformanceSection';
import { SalesAssociateCoachingSection } from '../sections/SalesAssociateCoachingSection';
import { SalesLeaderTrendingTopicsSection } from '../sections/SalesLeaderTrendingTopicsSection';

interface SalesLeaderDashboardProps {
  isDarkMode: boolean;
  onViewAgent: (agentId: string) => void;
}

export const SalesLeaderDashboard = ({ isDarkMode, onViewAgent }: SalesLeaderDashboardProps) => {
  return (
    <div className="space-y-6">
      <TeamPerformanceSection isDarkMode={isDarkMode} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <PursueSection isDarkMode={isDarkMode} />
          <CallsToReviewSection isDarkMode={isDarkMode} />
          <SalesLeaderTrendingTopicsSection isDarkMode={isDarkMode} />
        </div>
        <div className="space-y-6">
          <SalesAssociateCoachingSection 
            isDarkMode={isDarkMode}
            onViewAgent={onViewAgent}
          />
          <MissedCallsSection isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};