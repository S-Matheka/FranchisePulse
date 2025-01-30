import React from 'react';
import { TrendingUp, TrendingDown, Clock, Users, PhoneOutgoing } from 'lucide-react';

const leadMetrics = {
  unaddressedLeads: {
    total: 12,
    highPriority: 4,
    trend: -15,
    details: [
      { customer: 'John Smith', source: 'Website', score: 85, waiting: '2h' },
      { customer: 'Sarah Johnson', source: 'Phone', score: 92, waiting: '1h' },
      { customer: 'Mike Brown', source: 'Email', score: 78, waiting: '3h' }
    ]
  },
  responseTime: {
    average: '18m',
    target: '15m',
    trend: 5,
    breakdown: {
      under15min: '65%',
      under30min: '85%',
      over30min: '15%'
    }
  },
  conversionRate: {
    current: '32%',
    previousPeriod: '27%',
    trend: 5,
    bySource: {
      website: '35%',
      phone: '40%',
      email: '25%'
    }
  }
};

export const LeadManagementDetails = () => {
  return (
    <div className="space-y-6">
      {/* Unaddressed Leads Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-[#1f3653] mb-4">Unaddressed Leads</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-[#58677f]">Total Pending</p>
            <p className="text-2xl font-bold text-[#ce1215]">{leadMetrics.unaddressedLeads.total}</p>
            <div className="flex items-center mt-1">
              <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">{leadMetrics.unaddressedLeads.trend}% vs last week</span>
            </div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-[#58677f]">High Priority</p>
            <p className="text-2xl font-bold text-[#e0a731]">{leadMetrics.unaddressedLeads.highPriority}</p>
            <p className="text-sm text-[#58677f] mt-1">Needs immediate attention</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {leadMetrics.unaddressedLeads.details.map((lead, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-[#1f3653]">{lead.customer}</p>
                <p className="text-sm text-[#58677f]">{lead.source}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-[#4f8edb]">Score: {lead.score}</p>
                <p className="text-sm text-[#ce1215]">Waiting: {lead.waiting}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Response Time Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-[#1f3653] mb-4">Response Time Analysis</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-[#58677f]">Average Response</p>
            <p className="text-2xl font-bold text-[#4f8edb]">{leadMetrics.responseTime.average}</p>
            <div className="flex items-center mt-1">
              <Clock className="w-4 h-4 text-[#58677f] mr-1" />
              <span className="text-sm text-[#58677f]">Target: {leadMetrics.responseTime.target}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-[#58677f]">Under 15min</span>
              <span className="text-sm font-medium text-[#1f3653]">{leadMetrics.responseTime.breakdown.under15min}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#58677f]">Under 30min</span>
              <span className="text-sm font-medium text-[#1f3653]">{leadMetrics.responseTime.breakdown.under30min}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#58677f]">Over 30min</span>
              <span className="text-sm font-medium text-[#ce1215]">{leadMetrics.responseTime.breakdown.over30min}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Rate Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-[#1f3653] mb-4">Conversion Rate Details</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-[#58677f]">Current Rate</p>
            <p className="text-2xl font-bold text-green-600">{leadMetrics.conversionRate.current}</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">+{leadMetrics.conversionRate.trend}% vs last period</span>
            </div>
          </div>
          <div className="col-span-2">
            <h3 className="text-sm font-medium text-[#58677f] mb-2">Conversion by Source</h3>
            <div className="space-y-2">
              {Object.entries(leadMetrics.conversionRate.bySource).map(([source, rate]) => (
                <div key={source} className="flex items-center justify-between">
                  <span className="text-sm text-[#58677f] capitalize">{source}</span>
                  <span className="text-sm font-medium text-[#1f3653]">{rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};