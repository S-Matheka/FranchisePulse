import React, { useState } from 'react';
import { Play, FileText, Info, ExternalLink, Share2, Clock, User, Phone, Pause, Volume2 } from 'lucide-react';

// Add transcript data
const dummyTranscript = [
  { time: '0:00', speaker: 'Agent', text: 'Thank you for calling Creo Solutions, this is Sarah speaking. How may I assist you today?' },
  { time: '0:05', speaker: 'Customer', text: 'Hi, I\'m calling about the 2024 Honda Civic I saw on your website.' },
  { time: '0:10', speaker: 'Agent', text: 'I\'d be happy to help you with information about the Honda Civic. Could you tell me which specific trim level you\'re interested in?' },
  { time: '0:15', speaker: 'Customer', text: 'I was looking at the Sport trim.' },
  { time: '0:18', speaker: 'Agent', text: 'Excellent choice! The Sport trim comes with several attractive features. Would you like me to go over those with you?' },
  { time: '0:23', speaker: 'Customer', text: 'Yes, please. And I\'d also like to know about financing options.' },
  { time: '0:28', speaker: 'Agent', text: 'Of course! Let me start with the key features, and then we can discuss our current financing promotions...' }
];

interface CallDetailsProps {
  call: {
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
  };
}

export const CallDetails = ({ call }: CallDetailsProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const intervalRef = useRef<number | null>(null);
  
  // Format duration from seconds to mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate audio playback
  const togglePlayback = () => {
    if (isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      intervalRef.current = window.setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= call.duration) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    setIsPlaying(!isPlaying);
  };

  // Clean up interval on unmount
  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Rest of the existing code remains the same until the audio player */}
      
      {/* Audio Player */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={togglePlayback}
            className="flex items-center justify-center w-10 h-10 bg-[#4f8edb] text-white rounded-full hover:bg-[#4f8edb]/90"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <div className="flex-1">
            <div className="relative w-full h-2 bg-gray-200 rounded-full">
              <div 
                className="absolute h-full bg-[#4f8edb] rounded-full"
                style={{ width: `${(currentTime / call.duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-sm text-[#58677f]">{formatDuration(currentTime)}</span>
              <span className="text-sm text-[#58677f]">{formatDuration(call.duration)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5 text-[#58677f]" />
            <input 
              type="range" 
              min="0" 
              max="100" 
              defaultValue="100"
              className="w-20"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <button 
          onClick={() => setShowTranscript(!showTranscript)}
          className="flex items-center space-x-2 px-4 py-2 border border-[#58677f] text-[#58677f] rounded-lg hover:bg-gray-50"
        >
          <FileText className="w-4 h-4" />
          <span>{showTranscript ? 'Hide Transcript' : 'View Transcript'}</span>
        </button>
      </div>

      {/* Transcript */}
      {showTranscript && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-[#1f3653] mb-4">Call Transcript</h4>
          <div className="space-y-4">
            {dummyTranscript.map((entry, index) => (
              <div key={index} className="flex space-x-4">
                <div className="w-16 text-sm text-[#58677f]">{entry.time}</div>
                <div className="flex-1">
                  <span className={`font-medium ${
                    entry.speaker === 'Agent' ? 'text-[#4f8edb]' : 'text-[#e0a731]'
                  }`}>
                    {entry.speaker}:
                  </span>
                  <p className="text-[#1f3653]">{entry.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rest of the existing code remains the same */}
    </div>
  );
};