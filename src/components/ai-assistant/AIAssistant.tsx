import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot } from 'lucide-react';

interface Message {
  type: 'user' | 'assistant' | 'suggestions';
  content: string;
  suggestions?: string[];
}

const suggestedQuestions = [
  "What were the most frequent reasons we received calls over the past week?",
  "What brands are customers calling most about for service?",
  "Give me a list of people who have called more than 2 times in the past month."
];

// Knowledge base from actual dashboard data
const knowledgeBase = {
  callReasons: [
    { topic: 'Heater Service', count: 156, percentage: '35%' },
    { topic: 'Seasonal Promotion', count: 134, percentage: '25%' },
    { topic: 'Air Conditioning Maintenance', count: 89, percentage: '20%' },
    { topic: 'HVAC Financing', count: 76, percentage: '12%' },
    { topic: 'Trane Rebate', count: 65, percentage: '8%' }
  ],
  locations: [
    { name: 'Aire Serv of North Denver', calls: 41, missedCalls: 7, salesCalls: 23, serviceCalls: 8, otherCalls: 3 },
    { name: 'Aire Serv of the Front Range', calls: 29, missedCalls: 0, salesCalls: 25, serviceCalls: 4, otherCalls: 0 },
    { name: 'Aire Serv of Fort Collins', calls: 31, missedCalls: 1, salesCalls: 18, serviceCalls: 11, otherCalls: 1 }
  ],
  callers: [
    { name: 'Sally Smith', reason: 'Trane system inquiry', calls: 3 },
    { name: 'Jim Jones', reason: 'Service scheduling', calls: 3 },
    { name: 'Sam Smith', reason: 'Service scheduling', calls: 2 },
    { name: 'Mary Berry', reason: 'HVAC features', calls: 2 }
  ],
  brands: [
    { name: 'Trane', mentions: 12 },
    { name: 'Other brands', mentions: 3 }
  ]
};

export const AIAssistant = ({ isOpen, onClose, isDarkMode }: { isOpen: boolean; onClose: () => void; isDarkMode: boolean }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: 'assistant', 
      content: "Hi! I'm Genie, your HVAC service insights assistant. How can I help you analyze your data today?" 
    },
    {
      type: 'suggestions',
      content: "Try asking:",
      suggestions: suggestedQuestions
    }
  ]);
  const [input, setInput] = useState('');
  const [availableQuestions, setAvailableQuestions] = useState(suggestedQuestions);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (query: string): string => {
    const normalizedQuery = query.toLowerCase();

    // Call reasons response
    if (normalizedQuery.includes('frequent') && normalizedQuery.includes('reasons')) {
      const reasons = knowledgeBase.callReasons
        .map(r => `• ${r.topic} (${r.percentage} of calls)`)
        .join('\n');
      return `Here are the most frequent reasons for calls this week:\n\n${reasons}`;
    }

    // Brands response
    if (normalizedQuery.includes('brands')) {
      return "Based on our call data, Trane solutions are the most discussed brand, with customers specifically inquiring about Trane systems and rebates.";
    }

    // Frequent callers response
    if (normalizedQuery.includes('called') && normalizedQuery.includes('times')) {
      const callers = knowledgeBase.callers
        .filter(c => c.calls > 2)
        .map(c => `• ${c.name} - ${c.calls} calls (Reason: ${c.reason})`)
        .join('\n');
      return `Here are the customers who have called more than 2 times:\n\n${callers}`;
    }

    // Default response
    return "I understand you're asking about " + query + ". Based on our current data, I can help you with:\n\n" +
      "• Call volume and reasons\n" +
      "• Service inquiries\n" +
      "• Customer follow-ups\n" +
      "• HVAC system trends";
  };

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    
    // Remove the question from available questions immediately
    const updatedAvailableQuestions = availableQuestions.filter(q => q !== text);
    setAvailableQuestions(updatedAvailableQuestions);
    
    const userMessage = { type: 'user' as const, content: text };
    const assistantResponse = { type: 'assistant' as const, content: generateResponse(text) };
    
    // Create new messages array without the previous suggestions
    const currentMessages = messages.filter(m => m.type !== 'suggestions');
    
    // Add new messages
    const newMessages = [
      ...currentMessages,
      userMessage,
      assistantResponse
    ];

    // Only add suggestions if there are still available questions
    if (updatedAvailableQuestions.length > 0) {
      newMessages.push({
        type: 'suggestions',
        content: "Try asking:",
        suggestions: updatedAvailableQuestions
      });
    }

    setMessages(newMessages);
    setInput('');
  };

  return (
    <div className={`
      fixed inset-y-0 right-0 w-[400px] transform transition-all duration-300 ease-in-out z-40
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      ${isDarkMode 
        ? 'bg-gray-900 border-l border-gray-800' 
        : 'bg-white border-l border-gray-200'
      }
      top-[73px] bottom-0 h-[calc(100vh-73px)]
    `}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className={`px-6 py-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-100'} bg-inherit`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
                <Bot className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-500'}`} />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Genie
                </h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  AI Assistant
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-inherit">
          {messages.map((message, index) => (
            <div key={index} className={`animate-in fade-in slide-in-from-${message.type === 'user' ? 'right' : 'left'}`}>
              {message.type === 'suggestions' && message.suggestions && message.suggestions.length > 0 ? (
                <div className="space-y-2 mt-4">
                  <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {message.content}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {message.suggestions.map((question, qIndex) => (
                      <button
                        key={qIndex}
                        onClick={() => handleSend(question)}
                        className={`w-full text-left p-4 text-sm rounded-xl transition-all duration-200 ${
                          isDarkMode
                            ? 'bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-700'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-100'
                        }`}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : message.type !== 'suggestions' && (
                <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`
                    max-w-[85%] p-4 rounded-2xl whitespace-pre-wrap
                    ${message.type === 'user' 
                      ? 'bg-emerald-500 text-white'
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-100 border border-gray-700'
                        : 'bg-gray-100 text-gray-800'
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
        <div className={`p-4 bg-inherit border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about your service data..."
              className={`flex-1 p-4 rounded-xl transition-colors ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
              } focus:outline-none focus:ring-2 focus:ring-emerald-500/50 border`}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className={`p-4 rounded-xl transition-colors ${
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