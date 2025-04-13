
import React from 'react';
import ChallengeActivity from '../ChallengeActivity';

interface ActivityTabProps {
  userProfile: any;
}

const ActivityTab: React.FC<ActivityTabProps> = ({ userProfile }) => {
  return <ChallengeActivity userProfile={userProfile} />;
};

export default ActivityTab;
