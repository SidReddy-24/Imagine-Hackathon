import React, { useState } from 'react';
import { Search, MessageSquarePlus, Clock, Star, Archive, Settings } from 'lucide-react';
import ChatModal from './ChatModal';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Chat {
  id: string;
  title: string;
  date: string;
}

const exampleJson = {
  "ITR": {
    "ITR1": {
      "CreationInfo": {
        "SWVersionNo": "1.0",
        "SWCreatedBy": "SW20230407",
        "JSONCreatedBy": "SW20230407",
        "JSONCreationDate": "2024-07-04",
        "IntermediaryCity": "Delhi",
      },
      "Form_ITR1": {
        "FormName": "ITR-1",
        "Description": "Income Tax Return for AY 2022-23",
        "AssessmentYear": "2023",
        "SchemaVer": "Ver1.0",
      },
      "PersonalInfo": {
        "AssesseeName": {
          "FirstName": "John",
          "MiddleName": "",
          "SurNameOrOrgName": "Doe"
        },
        "PAN": "XXXXX1234X",
        "Address": {
          "ResidenceNo": "123",
          "CityOrTownOrDistrict": "Bengaluru",
          "StateCode": "15",
          "CountryCode": "91",
          "PinCode": "560001",
        }
      }
    }
  }
};

export function ChatPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatHistory] = useState<Chat[]>([
    { id: '1', title: 'Financial Planning Discussion', date: '2024-03-20' },
    { id: '2', title: 'Investment Strategy', date: '2024-03-19' },
    { id: '3', title: 'Tax Planning', date: '2024-03-18' },
  ]);

  return (
    <div className="flex min-h-screen pt-16 relative">
      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-20 transition-all duration-300 ease-in-out
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

      {/* Main Content Area */}
      <div className="flex-1 transition-all duration-300 ml-16 group-hover:ml-72">
        <div className="max-w-4xl mx-auto p-6 min-h-[calc(100vh-4rem)]">
          <div className="bg-white/10 backdrop-blur-xl rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Example ITR JSON Format</h2>
            <div className="bg-black/30 rounded-lg p-6 overflow-auto max-h-[60vh] custom-scrollbar">
              <pre className="text-white/90 text-sm">
                {JSON.stringify(exampleJson, null, 2)}
              </pre>
            </div>
            <p className="text-white/70 mt-4 text-sm">
              This is an example of the ITR JSON format that will be generated from your Form 16.
            </p>
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
    </div>
  );
} 