import React from 'react';
import { Clock } from 'lucide-react';

interface UserActivityProps {
  data: any[];
  isLoading: boolean;
  searchTerm: string;
}

export function UserActivity({ data, isLoading, searchTerm }: UserActivityProps) {
  const filteredData = data.filter(item => 
    Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/20 border-t-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredData.map((activity) => (
        <div
          key={activity.id}
          className="bg-white/5 rounded-lg p-4 border border-white/10"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white font-medium">{activity.userName}</p>
              <p className="text-white/70 text-sm">{activity.action}</p>
              <div className="flex items-center mt-2 text-white/50 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {new Date(activity.timestamp).toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-sm">{activity.location}</p>
              <p className="text-white/50 text-sm">{activity.ipAddress}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 