import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { SalesTeamSection } from './sections/SalesTeamSection';
import { InboundCallsSection } from './sections/InboundCallsSection';
import { PursueSection } from './sections/PursueSection';
import { CallsToReviewSection } from './sections/CallsToReviewSection';
import { MissedCallsSection } from './sections/MissedCallsSection';
import { TrendingTopicsSection } from './sections/TrendingTopicsSection';
import { HelpDrawer } from './drawers/HelpDrawer';
import { ResourcesDrawer } from './drawers/ResourcesDrawer';
import { ProfileDrawer } from './drawers/ProfileDrawer';
import { Genie } from './Genie';
import { SalesLeaderDashboard } from './pages/SalesLeaderDashboard';
import { SalesAssociateDashboard } from './pages/SalesAssociateDashboard';
import { MarketingDashboard } from './pages/MarketingDashboard';

interface DashboardProps {
  onSignOut: () => void;
}

export const Dashboard = ({ onSignOut }: DashboardProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeDrawer, setActiveDrawer] = useState<'help' | 'resources' | 'profile' | null>(null);
  const [showGenie, setShowGenie] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const handleViewAgent = (agentId: string) => {
    setSelectedAgentId(agentId);
    setActivePage('sales associate');
  };

  const renderDashboardContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <>
            <SalesTeamSection isDarkMode={isDarkMode} />
            <InboundCallsSection isDarkMode={isDarkMode} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-4 md:space-y-6">
                <PursueSection isDarkMode={isDarkMode} />
                <CallsToReviewSection isDarkMode={isDarkMode} />
              </div>
              <div className="space-y-4 md:space-y-6">
                <MissedCallsSection isDarkMode={isDarkMode} />
                <TrendingTopicsSection isDarkMode={isDarkMode} />
              </div>
            </div>
          </>
        );
      case 'sales leader':
        return <SalesLeaderDashboard isDarkMode={isDarkMode} onViewAgent={handleViewAgent} />;
      case 'sales associate':
        return <SalesAssociateDashboard isDarkMode={isDarkMode} agentId={selectedAgentId} />;
      case 'marketing':
        return <MarketingDashboard isDarkMode={isDarkMode} />;
      default:
        return (
          <div className={`text-center py-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Select a dashboard from the sidebar
          </div>
        );
    }
  };

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? 'dark-theme' : 'bg-gray-50'}`}>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          isDarkMode={isDarkMode}
          onThemeToggle={() => setIsDarkMode(!isDarkMode)}
          onRefresh={() => {}}
          showGenie={showGenie}
          setShowGenie={setShowGenie}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 pt-[73px]">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Fixed Sidebar */}
        <aside className={`
          fixed lg:sticky top-[73px] bottom-0 left-0 z-40
          w-[280px] md:w-64
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isDarkMode ? 'bg-gray-800' : 'bg-white'} 
          border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
        `}>
          <Sidebar 
            onPageChange={(page) => {
              setActivePage(page);
              setSelectedAgentId(null);
              setIsSidebarOpen(false);
            }}
            activePage={activePage}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            isDarkMode={isDarkMode}
            onDrawerOpen={setActiveDrawer}
            onSignOut={onSignOut}
          />
        </aside>

        {/* Main Content with Scrollable Area */}
        <main className="flex-1 flex flex-col min-w-0 h-[calc(100vh-73px)]">
          <div className="flex-1 overflow-y-auto">
            <div className="p-3 sm:p-4 md:p-6 max-w-[1600px] mx-auto w-full space-y-4 md:space-y-6">
              {renderDashboardContent()}
            </div>
          </div>

          {/* Fixed Footer */}
          <footer className={`py-3 sm:py-4 px-3 sm:px-4 md:px-6 border-t ${
            isDarkMode ? 'border-gray-700/50 bg-gray-800/95' : 'border-gray-200 bg-white'
          }`}>
            <div className="max-w-[1600px] mx-auto">
              <p className={`text-xs sm:text-sm text-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Powered by Creo Solutions
              </p>
            </div>
          </footer>
        </main>

        {/* Drawers */}
        <Genie 
          isOpen={showGenie} 
          onClose={() => setShowGenie(false)} 
          isDarkMode={isDarkMode}
        />

        <HelpDrawer 
          isOpen={activeDrawer === 'help'} 
          onClose={() => setActiveDrawer(null)} 
          isDarkMode={isDarkMode}
        />
        <ResourcesDrawer 
          isOpen={activeDrawer === 'resources'} 
          onClose={() => setActiveDrawer(null)} 
          isDarkMode={isDarkMode}
        />
        <ProfileDrawer 
          isOpen={activeDrawer === 'profile'} 
          onClose={() => setActiveDrawer(null)} 
          isDarkMode={isDarkMode}
          onSignOut={onSignOut}
        />
      </div>
    </div>
  );
};