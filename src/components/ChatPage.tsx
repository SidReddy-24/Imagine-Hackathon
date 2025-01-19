import React, { useState, useEffect } from 'react';
import { Search, MessageSquarePlus, Clock, Star, Archive, Settings, Upload } from 'lucide-react';
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
  title: "Income Tax Return - AY 2022-23",
  version: "1.0",
  creationDate: "2024-07-04",
  location: "Delhi",
  
  personalDetails: {
    name: "John Doe",
    pan: "XXXXX1234X",
    address: {
      street: "123 Main Street",
      city: "Bengaluru",
      state: "Karnataka",
      pinCode: "560001"
    },
    contact: {
      mobile: "+91 9999999999",
      email: "john.doe@example.com"
    }
  },

  incomeDetails: {
    salary: {
      gross: "₹25,57,983",
      allowances: "₹1,80,150",
      net: "₹23,77,833"
    },
    deductions: {
      standard: "₹50,000",
      professional: "₹2,400",
      total: "₹52,400"
    },
    taxableIncome: "₹23,25,433"
  },

  taxComputation: {
    totalTax: "₹4,65,132",
    educationCess: "₹18,605",
    totalLiability: "₹4,83,737",
    tdsPaid: "₹4,83,740",
    refundDue: "₹3"
  },

  employerDetails: {
    name: "Example Corp Ltd",
    tan: "XXXX0000X",
    address: "Tech Park, Electronic City",
    category: "Private Sector"
  }
};

export function ChatPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showJson, setShowJson] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [chatHistory] = useState<Chat[]>([
    { id: '1', title: 'Financial Planning Discussion', date: '2024-03-20' },
    { id: '2', title: 'Investment Strategy', date: '2024-03-19' },
    { id: '3', title: 'Tax Planning', date: '2024-03-18' },
  ]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file');
      return;
    }

    setIsLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsLoading(false);
      setShowJson(true);
    }, 5000);
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(exampleJson, null, 2));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

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
            {!showJson && !isLoading && (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-2">Upload Form 16</h2>
                  <p className="text-white/70">Upload your Form 16 PDF to generate ITR JSON</p>
                </div>
                
                <div className="flex justify-center">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label
                    htmlFor="pdf-upload"
                    className="cursor-pointer bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors inline-flex items-center gap-2"
                  >
                    <Upload className="h-5 w-5" />
                    Choose File
                  </label>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 relative">
                  <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-purple-500 animate-spin"></div>
                </div>
                <p className="text-white mt-4">Processing Form 16...</p>
              </div>
            )}

            {showJson && !isLoading && (
              <>
                <h2 className="text-2xl font-semibold text-white mb-4">Generated ITR Details</h2>
                <div className="bg-black/30 rounded-lg p-6 overflow-auto max-h-[60vh] custom-scrollbar">
                  <div className="text-white/90 space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold text-purple-300 mb-3">Basic Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-white/60">Assessment Year</p>
                          <p>{exampleJson.title}</p>
                        </div>
                        <div>
                          <p className="text-white/60">Filing Date</p>
                          <p>{exampleJson.creationDate}</p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-purple-300 mb-3">Personal Details</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-white/60">Name</p>
                          <p>{exampleJson.personalDetails.name}</p>
                        </div>
                        <div>
                          <p className="text-white/60">PAN</p>
                          <p>{exampleJson.personalDetails.pan}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-white/60">Address</p>
                          <p>{`${exampleJson.personalDetails.address.street}, ${exampleJson.personalDetails.address.city}, ${exampleJson.personalDetails.address.state} - ${exampleJson.personalDetails.address.pinCode}`}</p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-purple-300 mb-3">Income Details</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-white/60">Gross Salary</p>
                          <p>{exampleJson.incomeDetails.salary.gross}</p>
                        </div>
                        <div>
                          <p className="text-white/60">Net Salary</p>
                          <p>{exampleJson.incomeDetails.salary.net}</p>
                        </div>
                        <div>
                          <p className="text-white/60">Total Deductions</p>
                          <p>{exampleJson.incomeDetails.deductions.total}</p>
                        </div>
                        <div>
                          <p className="text-white/60">Taxable Income</p>
                          <p>{exampleJson.incomeDetails.taxableIncome}</p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold text-purple-300 mb-3">Tax Computation</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-white/60">Total Tax</p>
                          <p>{exampleJson.taxComputation.totalTax}</p>
                        </div>
                        <div>
                          <p className="text-white/60">Education Cess</p>
                          <p>{exampleJson.taxComputation.educationCess}</p>
                        </div>
                        <div>
                          <p className="text-white/60">TDS Paid</p>
                          <p>{exampleJson.taxComputation.tdsPaid}</p>
                        </div>
                        <div>
                          <p className="text-white/60">Refund Due</p>
                          <p>{exampleJson.taxComputation.refundDue}</p>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-white/70 text-sm">
                    This is the processed information from your Form 16.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleCopyJson}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 
                        text-white rounded-lg transition-colors text-sm"
                    >
                      {copySuccess ? (
                        <>
                          <span>Copied!</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <span>Copy JSON</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </>
                      )}
                    </button>
                    <a
                      href="https://eportal.incometax.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 
                        text-white rounded-lg transition-colors text-sm"
                    >
                      <span>File on Income Tax Portal</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </>
            )}
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