
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCreatorData } from '@/hooks/useCreatorData';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardLoading from '@/components/dashboard/DashboardLoading';
import StatCards from '@/components/dashboard/StatCards';
import DashboardTabs from '@/components/dashboard/DashboardTabs';

const CreatorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { myChallenges, products, dashboardStats, isLoading } = useCreatorData(user?.id);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth', { state: { from: '/creator-dashboard' } });
    }
  }, [user, navigate]);

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
