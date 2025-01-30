import React from 'react';
import { X, Search, BookOpen, MessageCircle, Mail } from 'lucide-react';

interface HelpDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const HelpDrawer = ({ isOpen, onClose, isDarkMode }: HelpDrawerProps) => {
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
              Help Center
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

        <div className="p-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Search help articles..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-900'
              }`}>
                Popular Articles
              </h3>
              <ul className="space-y-3">
                {['Getting Started Guide', 'Dashboard Overview', 'Call Management'].map((article) => (
                  <li key={article}>
                    <a 
                      href="#" 
                      className={`flex items-center text-sm transition-colors ${
                        isDarkMode 
                          ? 'text-gray-300 hover:text-gray-100' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      {article}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`text-sm font-semibold mb-3 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-900'
              }`}>
                Contact Support
              </h3>
              <div className="space-y-3">
                <button className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'border border-gray-700 text-gray-300 hover:bg-gray-700' 
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  <MessageCircle className="w-5 h-5" />
                  <span>Start a Chat</span>
                </button>
                <button className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'border border-gray-700 text-gray-300 hover:bg-gray-700' 
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  <Mail className="w-5 h-5" />
                  <span>Send Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};