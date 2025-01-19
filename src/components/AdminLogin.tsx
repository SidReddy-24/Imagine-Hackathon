import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IndianRupee, Lock, User } from 'lucide-react';

const AUTHORIZED_ADMINS = [
  "Siddharth Reddy",
  "Sahil Kadam",
  "Amitabh Morey"
];

const ADMIN_PASSWORD = "imaginehackathon25";

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!AUTHORIZED_ADMINS.includes(username)) {
      setError('Unauthorized user. Access denied.');
      return;
    }

    if (password !== ADMIN_PASSWORD) {
      setError('Invalid password.');
      return;
    }

    // Store admin session
    sessionStorage.setItem('adminUser', username);
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-xl shadow-2xl w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <IndianRupee className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Admin Access Portal</h2>
          <p className="text-white/70 mt-2">Restricted access for authorized personnel only</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-white text-sm text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2 text-sm">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/10 border border-white/10 text-white rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-white/30"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white mb-2 text-sm">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/10 text-white rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-white/30"
                placeholder="Enter admin password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors font-medium"
          >
            Access Admin Portal
          </button>
        </form>
      </div>
    </div>
  );
} 