import React from 'react';
import { X, User, Settings, LogOut } from 'lucide-react';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onSignOut: () => void;
}

export const ProfileDrawer = ({ isOpen, onClose, isDarkMode, onSignOut }: ProfileDrawerProps) => {
  return (
    <div className={`
      fixed inset-y-0 right-0 w-96 transform transition-transform duration-300 ease-in-out z-50
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      ${isDarkMode 
        ? 'bg-gray-800 border-l border-gray-700' 
        : 'bg-white border-l border-gray-200'
      }
    `}>
      <div className="h-full flex flex-col">
        <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex justify-between items-center">
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Profile
            </h2>
            <button 
              onClick={onClose} 
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <User className={`w-8 h-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            <div>
              <h3 className={`text-xl font-semibold ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Simeon Matheka
              </h3>
              <span className={`inline-flex items-center px-3 py-1 mt-1 rounded-full text-sm ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-300' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                Executive Dashboard
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 px-4">
          <nav className="space-y-1">
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <User className={`w-5 h-5 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <span>Profile</span>
            </a>
            <a 
              href="#" 
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Settings className={`w-5 h-5 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <span>Plan and billing</span>
            </a>
            <button
              onClick={onSignOut}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-red-400 hover:bg-red-500/10' 
                  : 'text-red-600 hover:bg-red-50'
              }`}
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Sign out</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};