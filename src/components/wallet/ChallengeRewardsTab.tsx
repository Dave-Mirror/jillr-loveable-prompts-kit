
import React from 'react';
import { UserReward } from '@/utils/challenge/rewards/types';
import RewardTypeSection from './rewards/RewardTypeSection';
import RewardsEmptyState from './rewards/RewardsEmptyState';

interface ChallengeRewardsTabProps {
  groupedRewards: Record<string, UserReward[]>;
  onOpenRewardDetails: (reward: UserReward) => void;
}

const ChallengeRewardsTab: React.FC<ChallengeRewardsTabProps> = ({ 
  groupedRewards, 
  onOpenRewardDetails 
}) => {
  const hasRewards = Object.keys(groupedRewards).length > 0;

  if (!hasRewards) {
    return <RewardsEmptyState />;
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedRewards).map(([type, typeRewards]) => (
        <RewardTypeSection
          key={type}
          type={type}
          typeRewards={typeRewards}
          onOpenRewardDetails={onOpenRewardDetails}
        />
      ))}
    </div>
  );
};

export default ChallengeRewardsTab;
