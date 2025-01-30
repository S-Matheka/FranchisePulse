import React from 'react';
import { Clock, AlertTriangle, TrendingDown } from 'lucide-react';

const data = {
  total: 12,
  highPriority: 4,
  trend: -15,
  leads: [
    { name: 'John Smith', source: 'Website', score: 85, waitTime: '2h', priority: 'high' },
    { name: 'Sarah Johnson', source: 'Phone', score: 92, waitTime: '1h', priority: 'high' },
    { name: 'Mike Brown', source: 'Email', score: 78, waitTime: '3h', priority: 'medium' },
    { name: 'Emma Wilson', source: 'Website', score: 88, waitTime: '30m', priority: 'high' }
  ]
};

export const UnaddressedLeadsDetail = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">Total Unaddressed</h3>
          <p className="text-2xl font-bold text-[#ce1215]">{data.total}</p>
          <div className="flex items-center mt-1 text-green-500">
            <TrendingDown className="w-4 h-4 mr-1" />
            <span className="text-sm">{Math.abs(data.trend)}% vs last week</span>
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-[#58677f] mb-1">High Priority</h3>
          <p className="text-2xl font-bold text-[#e0a731]">{data.highPriority}</p>
          <p className="text-sm text-[#58677f] mt-1">Needs immediate attention</p>
        </div>
      </div>

      <div className="bg-white rounded-lg">
        <div className="p-4 border-b">
          <h3 className="font-medium text-[#1f3653]">Pending Leads</h3>
        </div>
        <div className="divide-y">
          {data.leads.map((lead, index) => (
            <div key={index} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-[#1f3653]">{lead.name}</h4>
                  <p className="text-sm text-[#58677f]">Via {lead.source}</p>
                </div>
                <div className={`px-2 py-1 rounded text-sm ${
                  lead.priority === 'high' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {lead.priority.charAt(0).toUpperCase() + lead.priority.slice(1)} Priority
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-[#58677f]">
                <div className="flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1 text-[#e0a731]" />
                  <span>Score: {lead.score}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-[#ce1215]" />
                  <span>Waiting: {lead.waitTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};