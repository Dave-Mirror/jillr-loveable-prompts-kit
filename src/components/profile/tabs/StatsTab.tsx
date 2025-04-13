
import React from 'react';
import StatsSection from '../StatsSection';

interface StatsTabProps {
  userProfile: any;
}

const StatsTab: React.FC<StatsTabProps> = ({ userProfile }) => {
  return <StatsSection userProfile={userProfile} />;
};

export default StatsTab;
