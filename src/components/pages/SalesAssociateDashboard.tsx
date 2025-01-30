import React from 'react';
import { YourPerformanceSection } from '../sections/YourPerformanceSection';
import { PursueForYouSection } from '../sections/PursueForYouSection';
import { YourMissedCallsSection } from '../sections/YourMissedCallsSection';
import { KudosSection } from '../sections/KudosSection';
import { FocusSection } from '../sections/FocusSection';

interface SalesAssociateDashboardProps {
  isDarkMode: boolean;
  agentId: string | null;
}

export const SalesAssociateDashboard = ({ isDarkMode, agentId }: SalesAssociateDashboardProps) => {
  return (
    <div className="space-y-6">
      <YourPerformanceSection isDarkMode={isDarkMode} agentId={agentId} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <PursueForYouSection isDarkMode={isDarkMode} />
          <KudosSection isDarkMode={isDarkMode} />
        </div>
        <div className="space-y-6">
          <YourMissedCallsSection isDarkMode={isDarkMode} />
          <FocusSection isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};