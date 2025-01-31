import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Play, Pause, Volume2, FileText } from 'lucide-react';

const dummyTranscript = {
  'sam-smith': [
    { time: '0:00', speaker: 'Agent', text: 'Thank you for calling Aire Serv, this is Mike speaking. How may I assist you today?' },
    { time: '0:05', speaker: 'Customer', text: "Hi, I've been trying to schedule a service appointment for my heater and your online system keeps giving me errors." },
    { time: '0:12', speaker: 'Agent', text: 'I apologize for the inconvenience. I can help you schedule that appointment right now.' },
    { time: '0:18', speaker: 'Customer', text: 'This is really frustrating. I\'ve tried multiple times and keep getting error messages.' },
    { time: '0:25', speaker: 'Agent', text: 'I understand your frustration. Let me take care of this for you right away. What type of heating system do you have?' },
    { time: '0:32', speaker: 'Customer', text: 'I need a furnace tune-up, but honestly, this scheduling process needs to be fixed.' },
    { time: '0:38', speaker: 'Agent', text: "You're absolutely right, and I'll make sure to report this issue. Let me find a convenient time for your furnace tune-up." }
  ],
  'mary-berry': [
    { time: '0:00', speaker: 'Agent', text: 'Thank you for calling Aire Serv, this is Sarah speaking. How may I assist you today?' },
    { time: '0:05', speaker: 'Customer', text: "Hi, I have several questions about my new HVAC system that weren't answered during installation." },
    { time: '0:12', speaker: 'Agent', text: "I'll try my best to help. What questions do you have about your system?" },
    { time: '0:18', speaker: 'Customer', text: "Well, first the smart thermostat - I can't figure out how to adjust its settings." },
    { time: '0:25', speaker: 'Agent', text: "Let me check that for you... I'm actually not seeing that information readily available." },
    { time: '0:32', speaker: 'Customer', text: 'And what about the air purification system? My allergies still seem bad.' },
    { time: '0:38', speaker: 'Agent', text: "I'll need to check with our technical team about that. Is there anything else?" },
    { time: '0:45', speaker: 'Customer', text: "Yes, the zoning system - I can't get it to work properly." },
    { time: '0:52', speaker: 'Agent', text: "I'll need to look into these questions and get back to you. Can I have your contact information?" }
  ],
  'caller-2': [
    { time: '0:00', speaker: 'Agent', text: 'Thank you for calling Aire Serv, this is David speaking. How may I assist you today?' },
    { time: '0:05', speaker: 'Customer', text: 'Hi David, I just had my AC serviced at your company and I wanted to share my experience.' },
    { time: '0:12', speaker: 'Agent', text: 'We always appreciate feedback. How was your service experience?' },
    { time: '0:18', speaker: 'Customer', text: 'It was absolutely exceptional! Your service team went above and beyond.' },
    { time: '0:25', speaker: 'Agent', text: 'That\'s wonderful to hear! What impressed you the most?' },
    { time: '0:32', speaker: 'Customer', text: 'The thoroughness of the service, the clear explanations, and how the team took extra time to show me maintenance tips.' },
    { time: '0:40', speaker: 'Agent', text: 'We\'re so glad you had such a positive experience. Our service team takes great pride in their work.' },
    { time: '0:47', speaker: 'Customer', text: "It's the best HVAC service experience I've ever had." }
  ],
  'marketing': [
    { time: '0:00', speaker: 'Agent', text: 'Thank you for calling Aire Serv, this is Jennifer speaking. How may I assist you today?' },
    { time: '0:05', speaker: 'Customer', text: "Hi Jennifer, I've been coming to your company for 15 years now, and I wanted to share something." },
    { time: '0:12', speaker: 'Agent', text: 'We always love hearing from our long-time customers. What would you like to share?' },
    { time: '0:20', speaker: 'Customer', text: 'Your service quality has been consistently excellent all these years. It\'s why I keep coming back.' },
    { time: '0:28', speaker: 'Agent', text: 'Thank you so much! We really value our long-term relationships with customers like you.' },
    { time: '0:35', speaker: 'Customer', text: 'The way your team handles everything, from regular maintenance to major repairs, is just outstanding.' },
    { time: '0:42', speaker: 'Agent', text: 'Have you heard about our preventive maintenance program?' },
    { time: '0:48', speaker: 'Customer', text: "No, but I'd love to learn more about it. And I've been recommending you to everyone I know." }
  ],
  'sally-smith': [
    { time: '0:00', speaker: 'Agent', text: 'Thank you for calling Aire Serv, this is Alex speaking. How may I assist you today?' },
    { time: '0:05', speaker: 'Customer', text: "Hi, I'm interested in the new Trane system I saw on your website and would like to know about financing options." },
    { time: '0:12', speaker: 'Agent', text: "I'd be happy to help you with information about the Trane system and our financing options." },
    { time: '0:18', speaker: 'Customer', text: "Great, I'm specifically looking at the high-efficiency model." },
    { time: '0:25', speaker: 'Agent', text: 'Excellent choice! We have some special financing rates available right now for qualified buyers.' },
    { time: '0:32', speaker: 'Customer', text: 'What kind of rates are you offering?' },
    { time: '0:38', speaker: 'Agent', text: 'For the Trane system, we have rates starting at 6.99% APR for 60 months for qualified buyers.' },
    { time: '0:45', speaker: 'Customer', text: 'That sounds good. Could you tell me about the down payment requirements?' }
  ],
  'jim-jones': [
    { time: '0:00', speaker: 'Agent', text: 'Thank you for calling Aire Serv Service Department, this is Mike speaking. How can I help you today?' },
    { time: '0:05', speaker: 'Customer', text: 'Hi, I need to schedule a service appointment and have some questions about my warranty coverage.' },
    { time: '0:12', speaker: 'Agent', text: 'I can definitely help you with both. What type of service were you looking to schedule?' },
    { time: '0:18', speaker: 'Customer', text: 'I need an AC tune-up and my warranty is expiring soon.' },
    { time: '0:25', speaker: 'Agent', text: 'Let me check our service availability first. For the warranty, I can look up extension options.' },
    { time: '0:32', speaker: 'Customer', text: 'Perfect, thank you.' },
    { time: '0:38', speaker: 'Agent', text: 'I have an opening tomorrow at 2:30 PM or Friday at 10:00 AM. Which works better?' },
    { time: '0:45', speaker: 'Customer', text: 'Friday at 10 AM would be perfect.' }
  ]
};

