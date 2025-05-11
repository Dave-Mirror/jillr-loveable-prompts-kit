
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import UnifiedDashboard from '@/components/dashboard/UnifiedDashboard';

const Dashboard = () => {
  const { user, userProfile, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl mb-4">Dashboard wird geladen...</h2>
            <div className="w-8 h-8 border-4 border-t-jillr-neonPurple rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return <UnifiedDashboard />;
};

export default Dashboard;
