import React, { useState } from 'react';
import { Eye, Volume2 } from 'lucide-react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { FranchiseeDashboard } from './pages/FranchiseeDashboard';

interface Location {
  name: string;
  googleRating: string;
  averageCallScore: number;
  inboundCalls: number;
  missedCalls: number;
  salesCalls: number;
  serviceCalls: number;
  otherCalls: number;
}

const locations: Location[] = [
  {
    name: 'Aire Serv of North Denver',
    googleRating: '-',
    averageCallScore: 4.2,
    inboundCalls: 41,
    missedCalls: 7,
    salesCalls: 23,
    serviceCalls: 8,
    otherCalls: 3
  },
  {
    name: 'Aire Serv of the Front Range',
    googleRating: '5.0 (188)',
    averageCallScore: 4.7,
    inboundCalls: 29,
    missedCalls: 0,
    salesCalls: 25,
    serviceCalls: 4,
    otherCalls: 0
  },
  {
    name: 'Aire Serv of Fort Collins',
    googleRating: '4.7 (424)',
    averageCallScore: 4.8,
    inboundCalls: 31,
    missedCalls: 1,
    salesCalls: 18,
    serviceCalls: 11,
    otherCalls: 1
  }
];

interface DashboardProps {
  onSignOut: () => void;
}

export const Dashboard = ({ onSignOut }: DashboardProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeDrawer, setActiveDrawer] = useState<'help' | 'resources' | 'profile' | null>(null);
  const [showGenie, setShowGenie] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Update this function to also set activePage to 'franchisees' when a location is selected
  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setActivePage('franchisees'); // Set active page to franchisees when viewing location details
  };

  const renderContent = () => {
    if (selectedLocation) {
      return <FranchiseeDashboard isDarkMode={isDarkMode} location={selectedLocation} />;
    }

    return (
      <div className={`rounded-lg overflow-hidden ${
        isDarkMode ? 'bg-gray-800/90 border border-gray-700/50' : 'bg-white border border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Google Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Average Call Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Inbound Calls
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Missed Calls
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Sales Calls
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Service Calls
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Other / Unknown
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white'
            }`}>
              {locations.map((location, index) => (
                <tr key={index} className={`
                  transition-colors duration-150
                  ${isDarkMode 
                    ? 'hover:bg-gray-700/50' 
                    : 'hover:bg-gray-50'
                  }
                `}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>
                    {location.name}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {location.googleRating}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    location.averageCallScore <= 4.3 
                      ? '!text-red-500' 
                      : isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {location.averageCallScore}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {location.inboundCalls}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    location.missedCalls >= 5 
                      ? '!text-red-500' 
                      : isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {location.missedCalls}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {location.salesCalls}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {location.serviceCalls}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {location.otherCalls}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleLocationSelect(location)}
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
      </div>
    );
  };

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? 'dark-theme' : 'bg-gray-50'}`}>
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

      <div className="flex flex-1 pt-[73px]">
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

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
              setSelectedLocation(null);
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

        <main className="flex-1 flex flex-col min-w-0 h-[calc(100vh-73px)]">
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 max-w-[1600px] mx-auto w-full">
              {selectedLocation && (
                <div className="mb-4">
                  <button
                    onClick={() => {
                      setSelectedLocation(null);
                      setActivePage('dashboard'); // Reset to dashboard when going back
                    }}
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'text-blue-400 hover:bg-blue-500/10'
                        : 'text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    ← Back to Locations
                  </button>
                </div>
              )}
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};