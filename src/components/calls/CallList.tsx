import React from 'react';
import { Phone, Clock, User } from 'lucide-react';

interface Call {
  id: string;
  customerName: string;
  customerNumber: string;
  timestamp: string;
  duration: number;
  status: string;
  agent: string;
  summary: string;
  hasConversation: boolean;
  vehicleDiscussed: string | null;
  appointmentType: 'firm' | 'soft' | null;
  needsFollowUp: boolean;
  followUpPriority: 'high' | 'medium' | 'low';
}

interface CallListProps {
  calls: Call[];
  onSelectCall: (call: Call) => void;
}

export const CallList = ({ calls, onSelectCall }: CallListProps) => {
  // Format duration from seconds to mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {calls.map((call) => (
        <div
          key={call.id}
          onClick={() => onSelectCall(call)}
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium text-[#1f3653]">{call.customerName}</h3>
              <p className="text-sm text-[#58677f]">{call.customerNumber}</p>
            </div>
            <span className="text-sm text-[#58677f]">{call.timestamp}</span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-[#58677f]">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatDuration(call.duration)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{call.agent}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>{call.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};