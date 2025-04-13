
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useCreatorData } from '@/hooks/useCreatorData';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardLoading from '@/components/dashboard/DashboardLoading';
import StatCards from '@/components/dashboard/StatCards';
import DashboardTabs from '@/components/dashboard/DashboardTabs';

const CreatorDashboard = () => {
  const { user } = useAuth();
  const { myChallenges, products, dashboardStats, isLoading } = useCreatorData(user?.id || 'demo-user');

  if (isLoading) {
    return <DashboardLoading />;
  }

  return (
    <div className="container py-8">
      <DashboardHeader />
      <StatCards stats={dashboardStats} />
      <DashboardTabs 
        challenges={myChallenges} 
        products={products} 
        stats={dashboardStats} 
      />
    </div>
  );
};

export default CreatorDashboard;
