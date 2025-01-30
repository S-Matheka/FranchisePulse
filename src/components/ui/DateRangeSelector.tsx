import React from 'react';
import { Calendar } from 'lucide-react';

const dateRanges = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 Days', value: 'last7days' },
  { label: 'Last 30 Days', value: 'last30days' }
];

interface DateRangeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const DateRangeSelector = ({ value, onChange }: DateRangeSelectorProps) => {
  return (
    <div className="flex items-center space-x-2 bg-white border rounded-lg shadow-sm">
      <div className="pl-3">
        <Calendar className="w-5 h-5 text-gray-500" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="py-2 pl-2 pr-8 text-sm text-gray-900 bg-transparent border-none focus:ring-0 focus:outline-none"
      >
        {dateRanges.map((range) => (
          <option key={range.value} value={range.value}>
            {range.label}
          </option>
        ))}
      </select>
    </div>
  );
};