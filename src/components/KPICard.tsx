import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  trend: number;
  icon: React.ReactNode;
  onClick: () => void;
  isDarkMode: boolean;
}

export const KPICard = ({ title, value, trend, icon, onClick, isDarkMode }: KPICardProps) => {
  const isPositive = trend >= 0;
  
  return (
    <button 
      onClick={onClick}
      className={`w-full rounded-xl p-6 transition-all duration-300 cursor-pointer
        ${isDarkMode 
          ? 'bg-gray-800 hover:bg-gray-700' 
          : 'bg-white hover:bg-gray-50'
        }
        group`}
    >
      <div className="flex items-start justify-between">
        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="text-sm font-medium">{Math.abs(trend)}%</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {title}
        </h3>
        <p className={`text-2xl font-bold mt-1 group-hover:scale-105 transition-transform
          ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
        >
          {value}
        </p>
      </div>
    </button>
  );
};