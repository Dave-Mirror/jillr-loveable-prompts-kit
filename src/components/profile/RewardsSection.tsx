
import React from 'react';
import { RewardsProvider } from './rewards/RewardsContext';
import LevelProgress from './rewards/LevelProgress';
import RewardTabs from './rewards/RewardTabs';
import RewardStats from './rewards/RewardStats';
import RewardDialog from './rewards/RewardDialog';
import { availableRewards, claimedRewards, streakData } from './rewards/mockRewardData';
import { useRewards } from './rewards/RewardsContext';
import { useNavigate } from 'react-router-dom';

// Inner component that uses the RewardsContext
const RewardsSectionContent: React.FC = () => {
  const { 
    userRewards, 
    groupedRewards, 
    isLoading, 
    openRewardDetails,
    selectedReward,
    rewardDialogOpen,
    closeRewardDialog,
    claimChallengeReward,
    navigateToReward
  } = useRewards();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <LevelProgress />
        
        <RewardTabs 
          userRewards={userRewards}
          groupedRewards={groupedRewards}
          isLoading={isLoading}
          availableRewards={availableRewards}
          claimedRewards={claimedRewards}
          openRewardDetails={openRewardDetails}
          navigate={navigate}
        />
      </div>
      
      <RewardStats streakData={streakData} />

      <RewardDialog 
        selectedReward={selectedReward} 
        open={rewardDialogOpen}
        onOpenChange={closeRewardDialog}
        onClaimReward={claimChallengeReward}
        onNavigateToReward={navigateToReward}
      />
    </div>
  );
};

// Main wrapper component that provides the RewardsContext
interface RewardsSectionProps {
  userProfile: any;
}

const RewardsSection: React.FC<RewardsSectionProps> = ({ userProfile }) => {
  return (
    <RewardsProvider userProfile={userProfile}>
      <RewardsSectionContent />
    </RewardsProvider>
  );
};

export default RewardsSection;
