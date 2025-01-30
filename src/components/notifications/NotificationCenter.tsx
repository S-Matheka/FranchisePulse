import React from 'react';
import { Bell, MessageSquare, Calendar, AlertCircle, X, TrendingUp, Clock } from 'lucide-react';

interface NotificationCenterProps {
  isDarkMode: boolean;
}

interface Notification {
  id: string;
  type: 'message' | 'appointment' | 'alert' | 'performance';
  title: string;
  description: string;
  time: string;
  read: boolean;
  priority?: 'high' | 'medium' | 'low';
  metric?: {
    value: string;
    trend: number;
  };
}

// Real-time dashboard notifications
const notifications: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'High Priority Lead',
    description: 'New website inquiry requires immediate attention - 2024 Honda Civic',
    time: 'Just now',
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'performance',
    title: 'Call Volume Spike',
    description: 'Current call volume is 25% above average',
    time: '2m ago',
    read: false,
    metric: {
      value: '156',
      trend: 25
    }
  },
  {
    id: '3',
    type: 'appointment',
    title: 'Upcoming Test Drive',
    description: 'Sarah Johnson - 2024 Honda Civic at 2:30 PM',
    time: '5m ago',
    read: false
  },
  {
    id: '4',
    type: 'message',
    title: 'New Lead Response',
    description: 'John Smith replied to your follow-up email',
    time: '10m ago',
    read: false
  },
  {
    id: '5',
    type: 'alert',
    title: 'Missed Call Follow-up',
    description: '3 high-priority missed calls need attention',
    time: '15m ago',
    read: true,
    priority: 'medium'
  }
];

const getIcon = (type: Notification['type'], isDarkMode: boolean) => {
  const iconClasses = {
    message: isDarkMode ? 'text-blue-400' : 'text-blue-500',
    appointment: isDarkMode ? 'text-green-400' : 'text-green-500',
    alert: isDarkMode ? 'text-red-400' : 'text-red-500',
    performance: isDarkMode ? 'text-purple-400' : 'text-purple-500'
  };

  switch (type) {
    case 'message':
      return <MessageSquare className={`w-5 h-5 ${iconClasses.message}`} />;
    case 'appointment':
      return <Calendar className={`w-5 h-5 ${iconClasses.appointment}`} />;
    case 'alert':
      return <AlertCircle className={`w-5 h-5 ${iconClasses.alert}`} />;
    case 'performance':
      return <TrendingUp className={`w-5 h-5 ${iconClasses.performance}`} />;
  }
};

export const NotificationCenter = ({ isDarkMode }: NotificationCenterProps) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`w-96 rounded-xl shadow-xl border transform transition-all ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
            <div>
              <h3 className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Notifications
              </h3>
              {unreadCount > 0 && (
                <p className="text-xs text-blue-500">
                  {unreadCount} new notifications
                </p>
              )}
            </div>
          </div>
          <button className={`text-sm font-medium transition-colors ${
            isDarkMode 
              ? 'text-blue-400 hover:text-blue-300' 
              : 'text-blue-600 hover:text-blue-700'
          }`}>
            Mark all as read
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[400px] overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 transition-colors ${
              !notification.read 
                ? isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50/50'
                : isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                {getIcon(notification.type, isDarkMode)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <p className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    {notification.title}
                  </p>
                  <span className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {notification.time}
                  </span>
                </div>
                <p className={`text-sm line-clamp-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {notification.description}
                </p>
                {notification.metric && (
                  <div className="mt-1 flex items-center space-x-2">
                    <span className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {notification.metric.value}
                    </span>
                    <span className={`text-xs ${
                      notification.metric.trend > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {notification.metric.trend > 0 ? '↑' : '↓'} {Math.abs(notification.metric.trend)}%
                    </span>
                  </div>
                )}
                {notification.priority && (
                  <span className={`inline-flex items-center px-2 py-0.5 mt-1 rounded text-xs font-medium ${
                    notification.priority === 'high'
                      ? isDarkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-800'
                      : notification.priority === 'medium'
                        ? isDarkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
                        : isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)} Priority
                  </span>
                )}
              </div>
              <button className={`flex-shrink-0 p-1 rounded-full transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-gray-100 text-gray-400'
              }`}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <button className={`w-full px-4 py-2 text-sm text-center transition-colors ${
          isDarkMode 
            ? 'text-blue-400 hover:text-blue-300' 
            : 'text-blue-600 hover:text-blue-700'
        }`}>
          View all notifications
        </button>
      </div>
    </div>
  );
};