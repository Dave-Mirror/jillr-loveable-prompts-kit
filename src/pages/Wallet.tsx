import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { groupRewardsByType } from '@/utils/challenge/rewards/formatters';
import { calculateLevel, calculateProgress } from '@/components/wallet/WalletUtils';
import { UserReward } from '@/utils/challenge/rewards/types';
import WalletHeader from '@/components/wallet/WalletHeader';
import ChallengeRewardsTab from '@/components/wallet/ChallengeRewardsTab';
import ClaimedRewardsTab from '@/components/wallet/ClaimedRewardsTab';
import AvailableRewardsTab from '@/components/wallet/AvailableRewardsTab';
import RewardDialog from '@/components/wallet/RewardDialog';
import EmptyState from '@/components/wallet/EmptyState';
import LoadingState from '@/components/wallet/LoadingState';
import { useToast } from '@/hooks/use-toast';
import { useWalletData } from '@/hooks/useWalletData';
import { claimReward, claimChallengeReward } from '@/services/walletService';

const Wallet = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedReward, setSelectedReward] = useState<UserReward | null>(null);
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);
  
  const { 
    walletData, 
    isLoading,
    rewards,
    userRewards, 
    setUserRewards,
    setWalletData
  } = useWalletData();

  const handleClaimReward = async (rewardId: string, xpRequired: number) => {
    if (!user || !walletData) return;
    
    try {
      const result = await claimReward(user.id, rewardId, xpRequired, walletData);
      
      if (!result.success) {
        if (result.reason === 'not_enough_xp') {
          toast({
            title: "Nicht genug XP",
            description: `Du benötigst ${xpRequired} XP um diese Belohnung freizuschalten.`,
            variant: "destructive"
          });
        }
        return;
      }
      
      if (result.updatedWalletData) {
        setWalletData(result.updatedWalletData);
      }
      
      const updatedRewards = rewards.map(reward => 
        reward.id === rewardId 
          ? { ...reward, isClaimed: true } 
          : reward
      );
      
      toast({
        title: "Belohnung eingelöst!",
        description: `Du hast erfolgreich die Belohnung "${rewards.find(r => r.id === rewardId)?.name}" eingelöst.`,
      });
      
    } catch (error) {
      console.error('Error claiming reward:', error);
      toast({
        title: "Fehler",
        description: "Die Belohnung konnte nicht eingelöst werden.",
        variant: "destructive"
      });
    }
  };

  const openRewardDetails = (reward: UserReward) => {
    setSelectedReward(reward);
    setRewardDialogOpen(true);
  };

  const handleClaimChallengeReward = async (reward: UserReward) => {
    if (!user || reward.claimed) return;

    try {
      const success = await claimChallengeReward(user.id, reward);
      
      if (success) {
        setUserRewards(userRewards.map(r => 
          r.id === reward.id ? { ...r, claimed: true } : r
        ));
        
        toast({
          title: "Belohnung beansprucht!",
          description: `Du hast erfolgreich "${reward.name}" beansprucht.`,
        });
        
        setRewardDialogOpen(false);
      }
      
    } catch (error) {
      console.error('Error claiming challenge reward:', error);
      toast({
        title: "Fehler",
        description: "Die Belohnung konnte nicht beansprucht werden.",
        variant: "destructive"
      });
    }
  };

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

  if (isLoading) {
    return <LoadingState />;
  }

  if (!walletData) {
    return <EmptyState />;
  }

  const level = calculateLevel(walletData.xp_total);
  const progress = calculateProgress(walletData.xp_total);
  const nextLevelXP = level * 1000;

  const groupedRewards = groupRewardsByType(userRewards);

  return (
    <div className="container py-8">
      <WalletHeader 
        walletData={walletData}
        userRewards={userRewards}
        level={level}
        progress={progress}
        nextLevelXP={nextLevelXP}
      />
      
      <Tabs defaultValue="challenge-rewards" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="challenge-rewards">Challenge Belohnungen</TabsTrigger>
          <TabsTrigger value="available">Level Belohnungen</TabsTrigger>
          <TabsTrigger value="claimed">Eingelöste Belohnungen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="challenge-rewards">
          <ChallengeRewardsTab
            groupedRewards={groupedRewards}
            onOpenRewardDetails={openRewardDetails}
          />
        </TabsContent>
        
        <TabsContent value="available">
          <AvailableRewardsTab
            rewards={rewards}
            walletData={walletData}
            onClaimReward={handleClaimReward}
          />
        </TabsContent>
        
        <TabsContent value="claimed">
          <ClaimedRewardsTab
            rewards={rewards}
            userRewards={userRewards}
            onOpenRewardDetails={openRewardDetails}
          />
        </TabsContent>
      </Tabs>

      <RewardDialog
        reward={selectedReward}
        open={rewardDialogOpen}
        onOpenChange={setRewardDialogOpen}
        onClaim={handleClaimChallengeReward}
        onNavigate={navigateToReward}
      />
    </div>
  );
};

export default Wallet;
