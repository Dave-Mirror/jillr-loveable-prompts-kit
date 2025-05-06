
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RewardsSection from '../RewardsSection';

interface RewardsTabProps {
  userProfile: any;
  isOwnProfile: boolean;
}

const RewardsTab: React.FC<RewardsTabProps> = ({ userProfile, isOwnProfile }) => {
  if (!isOwnProfile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Creator Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-6">
            This creator's rewards are private. Only they can see their rewards.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return <RewardsSection userProfile={userProfile} />;
};

export default RewardsTab;
