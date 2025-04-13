
import React from 'react';
import SocialMediaConnections from '../SocialMediaConnections';

interface SocialTabProps {
  userProfile: any;
}

const SocialTab: React.FC<SocialTabProps> = ({ userProfile }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SocialMediaConnections userProfile={userProfile} />
    </div>
  );
};

export default SocialTab;
