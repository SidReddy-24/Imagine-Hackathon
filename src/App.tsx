import { useState } from 'react';
import { ArrowRight, IndianRupee, BarChart3, Wallet, Shield, Menu } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import { Modal } from './components/Modal';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { ChatPage } from './components/ChatPage';
import { ChoiceDialog } from './components/ChoiceDialog';
import { ManualEntryChat } from './components/ManualEntryChat';
import { useClickOutside } from './hooks/useClickOutside';
import { AdminLogin } from './components/AdminLogin';
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute';

function App() {
  const { isSignedIn, user } = useUser();
  const isDark = (() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  })();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showChoiceDialog, setShowChoiceDialog] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleStartNow = () => {
    setShowChoiceDialog(true);
  };

  const handleWithForm16 = () => {
    setShowChoiceDialog(false);
    navigate('/chat');
  };

  const handleWithoutForm16 = () => {
    setShowChoiceDialog(false);
    navigate('/manual-entry');
  };

  const menuRef = useClickOutside(() => setIsAdminMenuOpen(false));

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Animated Gradient Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary Gradient Blob */}
        <div className="absolute -top-[40%] -left-[20%] w-[140%] h-[140%] animate-slow-spin">
          <div className="absolute inset-0 rounded-[40%] blur-3xl opacity-30 bg-gradient-to-r from-purple-400 via-pink-300 to-orange-300" />
        </div>

        {/* Secondary Moving Patterns */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 animate-float">
            <div className="absolute inset-0 rounded-full blur-2xl opacity-20 bg-white" />
          </div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 animate-float-delay">
            <div className="absolute inset-0 rounded-full blur-2xl opacity-20 bg-orange-300" />
          </div>
        </div>

        {/* Gradient Mesh */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, 
              rgba(255, 255, 255, 0.2) 0%, 
              transparent 50%)`,
          }}
        />
      </div>

      {/* Background Blur Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-3xl animate-pulse-slow"></div>

      {/* Navigation - Only show on home page */}
      {window.location.pathname === '/' && (
        <nav className="fixed w-full bg-white/10 backdrop-blur-xl z-50 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Logo */}
              <div 
                className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate('/')}
              >
                <IndianRupee className="h-8 w-8 text-white" />
                <span className="ml-2 text-xl font-bold text-white">TaxSarthi</span>
              </div>

              {/* Right side - Auth buttons */}
              <div className="flex items-center space-x-4">
                {isSignedIn ? (
                  <>
                    <div ref={menuRef} className="relative">
                      <button
                        onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                        className="text-white/90 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                      >
                        <Menu className="h-5 w-5" />
                      </button>
                      
                      {/* Admin Dropdown Menu */}
                      {isAdminMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-xl rounded-lg shadow-lg py-1 border border-white/20">
                          <Link
                            to="/admin/login"
                            className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                          >
                            Admin Dashboard
                          </Link>
                          <a
                            href="/admin/users"
                            className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                          >
                            User Management
                          </a>
                          <a
                            href="/admin/settings"
                            className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                          >
                            System Settings
                          </a>
                        </div>
                      )}
                    </div>
                    <span className="text-white/90">Welcome, {user.firstName}</span>
                    <UserButton afterSignOutUrl="/" />
                  </>
                ) : (
                  <SignInButton mode="modal">
                    <button className="text-white/90 hover:text-white transition-colors">
                      Sign in
                    </button>
                  </SignInButton>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={
          <>
            {/* Hero Section */}
            <div className="pt-40 pb-32 px-4 sm:px-6 lg:px-8 relative">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                  {/* Left Column - Text Content */}
                  <div className="text-left lg:pr-8">
                    <div className="mb-8">
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                        isDark ? 'bg-purple-400/10 text-purple-300' : 'bg-purple-100 text-purple-600'
                      }`}>
                        New feature: TaxSarthi Connect →
                      </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1]">
                      Simplifying <br className="hidden md:block" />
                      Tax Filing for <br className="hidden md:block" />
                      Every Indian
                    </h1>
                    <p className="text-xl text-white/70 mb-8">
                      Empowering millions of Indians to file taxes effortlessly. Your trusted companion for tax compliance, making every citizen's contribution count in building a stronger nation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                      {isSignedIn ? (
                        <div className="flex flex-col sm:flex-row gap-6">
                          <button 
                            onClick={handleStartNow}
                            className={`${
                              isDark 
                                ? 'bg-white text-purple-900' 
                                : 'bg-white text-purple-600'
                            } px-8 py-4 rounded-full hover:opacity-90 transition flex items-center justify-center font-semibold text-lg shadow-lg`}
                          >
                            Start now <ArrowRight className="ml-2 h-5 w-5" />
                          </button>
                          <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/20 transition flex items-center justify-center font-semibold text-lg">
                            Learn more
                          </button>
                        </div>
                      ) : (
                        <>
                          <SignUpButton mode="modal">
                            <button 
                              onClick={handleStartNow}
                              className={`${
                                isDark 
                                  ? 'bg-white text-purple-900' 
                                  : 'bg-white text-purple-600'
                              } px-8 py-4 rounded-full hover:opacity-90 transition flex items-center justify-center font-semibold text-lg shadow-lg`}
                            >
                              Start now <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                          </SignUpButton>
                          <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/20 transition flex items-center justify-center font-semibold text-lg">
                            Learn more
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Image */}
                  <div className="relative lg:h-[700px] flex items-center">
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="w-full transform transition-transform hover:scale-[1.02] focus:outline-none"
                    >
                      <div className={`${
                        isDark ? 'bg-purple-800/20' : 'bg-white/10'
                      } backdrop-blur-xl p-8 rounded-3xl border ${
                        isDark ? 'border-purple-500/20' : 'border-white/20'
                      } shadow-2xl relative overflow-hidden`}>
                        <img
                          src="/WhatsApp Image 2025-01-19 at 7.26.18 AM.jpeg"
                          alt="Financial App Interface Mockup"
                          className="w-full h-auto rounded-2xl shadow-lg"
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="py-32 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    Unified platform, <br className="hidden md:block" />
                    endless possibilities
                  </h2>
                  <p className="text-xl text-white/70 max-w-3xl mx-auto">
                    A fully integrated suite of financial products to help you scale
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className={`${
                    isDark ? 'bg-purple-800/30' : 'bg-white/10'
                  } backdrop-blur-xl p-8 rounded-2xl border ${
                    isDark ? 'border-purple-500/20' : 'border-white/20'
                  }`}>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Analytics Dashboard</h3>
                    <p className="text-white/70">Track your business growth with our powerful analytics tools and real-time insights.</p>
                  </div>
                  <div className={`${
                    isDark ? 'bg-purple-800/30' : 'bg-white/10'
                  } backdrop-blur-xl p-8 rounded-2xl border ${
                    isDark ? 'border-purple-500/20' : 'border-white/20'
                  }`}>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                      <Wallet className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Global Payments</h3>
                    <p className="text-white/70">Accept payments in multiple currencies with our secure and reliable payment infrastructure.</p>
                  </div>
                  <div className={`${
                    isDark ? 'bg-purple-800/30' : 'bg-white/10'
                  } backdrop-blur-xl p-8 rounded-2xl border ${
                    isDark ? 'border-purple-500/20' : 'border-white/20'
                  }`}>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Enterprise Security</h3>
                    <p className="text-white/70">Bank-grade security with advanced fraud prevention and data protection systems.</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        } />
        <Route path="/chat" element={
          <div className="min-h-screen">
            <nav className="fixed w-full bg-white/10 backdrop-blur-xl z-50 border-b border-white/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                  <div 
                    className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => navigate('/')}
                  >
                    <IndianRupee className="h-8 w-8 text-white" />
                    <span className="ml-2 text-xl font-bold text-white">TaxSarthi</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    {isSignedIn ? (
                      <>
                        <div ref={menuRef} className="relative">
                          <button
                            onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                            className="text-white/90 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                          >
                            <Menu className="h-5 w-5" />
                          </button>
                          
                          {/* Admin Dropdown Menu */}
                          {isAdminMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-xl rounded-lg shadow-lg py-1 border border-white/20">
                              <Link
                                to="/admin/login"
                                className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                              >
                                Admin Dashboard
                              </Link>
                              <a
                                href="/admin/users"
                                className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                              >
                                User Management
                              </a>
                              <a
                                href="/admin/settings"
                                className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                              >
                                System Settings
                              </a>
                            </div>
                          )}
                        </div>
                        <span className="text-white/90">Welcome, {user.firstName}</span>
                        <UserButton afterSignOutUrl="/" />
                      </>
                    ) : (
                      <SignInButton mode="modal">
                        <button className="text-white/90 hover:text-white transition-colors">
                          Sign in
                        </button>
                      </SignInButton>
                    )}
                  </div>
                </div>
              </div>
            </nav>
            <div className="pt-16 h-[calc(100vh-4rem)]">
              <ChatPage />
            </div>
          </div>
        } />
        <Route path="/manual-entry" element={
          <div className="min-h-screen">
            <nav className="fixed w-full bg-white/10 backdrop-blur-xl z-50 border-b border-white/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                  <div 
                    className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => navigate('/')}
                  >
                    <IndianRupee className="h-8 w-8 text-white" />
                    <span className="ml-2 text-xl font-bold text-white">TaxSarthi</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    {isSignedIn ? (
                      <>
                        <div ref={menuRef} className="relative">
                          <button
                            onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                            className="text-white/90 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                          >
                            <Menu className="h-5 w-5" />
                          </button>
                          
                          {/* Admin Dropdown Menu */}
                          {isAdminMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-xl rounded-lg shadow-lg py-1 border border-white/20">
                              <Link
                                to="/admin/login"
                                className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                              >
                                Admin Dashboard
                              </Link>
                              <a
                                href="/admin/users"
                                className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                              >
                                User Management
                              </a>
                              <a
                                href="/admin/settings"
                                className="block px-4 py-2 text-white hover:bg-white/10 transition-colors"
                              >
                                System Settings
                              </a>
                            </div>
                          )}
                        </div>
                        <span className="text-white/90">Welcome, {user.firstName}</span>
                        <UserButton afterSignOutUrl="/" />
                      </>
                    ) : (
                      <SignInButton mode="modal">
                        <button className="text-white/90 hover:text-white transition-colors">
                          Sign in
                        </button>
                      </SignInButton>
                    )}
                  </div>
                </div>
              </div>
            </nav>
            <div className="pt-16 h-[calc(100vh-4rem)]">
              <ManualEntryChat />
            </div>
          </div>
        } />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <div>Admin Dashboard Content</div>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedAdminRoute>
              <div>User Management Content</div>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedAdminRoute>
              <div>Settings Content</div>
            </ProtectedAdminRoute>
          }
        />
      </Routes>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80"
      />

      {/* Choice Dialog */}
      {showChoiceDialog && (
        <ChoiceDialog
          onClose={() => setShowChoiceDialog(false)}
          onWithForm16={handleWithForm16}
          onWithoutForm16={handleWithoutForm16}
        />
      )}

      {/* Footer */}
      <footer className={`${
        isDark ? 'bg-purple-900/30' : 'bg-white/10'
      } backdrop-blur-xl border-t ${
        isDark ? 'border-purple-500/20' : 'border-white/10'
      } py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Products</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white">Payments</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Billing</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Connect</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white">About</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Customers</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Newsletter</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-center text-white/70 text-sm">
              © 2025 TaxSarthi, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;