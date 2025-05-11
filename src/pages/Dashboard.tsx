
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import UnifiedDashboard from '@/components/dashboard/UnifiedDashboard';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user, userProfile, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  
  // Debug info
  useEffect(() => {
    console.log("Dashboard component - Auth state:", {
      isLoading,
      hasUser: !!user,
      userProfile
    });
    
    // Simulate successful loading for demonstration
    if (!user && !isLoading) {
      console.log("No user detected but proceeding for demo purposes");
    }
  }, [user, userProfile, isLoading]);

  // Error handling
  useEffect(() => {
    if (error) {
      toast.error("Fehler beim Laden des Dashboards", {
        description: error
      });
    }
  }, [error]);
  
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

  // Always render the dashboard, even if user is not logged in (for demo purposes)
  return <UnifiedDashboard />;
};

export default Dashboard;
