
import React from 'react';
import { RewardsProvider } from '../rewards/RewardsContext';
import RewardsSection from '../RewardsSection';

interface RewardsTabProps {
  userProfile: any;
}

const RewardsTab: React.FC<RewardsTabProps> = ({ userProfile }) => {
  // Wrap the RewardsSection with the RewardsProvider to provide context
  return (
    <RewardsProvider userProfile={userProfile}>
      <RewardsSection userProfile={userProfile} />
    </RewardsProvider>
  );
};

export default RewardsTab;
