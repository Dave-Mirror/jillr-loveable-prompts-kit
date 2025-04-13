
import React from 'react';
import ProfileSettings from '../ProfileSettings';

interface SettingsTabProps {
  userProfile: any;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ userProfile }) => {
  return <ProfileSettings userProfile={userProfile} />;
};

export default SettingsTab;
