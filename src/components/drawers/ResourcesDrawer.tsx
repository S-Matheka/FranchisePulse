import React from 'react';
import { X, FileText, Download, ExternalLink } from 'lucide-react';

interface ResourcesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const ResourcesDrawer = ({ isOpen, onClose, isDarkMode }: ResourcesDrawerProps) => {
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
              Resources
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

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            <div>
              <h3 className={`text-sm font-semibold mb-3 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-900'
              }`}>
                Documentation
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600' 
                      : 'bg-white hover:bg-gray-50 border border-gray-200'
                  }`}>
                    <div className="flex items-center">
                      <FileText className={`w-5 h-5 mr-3 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-500'
                      }`} />
                      <div>
                        <p className={`text-sm font-medium ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                          User Guide
                        </p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          Complete system documentation
                        </p>
                      </div>
                    </div>
                    <Download className={isDarkMode ? 'text-gray-400' : 'text-gray-400'} />
                  </a>
                </li>
                <li>
                  <a href="#" className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600' 
                      : 'bg-white hover:bg-gray-50 border border-gray-200'
                  }`}>
                    <div className="flex items-center">
                      <FileText className={`w-5 h-5 mr-3 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-500'
                      }`} />
                      <div>
                        <p className={`text-sm font-medium ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                          API Documentation
                        </p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          Technical integration guide
                        </p>
                      </div>
                    </div>
                    <ExternalLink className={isDarkMode ? 'text-gray-400' : 'text-gray-400'} />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={`text-sm font-semibold mb-3 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-900'
              }`}>
                Training Materials
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600' 
                      : 'bg-white hover:bg-gray-50 border border-gray-200'
                  }`}>
                    <div className="flex items-center">
                      <FileText className={`w-5 h-5 mr-3 ${
                        isDarkMode ? 'text-green-400' : 'text-green-500'
                      }`} />
                      <div>
                        <p className={`text-sm font-medium ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                          Training Videos
                        </p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          Video tutorials and guides
                        </p>
                      </div>
                    </div>
                    <ExternalLink className={isDarkMode ? 'text-gray-400' : 'text-gray-400'} />
                  </a>
                </li>
                <li>
                  <a href="#" className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600' 
                      : 'bg-white hover:bg-gray-50 border border-gray-200'
                  }`}>
                    <div className="flex items-center">
                      <FileText className={`w-5 h-5 mr-3 ${
                        isDarkMode ? 'text-green-400' : 'text-green-500'
                      }`} />
                      <div>
                        <p className={`text-sm font-medium ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                          Best Practices
                        </p>
                        <p className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          Tips and recommendations
                        </p>
                      </div>
                    </div>
                    <Download className={isDarkMode ? 'text-gray-400' : 'text-gray-400'} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};