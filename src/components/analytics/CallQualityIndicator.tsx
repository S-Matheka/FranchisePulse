import React from 'react';
import { PhoneCall, AlertCircle, CheckCircle } from 'lucide-react';

interface Call {
  id: string;
  duration: number;
  hasConversation: boolean;
  vehicleDiscussed: string | null;
  appointmentType: 'firm' | 'soft' | null;
  needsFollowUp: boolean;
  followUpPriority: 'high' | 'medium' | 'low';
}

interface CallQualityIndicatorProps {
  call: Call;
}

export const CallQualityIndicator = ({ call }: CallQualityIndicatorProps) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
      <div className={`flex items-center space-x-2 ${
        call.hasConversation ? 'text-green-600' : 'text-red-500'
      }`}>
        <PhoneCall className="w-5 h-5" />
        <span className="text-sm font-medium">
          {call.hasConversation ? 'Real Conversation' : 'No Conversation'}
        </span>
      </div>

      {call.vehicleDiscussed && (
        <div className="flex items-center space-x-2 text-blue-600">
          <span className="text-sm font-medium">
            Vehicle: {call.vehicleDiscussed}
          </span>
        </div>
      )}

      {call.appointmentType && (
        <div className={`flex items-center space-x-2 ${
          call.appointmentType === 'firm' ? 'text-green-600' : 'text-yellow-500'
        }`}>
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium capitalize">
            {call.appointmentType} Appointment
          </span>
        </div>
      )}

      {call.needsFollowUp && (
        <div className={`flex items-center space-x-2 ${
          call.followUpPriority === 'high' ? 'text-red-500' : 
          call.followUpPriority === 'medium' ? 'text-yellow-500' : 'text-blue-500'
        }`}>
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-medium">
            {call.followUpPriority.charAt(0).toUpperCase() + call.followUpPriority.slice(1)} Priority Follow-up
          </span>
        </div>
      )}
    </div>
  );
};