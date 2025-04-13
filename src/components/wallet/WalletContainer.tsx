
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserReward } from '@/utils/challenge/rewards/types';
import { calculateLevel, calculateProgress } from '@/components/wallet/WalletUtils';
import WalletHeader from '@/components/wallet/WalletHeader';
import RewardDialog from '@/components/wallet/RewardDialog';
import WalletTabs from './WalletTabs';
import { WalletData } from '@/hooks/useWalletData';

interface WalletContainerProps {
  walletData: WalletData;
  rewards: any[];
  userRewards: UserReward[];
  boostedChallenges: any[];
  selectedReward: UserReward | null;
  rewardDialogOpen: boolean;
  setRewardDialogOpen: (open: boolean) => void;
  handleClaimReward: (rewardId: string, xpRequired: number) => Promise<void>;
  openRewardDetails: (reward: UserReward) => void;
  handleClaimChallengeReward: (reward: UserReward) => Promise<void>;
  handleGenerateQRCode: (reward: UserReward) => void;
}

const WalletContainer: React.FC<WalletContainerProps> = ({
  walletData,
  rewards,
  userRewards,
  boostedChallenges,
  selectedReward,
  rewardDialogOpen,
  setRewardDialogOpen,
  handleClaimReward,
  openRewardDetails,
  handleClaimChallengeReward,
  handleGenerateQRCode
}) => {
  const navigate = useNavigate();
  
  const level = calculateLevel(walletData.xp_total);
  const progress = calculateProgress(walletData.xp_total);
  const nextLevelXP = level * 1000;

  const navigateToReward = (reward: UserReward) => {
    if (reward.claimUrl) {
      if (reward.claimUrl.startsWith('http')) {
        window.open(reward.claimUrl, '_blank');
      } else {
        navigate(reward.claimUrl);
      }
    }
    setRewardDialogOpen(false);
  };

  return (
    <div className="container py-8">
      <WalletHeader 
        walletData={walletData}
        userRewards={userRewards}
        level={level}
        progress={progress}
        nextLevelXP={nextLevelXP}
        boostedChallenges={boostedChallenges}
      />
      
      <WalletTabs 
        walletData={walletData}
        userRewards={userRewards}
        rewards={rewards}
        level={level}
        onClaimReward={handleClaimReward}
        onOpenRewardDetails={openRewardDetails}
        onGenerateQRCode={handleGenerateQRCode}
      />

      <RewardDialog
        reward={selectedReward}
        open={rewardDialogOpen}
        onOpenChange={setRewardDialogOpen}
        onClaim={handleClaimChallengeReward}
        onNavigate={navigateToReward}
        onGenerateQRCode={handleGenerateQRCode}
      />
    </div>
  );
};

export default WalletContainer;
