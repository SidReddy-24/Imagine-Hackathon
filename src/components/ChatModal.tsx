import React, { useState } from 'react';
import { getGeminiResponse } from '../services/geminiService';

// Define the Message type if not imported
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatModalProps {
  onClose: () => void;
  initialMessage: string;
}

const ChatModal: React.FC<ChatModalProps> = ({ onClose, initialMessage }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '0', 
      text: initialMessage, 
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(input);
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-xl w-full max-w-2xl m-4 p-4 flex flex-col max-h-[80vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Chat Assistant</h2>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.isUser
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-white'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 text-white rounded-lg p-3">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:hover:bg-purple-500"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatModal; 