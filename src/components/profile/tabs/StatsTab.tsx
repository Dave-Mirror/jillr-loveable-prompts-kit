
import React from 'react';
import StatsSection from '../StatsSection';
import CreatorDashboardContent from '@/components/dashboard/dashboards/CreatorDashboardContent';
import BrandDashboardContent from '@/components/dashboard/dashboards/BrandDashboardContent';
import EnterpriseDashboardContent from '@/components/dashboard/dashboards/EnterpriseDashboardContent';

interface StatsTabProps {
  userProfile: any;
  userRole?: string;
}

const StatsTab: React.FC<StatsTabProps> = ({ userProfile, userRole = 'user' }) => {
  return (
    <div className="space-y-8">
      {userRole === 'creator' && <CreatorDashboardContent />}
      {userRole === 'brand' && <BrandDashboardContent />}
      {userRole === 'enterprise' && <EnterpriseDashboardContent />}
      
      <div className="pt-4">
        <StatsSection userProfile={userProfile} />
      </div>
    </div>
  );
};

export default StatsTab;
