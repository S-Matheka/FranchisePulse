import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SalesTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

const chartData = [
  { time: '6AM', callVolume: 220, liveConversations: 150, vehicleConversations: 65, appointments: 18, appointmentRequests: 48 },
  { time: '8AM', callVolume: 380, liveConversations: 260, vehicleConversations: 110, appointments: 32, appointmentRequests: 85 },
  { time: '10AM', callVolume: 520, liveConversations: 380, vehicleConversations: 165, appointments: 45, appointmentRequests: 120 },
  { time: '12PM', callVolume: 480, liveConversations: 350, vehicleConversations: 155, appointments: 42, appointmentRequests: 110 },
  { time: '2PM', callVolume: 620, liveConversations: 450, vehicleConversations: 190, appointments: 52, appointmentRequests: 140 },
  { time: '4PM', callVolume: 425, liveConversations: 310, vehicleConversations: 135, appointments: 35, appointmentRequests: 95 },
  { time: '6PM', callVolume: 202, liveConversations: 145, vehicleConversations: 60, appointments: 15, appointmentRequests: 48 }
];

const salesData = [
  {
    agent: "Sarah Wilson",
    callVolume: 1228,
    liveConversations: 856,
    vehicleConversations: 298,
    appointments: "76/98",
    appointmentRequests: 212
  },
  {
    agent: "Tom Davis",
    callVolume: 954,
    liveConversations: 557,
    vehicleConversations: 328,
    appointments: "57/167",
    appointmentRequests: 244
  },
  {
    agent: "John Smith",
    callVolume: 523,
    liveConversations: 412,
    vehicleConversations: 187,
    appointments: "89/102",
    appointmentRequests: 156
  },
  {
    agent: "Mike Johnson",
    callVolume: 142,
    liveConversations: 98,
    vehicleConversations: 43,
    appointments: "12/45",
    appointmentRequests: 34
  }
].sort((a, b) => b.callVolume - a.callVolume);

const dateOptions = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 Days', value: 'last7days' },
  { label: 'Last 30 Days', value: 'last30days' }
];

export const SalesTeamModal = ({ isOpen, onClose, isDarkMode = false }: SalesTeamModalProps) => {
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
              Sales Team Performance
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
                Performance Trends
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={isDarkMode ? '#374151' : '#E5E7EB'} 
                    />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fill: isDarkMode ? '#9CA3AF' : '#374151', fontSize: 12 }}
                      axisLine={{ stroke: isDarkMode ? '#4B5563' : '#374151' }}
                      tickLine={{ stroke: isDarkMode ? '#4B5563' : '#374151' }}
                    />
                    <YAxis 
                      tick={{ fill: isDarkMode ? '#9CA3AF' : '#374151', fontSize: 12 }}
                      axisLine={{ stroke: isDarkMode ? '#4B5563' : '#374151' }}
                      tickLine={{ stroke: isDarkMode ? '#4B5563' : '#374151' }}
                      domain={[0, 'auto']}
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
                      labelStyle={{ color: isDarkMode ? '#E5E7EB' : '#374151', fontWeight: 'bold' }}
                      itemStyle={{ color: isDarkMode ? '#E5E7EB' : '#374151' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="callVolume" 
                      stroke="#2563EB" 
                      strokeWidth={2}
                      dot={{ fill: '#2563EB', strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                      name="Call Volume"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="liveConversations" 
                      stroke="#059669" 
                      strokeWidth={2}
                      dot={{ fill: '#059669', strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                      name="Live Conversations"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="vehicleConversations" 
                      stroke="#D97706" 
                      strokeWidth={2}
                      dot={{ fill: '#D97706', strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                      name="Vehicle Conversations"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="appointments" 
                      stroke="#7C3AED" 
                      strokeWidth={2}
                      dot={{ fill: '#7C3AED', strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                      name="Appointments"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="appointmentRequests" 
                      stroke="#EC4899" 
                      strokeWidth={2}
                      dot={{ fill: '#EC4899', strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                      name="Appointment Requests"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className={`text-lg font-medium mb-4 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>
                Agent Performance
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
                    <tr>
                      {[
                        'Agent',
                        'Call Volume',
                        'Live Conversations',
                        'Vehicle Conversations',
                        'Firm/Soft Appointments',
                        'Appointment Requests'
                      ].map((header) => (
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
                    {salesData.map((agent, index) => (
                      <tr key={index} className={
                        isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                      }>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                          {agent.agent}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {agent.callVolume}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {agent.liveConversations}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {agent.vehicleConversations}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {agent.appointments}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {agent.appointmentRequests}
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