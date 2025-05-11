
import React from 'react';
import ChallengeActivity from '../ChallengeActivity';
import UserDashboardContent from '@/components/dashboard/dashboards/UserDashboardContent';

interface ActivityTabProps {
  userProfile: any;
  userRole?: string;
}

const ActivityTab: React.FC<ActivityTabProps> = ({ userProfile, userRole = 'user' }) => {
  // For user role, show dashboard content integrated with activity
  if (userRole === 'user') {
    return (
      <div className="space-y-8">
        <UserDashboardContent />
        <div className="pt-4">
          <h2 className="text-xl font-bold mb-4">Deine Challenge Aktivitäten</h2>
          <ChallengeActivity userProfile={userProfile} />
        </div>
      </div>
    );
  }
  
  return <ChallengeActivity userProfile={userProfile} />;
};

export default ActivityTab;
