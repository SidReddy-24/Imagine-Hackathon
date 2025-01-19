import React, { useState, useEffect, useRef } from 'react';
import { Search, MessageSquarePlus, Clock, Star, Archive, Settings, ChevronLeft, Upload, Download, FileJson } from 'lucide-react';
import ChatModal from './ChatModal';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatPageProps {
  isDark: boolean;
}

interface Chat {
  id: string;
  title: string;
  date: string;
}

interface ApiResponse {
  text: string;
  timestamp: Date;
}

export function ChatPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatHistory] = useState<Chat[]>([
    { id: '1', title: 'Financial Planning Discussion', date: '2024-03-20' },
    { id: '2', title: 'Investment Strategy', date: '2024-03-19' },
    { id: '3', title: 'Tax Planning', date: '2024-03-18' },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [jsonData, setJsonData] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const askDoubt = async (inputText: string) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{ text: inputText }],
          }],
        }),
      });

      const data = await response.json();
      
      // Extract the response text from the Gemini API response
      const botResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process your request.";
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: botResponseText,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error asking doubt:', error);
      // Add error message to chat
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Sorry, there was an error processing your request.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentMessage = message;
    setMessage('');
    setIsTyping(true);

    await askDoubt(currentMessage);
    setIsTyping(false);
  };

  const statusMessages = [
    { threshold: 30, message: 'Uploading Form 16...' },
    { threshold: 60, message: 'Processing Form...' },
    { threshold: 90, message: 'Generating ITR...' }
  ];

  const startProgress = () => {
    setProgress(0);
    setIsProcessing(true);
    
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (progressInterval.current) {
            clearInterval(progressInterval.current);
          }
          return 100;
        }
        return prev + 1;
      });
    }, 150); // 15 seconds total duration (150ms * 100 steps)
  };

  useEffect(() => {
    const currentMessage = statusMessages.find(msg => progress <= msg.threshold);
    if (currentMessage) {
      setStatus(currentMessage.message);
    }
    
    if (progress >= 100) {
      setIsProcessing(false);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }
  }, [progress]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    startProgress();

    try {
      // Simulate API call with setTimeout
      setTimeout(() => {
        // Use the demo JSON data directly
        const demoJson = {
          "ITR": {
            "ITR1": {
              // ... (copy the entire demo.json content here)
            }
          }
        };
        
        setJsonData(JSON.stringify(demoJson, null, 2));
        setProgress(100); // Skip to 100%
      }, 15000); // Wait for 15 seconds before completing

    } catch (error) {
      console.error('Error processing file:', error);
      setStatus('Error processing file. Please try again.');
      setIsProcessing(false);
      
      setTimeout(() => {
        setStatus('');
        setProgress(0);
      }, 3000);
    }
  };

  const handleDownload = () => {
    if (!jsonData) return;
    
    try {
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ITR-Return.json'; // Set specific filename
      document.body.appendChild(a);
      a.click();
      
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      setStatus('Error downloading file. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen pt-16 relative">
      {/* Sidebar - Updated with hover functionality */}
      <div 
        className={`fixed left-0 top-16 h-[calc(100vh-16rem)] z-20 transition-all duration-300 ease-in-out
          w-16 hover:w-72
          border-r border-white/10 overflow-y-auto
          scrollbar-hide group`}
      >
        <div className="flex flex-col h-full relative">
          {/* Remove the collapse button */}
          
          <div className="p-4 space-y-3">
            {/* Search Bar */}
            <div className="relative bg-white/5 rounded-lg overflow-hidden w-8 group-hover:w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full bg-transparent pl-10 pr-4 py-2 text-sm text-white placeholder-white/60 focus:outline-none opacity-0 group-hover:opacity-100"
              />
            </div>

            {/* New Chat Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-white/5 hover:bg-white/10 text-white rounded-lg p-2.5 
                flex items-center justify-center gap-2 transition-colors
                px-2 group-hover:px-4"
            >
              <MessageSquarePlus className="h-5 w-5" />
              <span className="hidden group-hover:inline">New Chat</span>
            </button>

            {/* Navigation Links */}
            <nav className="space-y-2">
              <h3 className="text-white/50 text-xs uppercase font-semibold px-2 mb-2 hidden group-hover:block">
                Quick Access
              </h3>
              <button className="w-full flex items-center gap-3 text-white/80 hover:text-white hover:bg-white/10 px-2 py-2 rounded-lg transition-colors">
                <Clock className="h-5 w-5" />
                <span className="hidden group-hover:inline">Recent</span>
              </button>
              <button className="w-full flex items-center gap-3 text-white/80 hover:text-white hover:bg-white/10 px-2 py-2 rounded-lg transition-colors">
                <Star className="h-5 w-5" />
                <span className="hidden group-hover:inline">Starred</span>
              </button>
              <button className="w-full flex items-center gap-3 text-white/80 hover:text-white hover:bg-white/10 px-2 py-2 rounded-lg transition-colors">
                <Archive className="h-5 w-5" />
                <span className="hidden group-hover:inline">Archived</span>
              </button>
            </nav>

            {/* Chat History */}
            <div className="mt-6 hidden group-hover:block">
              <h3 className="text-white/50 text-xs uppercase font-semibold px-2 mb-2">
                Recent Chats
              </h3>
              <div className="space-y-1">
                {chatHistory.map((chat) => (
                  <button
                    key={chat.id}
                    className="w-full text-left hover:bg-white/10 p-2 rounded-lg transition-colors group/item"
                  >
                    <div className="text-sm text-white/90 group-hover/item:text-white truncate">
                      {chat.title}
                    </div>
                    <div className="text-xs text-white/50 group-hover/item:text-white/70 transition-colors">
                      {new Date(chat.date).toLocaleDateString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Settings Button */}
            <div className="mt-auto p-4">
              <button className="w-full flex items-center gap-3 text-white/80 hover:text-white hover:bg-white/10 px-2 py-2 rounded-lg transition-colors">
                <Settings className="h-5 w-5" />
                <span className="hidden group-hover:inline">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area - Update margin based on hover */}
      <div className="flex-1 transition-all duration-300 ml-16 group-hover:ml-72 mb-12">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-lg p-6 min-h-[calc(100vh-16rem)] flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-hide">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.isUser
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white rounded-lg p-3">
                    Typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="mt-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Type your message..."
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {isModalOpen && (
        <ChatModal
          onClose={() => setIsModalOpen(false)}
          initialMessage="How can I help you today?"
        />
      )}

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-lg p-8 min-h-[calc(100vh-16rem)]">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {!isProcessing && !jsonData && (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-2">Upload Form 16</h2>
                  <p className="text-white/70">Upload your Form 16 PDF to generate ITR JSON</p>
                </div>
                
                <label className="relative cursor-pointer bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center gap-2">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <FileJson className="h-5 w-5" />
                  Choose File
                </label>
              </div>
            )}

            {isProcessing && (
              <div className="w-full max-w-md">
                <div className="mb-4 text-center">
                  <h3 className="text-lg font-medium text-white mb-2">{status}</h3>
                  <p className="text-white/70 text-sm">{file?.name}</p>
                </div>
                <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-purple-600 h-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {jsonData && !isProcessing && (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">ITR JSON Generated Successfully!</h3>
                <button
                  onClick={handleDownload}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  Download JSON
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 