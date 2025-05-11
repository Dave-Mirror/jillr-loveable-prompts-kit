
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useCreatorData } from '@/hooks/useCreatorData';
import StatCards from '@/components/dashboard/StatCards';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import DashboardLoading from '@/components/dashboard/DashboardLoading';

const CreatorDashboardContent = () => {
  const { user } = useAuth();
  const { myChallenges, products, dashboardStats, isLoading } = useCreatorData(user?.id || 'demo-user');

  if (isLoading) {
    return <DashboardLoading />;
  }

  return (
    <div>
      <StatCards stats={dashboardStats} />
      <DashboardTabs 
        challenges={myChallenges} 
        products={products} 
        stats={dashboardStats}
      />
    </div>
  );
};

export default CreatorDashboardContent;
