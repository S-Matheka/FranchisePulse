import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface InboundCallsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

const data = [
  { name: 'Total Inbound', value: 1847, color: '#2563EB' },
  { name: 'Live Calls', value: 1234, color: '#059669' },
  { name: 'Voice Mail', value: 456, color: '#D97706' },
  { name: 'Abandoned', value: 157, color: '#DC2626' }
];

const departmentData = [
  {
    department: 'Front Desk',
    inboundCalls: 625,
    liveCalls: 418,
    voiceMail: 154,
    abandoned: 53
  },
  {
    department: 'Service Desk',
    inboundCalls: 582,
    liveCalls: 389,
    voiceMail: 143,
    abandoned: 50
  },
  {
    department: 'Financing',
    inboundCalls: 428,
    liveCalls: 285,
    voiceMail: 105,
    abandoned: 38
  },
  {
    department: 'Agent 1',
    inboundCalls: 212,
    liveCalls: 142,
    voiceMail: 54,
    abandoned: 16
  }
].sort((a, b) => b.inboundCalls - a.inboundCalls);

const dateOptions = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 Days', value: 'last7days' },
  { label: 'Last 30 Days', value: 'last30days' }
];

export const InboundCallsModal = ({ isOpen, onClose, isDarkMode = false }: InboundCallsModalProps) => {
  const [selectedDate, setSelectedDate] = useState('yesterday');

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`w-full max-w-6xl rounded-xl shadow-xl transform transition-all ${
          isDarkMode 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white'
        }`}>
          <div className={`flex justify-between items-center p-4 border-b ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <Dialog.Title className={`text-xl font-semibold ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Inbound Calls Analysis
            </Dialog.Title>
            <div className="flex items-center space-x-3">
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={`min-w-[140px] px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors appearance-none ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' 
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {dateOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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

          <div className="p-6 space-y-8">
            <div>
              <h3 className={`text-lg font-medium mb-4 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>
                Call Distribution
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={isDarkMode ? '#374151' : '#E5E7EB'} 
                    />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: isDarkMode ? '#9CA3AF' : '#374151', fontSize: 12 }}
                      axisLine={{ stroke: isDarkMode ? '#4B5563' : '#374151' }}
                      tickLine={{ stroke: isDarkMode ? '#4B5563' : '#374151' }}
                    />
                    <YAxis 
                      tick={{ fill: isDarkMode ? '#9CA3AF' : '#374151', fontSize: 12 }}
                      axisLine={{ stroke: isDarkMode ? '#4B5563' : '#374151' }}
                      tickLine={{ stroke: isDarkMode ? '#4B5563' : '#374151' }}
                      domain={[0, 'dataMax + 100']}
                      tickCount={6}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1F2937' : 'white',
                        borderRadius: '8px',
                        border: isDarkMode ? '1px solid #374151' : '1px solid #E5E7EB',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        color: isDarkMode ? '#E5E7EB' : '#374151'
                      }}
                      cursor={{ fill: isDarkMode ? 'rgba(55, 65, 81, 0.4)' : 'rgba(229, 231, 235, 0.4)' }}
                      labelStyle={{ color: isDarkMode ? '#E5E7EB' : '#374151', fontWeight: 'bold' }}
                      itemStyle={{ color: isDarkMode ? '#E5E7EB' : '#374151' }}
                    />
                    <Bar 
                      dataKey="value" 
                      radius={[4, 4, 0, 0]}
                    >
                      {data.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                          fillOpacity={isDarkMode ? 0.8 : 1}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className={`text-lg font-medium mb-4 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>
                Department Breakdown
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
                    <tr>
                      {['Department', 'Inbound Calls', 'Live Calls', 'Voice Mail', 'Abandoned'].map((header) => (
                        <th 
                          key={header}
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${
                    isDarkMode ? 'divide-gray-700' : 'divide-gray-200'
                  }`}>
                    {departmentData.map((dept, index) => (
                      <tr key={index} className={
                        isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                      }>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                          {dept.department}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {dept.inboundCalls}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {dept.liveCalls}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {dept.voiceMail}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {dept.abandoned}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};