interface CallViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: any;
  type: 'call' | 'review';
  isDarkMode?: boolean;
}

export const CallViewModal = ({ isOpen, onClose, lead, type, isDarkMode = false }: CallViewModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const duration = 180; // 3 minutes in seconds

  if (!lead) return null;

  const getTranscript = () => {
    if (!lead.id) return [];
    return dummyTranscript[lead.id.toLowerCase()] || [];
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`w-full max-w-2xl rounded-xl shadow-xl transform transition-all ${
          isDarkMode 
            ? 'bg-gray-800/95 border border-gray-700' 
            : 'bg-white'
        }`}>
          <div className={`flex justify-between items-center p-4 border-b ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <Dialog.Title className={`text-xl font-semibold ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Call Details
            </Dialog.Title>
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

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Customer
                </p>
                <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  {lead.name}
                </p>
              </div>
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Phone
                </p>
                <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  {lead.phone}
                </p>
              </div>
              <div className="col-span-2">
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Reason for Review
                </p>
                <p className={`font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {lead.reason || 'Standard call review'}
                </p>
              </div>
            </div>

            <div>
              <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Call Recording
              </p>
              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                      isDarkMode
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <div className="flex-1">
                    <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div 
                        className={`absolute h-full rounded-full ${
                          isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}
                      </span>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Volume2 className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      defaultValue="100"
                      className={`w-20 ${isDarkMode ? 'accent-blue-500' : 'accent-blue-600'}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowTranscript(!showTranscript)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'border border-gray-700 text-gray-300 hover:bg-gray-700'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>{showTranscript ? 'Hide Transcript' : 'View Transcript'}</span>
              </button>
            </div>

            {showTranscript && (
              <div className={`rounded-lg ${
                isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'
              }`}>
                <div className={`p-4 border-b ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <h4 className={`font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}>
                    Call Transcript
                  </h4>
                </div>
                <div className="p-4 max-h-[300px] overflow-y-auto">
                  <div className="space-y-4">
                    {getTranscript().map((entry, index) => (
                      <div key={index} className="flex space-x-4">
                        <div className={`w-16 text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {entry.time}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`font-medium ${
                            entry.speaker === 'Agent'
                              ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                              : isDarkMode ? 'text-amber-400' : 'text-amber-600'
                          }`}>
                            {entry.speaker}:
                          </span>
                          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {entry.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div>
              <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Summary
              </p>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                {lead.summary}
              </p>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};