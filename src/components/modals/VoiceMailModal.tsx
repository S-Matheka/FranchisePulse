import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Play, Pause, Volume2, FileText } from 'lucide-react';

const dummyTranscript = [
  { time: '0:00', text: 'Hi, this is John Smith calling about my service appointment scheduled for tomorrow. I need to reschedule due to a conflict. Please call me back at 202-555-1212. Thank you.' }
];

interface VoiceMailModalProps {
  isOpen: boolean;
  onClose: () => void;
  call: any;
  isDarkMode?: boolean;
}

export const VoiceMailModal = ({ isOpen, onClose, call, isDarkMode = false }: VoiceMailModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const duration = 60; // 1 minute in seconds

  if (!call) return null;

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`w-full max-w-2xl transform transition-all ${
          isDarkMode 
            ? 'bg-[#1a1f24]' 
            : 'bg-white'
        }`}>
          <div className="p-6 space-y-8">
            <div className="flex justify-between items-center">
              <Dialog.Title className={`text-3xl font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Voice Mail
              </Dialog.Title>
              <button 
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Caller
                </p>
                <p className={`text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {call.name}
                </p>
              </div>
              <div>
                <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Phone
                </p>
                <p className={`text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {call.phone}
                </p>
              </div>
            </div>

            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-[#12161a]' : 'bg-gray-50'}`}>
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <div className="flex-1">
                  <div className={`relative w-full h-2 rounded-full ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                  }`}>
                    <div 
                      className="absolute h-full rounded-full bg-blue-500"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}
                    </span>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Volume2 className={isDarkMode ? 'text-gray-500' : 'text-gray-500'} />
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    defaultValue="100"
                    className="w-24 accent-blue-500"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowTranscript(!showTranscript)}
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                isDarkMode
                  ? 'bg-[#12161a] text-gray-300 hover:bg-[#1a1f24]'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>View Transcript</span>
            </button>

            {showTranscript && (
              <div className={`rounded-lg ${isDarkMode ? 'bg-[#12161a]' : 'bg-gray-50'}`}>
                <div className="p-4">
                  <h4 className={`font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Voice Mail Transcript
                  </h4>
                  <div className="space-y-4">
                    {dummyTranscript.map((entry, index) => (
                      <div key={index} className="flex space-x-4">
                        <div className={`w-16 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {entry.time}
                        </div>
                        <div className="flex-1">
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
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};