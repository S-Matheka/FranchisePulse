import React from 'react';
import { Clock, Star, PhoneOutgoing, AlertTriangle } from 'lucide-react';

interface Lead {
  id: string;
  customerName: string;
  source: string;
  score: number;
  responseTime: number;
  status: 'new' | 'contacted' | 'followup' | 'converted';
  priority: 'high' | 'medium' | 'low';
}

const mockLeads: Lead[] = [
  {
    id: '1',
    customerName: 'John Smith',
    source: 'Website Form',
    score: 85,
    responseTime: 15,
    status: 'new',
    priority: 'high'
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    source: 'Phone Inquiry',
    score: 92,
    responseTime: 5,
    status: 'contacted',
    priority: 'high'
  }
];

export const LeadManagement = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-[#1f3653] mb-2">Unaddressed Leads</h3>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-[#ce1215]">12</span>
            <Clock className="w-6 h-6 text-[#ce1215]" />
          </div>
          <p className="text-sm text-[#58677f] mt-2">4 high priority</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-[#1f3653] mb-2">Avg Response Time</h3>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-[#4f8edb]">18m</span>
            <PhoneOutgoing className="w-6 h-6 text-[#4f8edb]" />
          </div>
          <p className="text-sm text-[#58677f] mt-2">Target: 15m</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-[#1f3653] mb-2">Conversion Rate</h3>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-[#cee0cf]">32%</span>
            <Star className="w-6 h-6 text-[#cee0cf]" />
          </div>
          <p className="text-sm text-green-500 mt-2">↑ 5% this week</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-[#1f3653]">Priority Leads</h3>
        </div>
        <div className="divide-y">
          {mockLeads.map((lead) => (
            <div key={lead.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-[#1f3653]">{lead.customerName}</h4>
                  <p className="text-sm text-[#58677f]">{lead.source}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  lead.priority === 'high' ? 'bg-red-100 text-red-800' :
                  lead.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1)} Priority
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-[#58677f]">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>Score: {lead.score}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Response: {lead.responseTime}m</span>
                </div>
                {lead.responseTime > 15 && (
                  <div className="flex items-center space-x-1 text-[#ce1215]">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Exceeds target time</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};