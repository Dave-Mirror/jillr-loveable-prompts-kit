
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useWalletData } from '@/hooks/useWalletData';
import { useWalletActions } from '@/hooks/useWalletActions';
import EmptyState from '@/components/wallet/EmptyState';
import LoadingState from '@/components/wallet/LoadingState';
import WalletContainer from '@/components/wallet/WalletContainer';

const Wallet = () => {
  const { user } = useAuth();
  
  const { 
    walletData, 
    isLoading,
    rewards,
    userRewards, 
    setUserRewards,
    setWalletData,
    boostedChallenges
  } = useWalletData();

  const {
    selectedReward,
    rewardDialogOpen,
    setRewardDialogOpen,
    handleClaimReward,
    openRewardDetails,
    handleClaimChallengeReward,
    handleGenerateQRCode
  } = useWalletActions(
    walletData,
    rewards,
    userRewards,
    setUserRewards,
    setWalletData
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (!walletData || !user) {
    return <EmptyState />;
  }

  return (
    <WalletContainer
      walletData={walletData}
      rewards={rewards}
      userRewards={userRewards}
      boostedChallenges={boostedChallenges}
      selectedReward={selectedReward}
      rewardDialogOpen={rewardDialogOpen}
      setRewardDialogOpen={setRewardDialogOpen}
      handleClaimReward={handleClaimReward}
      openRewardDetails={openRewardDetails}
      handleClaimChallengeReward={handleClaimChallengeReward}
      handleGenerateQRCode={handleGenerateQRCode}
    />
  );
};

export default Wallet;
