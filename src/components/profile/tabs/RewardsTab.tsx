
import React from 'react';
import RewardsSection from '../RewardsSection';

interface RewardsTabProps {
  userProfile: any;
}

const RewardsTab: React.FC<RewardsTabProps> = ({ userProfile }) => {
  return <RewardsSection userProfile={userProfile} />;
};

export default RewardsTab;
