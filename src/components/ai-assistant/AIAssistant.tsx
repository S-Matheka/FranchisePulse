import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles } from 'lucide-react';

interface Message {
  type: 'user' | 'assistant';
  content: string;
}

const suggestedQuestions = [
  "What were the most frequent reasons we received calls over the past week?",
  "Which vehicles are customers inquiring about the most this month?",
  "What issues are making customers the most frustrated?",
  "What are the top 5 things customers are talking to the service department about this month?"
];

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: 'assistant', 
      content: "Hi! I'm Genie, your dealership insights assistant. How can I help you analyze your data today?" 
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    
    const userMessage = { type: 'user' as const, content: text };
    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      const response = generateResponse(text);
      setMessages(prev => [...prev, { type: 'assistant', content: response }]);
    }, 500);
    
    setInput('');
  };

  return (
    <div className={`
      fixed inset-y-0 right-0 w-96 transform transition-transform duration-300 ease-in-out z-50
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      bg-gray-800 border-l border-gray-700 shadow-2xl
    `}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-emerald-400" />
              <h2 className="text-lg font-semibold text-gray-100">Genie</h2>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                max-w-[80%] p-3 rounded-lg
                ${message.type === 'user' 
                  ? 'bg-emerald-500 text-white rounded-br-none' 
                  : 'bg-gray-700 text-gray-100 rounded-bl-none'
                }
              `}>
                {message.content}
              </div>
            </div>
          ))}
          {messages.length === 1 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Try asking:</p>
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(question)}
                  className="w-full text-left p-3 text-sm rounded-lg text-gray-300 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 transition-all duration-200"
                >
                  {question}
                </button>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about your dealership data..."
              className="flex-1 p-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};