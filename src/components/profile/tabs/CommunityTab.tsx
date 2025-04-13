
import React from 'react';
import CommunitySection from '../CommunitySection';

interface CommunityTabProps {
  userProfile: any;
}

const CommunityTab: React.FC<CommunityTabProps> = ({ userProfile }) => {
  return <CommunitySection userProfile={userProfile} />;
};

export default CommunityTab;
