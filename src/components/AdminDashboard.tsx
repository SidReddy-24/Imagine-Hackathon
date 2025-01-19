import React, { useState, useEffect } from 'react';
import { DataTable } from './DataTable';
import { UserActivity } from './UserActivity';
import { Database, Users, Activity, Settings, Search } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  submissionDate: Date;
  formType: 'form16' | 'manual';
  taxableIncome: number;
  status: 'pending' | 'processed' | 'rejected';
  documents: {
    bankStatement?: string;
    payslips?: string[];
    investments?: string[];
  };
}

interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  timestamp: Date;
  location: string;
  ipAddress: string;
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'users' | 'activity' | 'settings'>('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState<UserData[]>([]);
  const [activityData, setActivityData] = useState<UserActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from your database
    fetchUserData();
    fetchActivityData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Replace with your actual API call
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchActivityData = async () => {
    try {
      // Replace with your actual API call
      const response = await fetch('/api/admin/activity');
      const data = await response.json();
      setActivityData(data);
    } catch (error) {
      console.error('Error fetching activity data:', error);
    }
  };

  const handleUpdateUserData = async (userId: string, updates: Partial<UserData>) => {
    try {
      // Replace with your actual API call
      await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      // Refresh data
      fetchUserData();
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 overflow-hidden">
          {/* Admin Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setActiveTab('users')}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'users' 
                    ? 'bg-purple-500 text-white' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Database className="h-5 w-5 mr-2" />
                User Data
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'activity' 
                    ? 'bg-purple-500 text-white' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Activity className="h-5 w-5 mr-2" />
                User Activity
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'settings' 
                    ? 'bg-purple-500 text-white' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {activeTab === 'users' && (
              <DataTable 
                data={userData}
                isLoading={isLoading}
                onUpdateData={handleUpdateUserData}
                searchTerm={searchTerm}
              />
            )}
            {activeTab === 'activity' && (
              <UserActivity 
                data={activityData}
                isLoading={isLoading}
                searchTerm={searchTerm}
              />
            )}
            {activeTab === 'settings' && (
              <div className="text-white">
                {/* Add settings content */}
                Settings content coming soon...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 