import React from 'react';
import { Target, AlertCircle, Clock, PhoneCall } from 'lucide-react';

interface FocusSectionProps {
  isDarkMode: boolean;
}

export const FocusSection = ({ isDarkMode }: FocusSectionProps) => {
  const focusAreas = [
    {
      icon: <Target className="w-5 h-5 text-blue-500" />,
      title: "Increase Firm Appointments",
      description: "Current: 32% | Target: 40%",
      steps: [
        "Focus on value proposition during vehicle discussions",
        "Use the new financing promotion as a closing tool",
        "Follow up within 2 hours of initial contact"
      ]
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      title: "Improve Call Compliance",
      description: "Mystery Shopper Score: 85% | Target: 95%",
      steps: [
        "Always verify customer information",
        "Document all customer preferences",
        "Complete the full needs analysis"
      ]
    },
    {
      icon: <Clock className="w-5 h-5 text-yellow-500" />,
      title: "Reduce Response Time",
      description: "Current Avg: 18min | Target: 15min",
      steps: [
        "Enable desktop notifications",
        "Use quick response templates",
        "Prioritize high-intent leads"
      ]
    },
    {
      icon: <PhoneCall className="w-5 h-5 text-green-500" />,
      title: "Increase Call Quality",
      description: "Current Score: 8.5/10 | Target: 9/10",
      steps: [
        "Use active listening techniques",
        "Follow the updated call script",
        "Ask more discovery questions"
      ]
    }
  ];

  return (
    <div className={`rounded-lg overflow-hidden ${
      isDarkMode ? 'bg-gray-800/90 border border-gray-700/50' : 'bg-white border border-gray-200'
    }`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Today's Focus Areas
        </h2>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Here are specific things to focus on today
        </p>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {focusAreas.map((area, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-700/50 hover:bg-gray-700/70' 
                : 'bg-gray-50 hover:bg-gray-100'
            } transition-colors duration-200`}
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-gray-600' : 'bg-white'
              }`}>
                {area.icon}
              </div>
              <div>
                <h3 className={`font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  {area.title}
                </h3>
                <p className={`text-sm mt-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {area.description}
                </p>
              </div>
            </div>
            <ul className={`space-y-2 ml-11 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {area.steps.map((step, stepIndex) => (
                <li key={stepIndex} className="text-sm list-disc">
                  {step}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};