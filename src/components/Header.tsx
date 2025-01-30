import React from 'react';
import { Bell, Menu, Sun, Moon, RefreshCw, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { LocationSelector } from './selectors/LocationSelector';
import { DateRangeSelector } from './selectors/DateRangeSelector';
import { NotificationCenter } from './notifications/NotificationCenter';

interface HeaderProps {
  onMenuClick: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  onRefresh: () => void;
  showGenie: boolean;
  setShowGenie: (show: boolean) => void;
}

export const Header = ({ 
  onMenuClick, 
  isDarkMode, 
  onThemeToggle, 
  onRefresh,
  showGenie,
  setShowGenie 
}: HeaderProps) => {
  const [showNotifications, setShowNotifications] = React.useState(false);

  return (
    <header className={`${isDarkMode ? 'bg-gray-800/95 backdrop-blur-sm' : 'bg-white'} shadow-sm px-3 sm:px-4 md:px-6 py-3 sm:py-4 relative z-50`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button 
            className={`lg:hidden p-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`} 
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <Logo isDarkMode={isDarkMode} />
          <div className="hidden md:flex items-center space-x-4">
            <LocationSelector isDarkMode={isDarkMode} />
            <DateRangeSelector isDarkMode={isDarkMode} />
          </div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
          <button 
            onClick={() => setShowGenie(!showGenie)}
            className={`
              flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 md:px-4 py-2 rounded-lg transition-all duration-300
              ${isDarkMode 
                ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30' 
                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
              }
              transform hover:scale-105
            `}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline text-sm font-medium">Ask Genie</span>
          </button>
          <button 
            onClick={onThemeToggle}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-200' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {isDarkMode ? (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
          <button 
            onClick={onRefresh}
            className={`hidden sm:block p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-200' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div className="relative">
            <button 
              className={`relative p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 transform -translate-x-1/2 sm:translate-x-0">
                <NotificationCenter isDarkMode={isDarkMode} />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};