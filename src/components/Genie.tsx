import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

interface GenieProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

interface Message {
  type: 'user' | 'assistant' | 'suggestions';
  content: string;
  suggestions?: string[];
}

// Knowledge base from dashboard data
const knowledgeBase = {
  callReasons: [
    { topic: 'Dealer Financing', count: 156, percentage: '35%' },
    { topic: 'May Service Promotion', count: 134, percentage: '25%' },
    { topic: 'Air bag recall', count: 89, percentage: '20%' },
    { topic: 'Trade-in Values', count: 76, percentage: '12%' },
    { topic: 'New Model Availability', count: 65, percentage: '8%' }
  ],
  vehicleInquiries: [
    { model: '2024 Honda Civic', inquiries: 187 },
    { model: '2024 Honda CR-V', inquiries: 156 },
    { model: '2024 Honda Accord', inquiries: 134 },
    { model: '2024 Honda Pilot', inquiries: 98 }
  ],
  customerFrustrations: [
    { issue: 'Service scheduling process', severity: 'high' },
    { issue: 'Financing approval time', severity: 'medium' },
    { issue: 'Vehicle availability', severity: 'medium' },
    { issue: 'Trade-in valuations', severity: 'low' }
  ],
  serviceTopics: [
    { topic: 'Regular maintenance scheduling', count: 245 },
    { topic: 'Air bag recall service', count: 189 },
    { topic: 'Oil change appointments', count: 156 },
    { topic: 'Brake service inquiries', count: 134 },
    { topic: 'Warranty coverage questions', count: 98 }
  ]
};

const initialQuestions = [
  "What were the most frequent reasons we received calls over the past week?",
  "Which vehicles are customers inquiring about the most this month?",
  "What issues are making customers the most frustrated?",
  "What are the top 5 things customers are talking to the service department about this month?"
];

export const Genie = ({ isOpen, onClose, isDarkMode }: GenieProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: 'assistant', 
      content: "Hi! I'm Genie, your dealership insights assistant. How can I help you analyze your data today?" 
    },
    {
      type: 'suggestions',
      content: "Try asking:",
      suggestions: initialQuestions
    }
  ]);
  const [input, setInput] = useState('');
  const [availableQuestions, setAvailableQuestions] = useState(initialQuestions);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (query: string): string => {
    const normalizedQuery = query.toLowerCase();

    // Remove the asked question from available questions
    setAvailableQuestions(prev => prev.filter(q => q !== query));

    // Call reasons response
    if (normalizedQuery.includes('frequent') && normalizedQuery.includes('reasons')) {
      const reasons = knowledgeBase.callReasons
        .map(r => `• ${r.topic} (${r.percentage} of calls)`)
        .join('\n');
      return `Here are the most frequent reasons for calls this week:\n\n${reasons}`;
    }

    // Vehicle inquiries response
    if (normalizedQuery.includes('vehicles') && normalizedQuery.includes('inquiring')) {
      const vehicles = knowledgeBase.vehicleInquiries
        .map(v => `• ${v.model} - ${v.inquiries} inquiries`)
        .join('\n');
      return `Here are the vehicles customers are inquiring about most:\n\n${vehicles}`;
    }

    // Customer frustrations response
    if (normalizedQuery.includes('frustrated') || normalizedQuery.includes('issues')) {
      const issues = knowledgeBase.customerFrustrations
        .map(f => `• ${f.issue} (${f.severity} severity)`)
        .join('\n');
      return `Here are the main issues causing customer frustration:\n\n${issues}`;
    }

    // Service department topics response
    if (normalizedQuery.includes('service') && normalizedQuery.includes('department')) {
      const topics = knowledgeBase.serviceTopics
        .map(t => `• ${t.topic} - ${t.count} inquiries`)
        .join('\n');
      return `Here are the top 5 service department topics:\n\n${topics}`;
    }

    // Default response
    return "I understand you're asking about " + query + ". Based on our current data, I can help you with:\n\n" +
      "• Call volume and reasons\n" +
      "• Vehicle inquiries\n" +
      "• Customer satisfaction issues\n" +
      "• Service department trends";
  };

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    
    const userMessage = { type: 'user' as const, content: text };
    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      const response = generateResponse(text);
      const newMessages: Message[] = [
        ...messages,
        userMessage,
        { type: 'assistant', content: response }
      ];

      // Only add suggestions if there are available questions
      if (availableQuestions.length > 0) {
        newMessages.push({
          type: 'suggestions',
          content: "Try asking:",
          suggestions: availableQuestions
        });
      }

      setMessages(newMessages);
    }, 500);
    
    setInput('');
  };

  return (
    <div className={`
      fixed top-[73px] bottom-0 right-0 w-96 transform transition-transform duration-300 ease-in-out z-40
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      ${isDarkMode 
        ? 'bg-gray-900 border-l border-gray-700' 
        : 'bg-white border-l border-gray-200'
      }
    `}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles className={`w-6 h-6 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-500'}`} />
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Genie
              </h2>
            </div>
            <button 
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-800 text-gray-400' 
                  : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index}>
              {message.type === 'suggestions' && message.suggestions && message.suggestions.length > 0 ? (
                <div className="mt-2 space-y-2">
                  {message.suggestions.map((question, qIndex) => (
                    <button
                      key={qIndex}
                      onClick={() => handleSend(question)}
                      className={`w-full text-left p-3 text-sm rounded-lg transition-all duration-200 ${
                        isDarkMode
                          ? 'text-gray-300 hover:bg-gray-800 border border-gray-700 hover:border-gray-600'
                          : 'text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              ) : message.type !== 'suggestions' && (
                <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`
                    max-w-[80%] p-3 rounded-lg whitespace-pre-wrap
                    ${message.type === 'user' 
                      ? isDarkMode
                        ? 'bg-emerald-500 text-white rounded-br-none'
                        : 'bg-emerald-600 text-white rounded-br-none'
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-100 rounded-bl-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }
                  `}>
                    {message.content}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about your dealership data..."
              className={`flex-1 p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500 focus:border-emerald-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
              } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 border`}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};