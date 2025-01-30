import React from 'react';
import { LayoutDashboard, BookOpen, Settings, HelpCircle, FileText, UserCircle, LineChart, LogOut } from 'lucide-react';

interface SidebarProps {
  onPageChange: (page: string) => void;
  activePage: string;
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onDrawerOpen: (drawer: 'help' | 'resources' | 'profile') => void;
  onSignOut: () => void;
}

export const Sidebar = ({ 
  onPageChange, 
  activePage, 
  isOpen, 
  onClose, 
  isDarkMode, 
  onDrawerOpen,
  onSignOut 
}: SidebarProps) => {
  const menuItems = [
    { 
      icon: <LayoutDashboard />, 
      label: 'dashboard', 
      title: 'Dashboard', 
      type: 'page',
      isPrimary: true 
    },
    { 
      icon: <LineChart />, 
      label: 'sales leader', 
      title: 'Sales Leader', 
      type: 'page' 
    },
    { 
      icon: <LineChart />, 
      label: 'sales associate', 
      title: 'Sales Associate', 
      type: 'page' 
    },
    { 
      icon: <LineChart />, 
      label: 'marketing', 
      title: 'Marketing', 
      type: 'page' 
    },
    { 
      icon: <BookOpen />, 
      label: 'reports', 
      title: 'Reports', 
      type: 'page' 
    },
    { 
      icon: <Settings />, 
      label: 'settings', 
      title: 'Settings', 
      type: 'page' 
    }
  ];

  const secondaryItems = [
    { 
      icon: <HelpCircle />, 
      label: 'help center', 
      drawer: 'help' as const, 
      title: 'Help Center', 
      type: 'drawer' 
    },
    { 
      icon: <FileText />, 
      label: 'resources', 
      drawer: 'resources' as const, 
      title: 'Resources', 
      type: 'drawer' 
    },
    { 
      icon: <UserCircle />, 
      label: 'profile', 
      drawer: 'profile' as const, 
      title: 'Profile', 
      type: 'drawer' 
    }
  ];

  return (
    <div className={`
      flex flex-col h-full
      ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
      ${isOpen ? 'shadow-xl lg:shadow-none' : ''}
    `}>
      {/* Primary Navigation */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <nav className="p-3 sm:p-4">
          {/* Dashboard - Always Visible */}
          <div className="mb-2">
            <button
              onClick={() => {
                onPageChange('dashboard');
                onClose();
              }}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                ${activePage === 'dashboard'
                  ? 'bg-blue-500 text-white'
                  : isDarkMode
                    ? 'text-gray-200 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }
                transition-colors duration-200
              `}
            >
              <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">Dashboard</span>
            </button>
          </div>

          {/* Divider */}
          <div className={`h-px my-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />

          {/* Main Menu Items */}
          <div className="space-y-1">
            {menuItems.filter(item => !item.isPrimary).map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.type === 'drawer' && item.drawer) {
                    onDrawerOpen(item.drawer);
                  } else {
                    onPageChange(item.label);
                    onClose();
                  }
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                  ${activePage === item.label 
                    ? 'bg-blue-500 text-white' 
                    : isDarkMode 
                      ? 'text-gray-200 hover:bg-gray-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                  transition-colors duration-200
                `}
              >
                {React.cloneElement(item.icon, { className: 'w-5 h-5 flex-shrink-0' })}
                <span className="font-medium">{item.title}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Secondary Navigation */}
      <div className={`p-3 sm:p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="space-y-1">
          {secondaryItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.drawer) {
                  onDrawerOpen(item.drawer);
                  onClose();
                }
              }}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                ${isDarkMode 
                  ? 'text-gray-200 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
                transition-colors duration-200
              `}
            >
              {React.cloneElement(item.icon, { className: 'w-5 h-5 flex-shrink-0' })}
              <span className="font-medium">{item.title}</span>
            </button>
          ))}

          {/* Sign Out Button */}
          <button
            onClick={onSignOut}
            className={`
              w-full flex items-center space-x-3 px-4 py-3 rounded-lg mt-2
              ${isDarkMode 
                ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' 
                : 'bg-red-50 text-red-600 hover:bg-red-100'
              }
              transition-colors duration-200
            `}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
};