
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { getUserRewards, getSampleRewards, UserReward } from '@/utils/challenge/userRewards';
import { useNavigate } from 'react-router-dom';

// Import components
import WalletHeader from '@/components/wallet/WalletHeader';
import LoadingState from '@/components/wallet/LoadingState';
import EmptyState from '@/components/wallet/EmptyState';
import RewardDialog from '@/components/wallet/RewardDialog';
import ChallengeRewardsTab from '@/components/wallet/ChallengeRewardsTab';
import AvailableRewardsTab from '@/components/wallet/AvailableRewardsTab';
import ClaimedRewardsTab from '@/components/wallet/ClaimedRewardsTab';
import { calculateLevel, calculateProgress, groupRewardsByType } from '@/components/wallet/WalletUtils';

const Wallet = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [walletData, setWalletData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rewards, setRewards] = useState<any[]>([]);
  const [userRewards, setUserRewards] = useState<UserReward[]>([]);
  const [selectedReward, setSelectedReward] = useState<UserReward | null>(null);
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);

  useEffect(() => {
    const fetchWalletData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('wallets')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        
        setWalletData(data || { xp_total: 0, coins_total: 0, rewards_claimed: [] });
        
        const xp = data?.xp_total || 0;
        const claimedRewards = Array.isArray(data?.rewards_claimed) ? data?.rewards_claimed : [];
        
        const availableRewards = [
          {
            id: 'coupon',
            name: 'Gutschein',
            description: '20% Rabatt auf deinen nächsten Einkauf',
            xpRequired: 2000,
            isClaimed: Array.isArray(claimedRewards) && claimedRewards.includes('coupon'),
            isUnlocked: xp >= 2000
          },
          {
            id: 'product',
            name: 'Exklusiver Produkt-Drop',
            description: 'Zugang zum neuesten Produkt vor allen anderen',
            xpRequired: 5000,
            isClaimed: Array.isArray(claimedRewards) && claimedRewards.includes('product'),
            isUnlocked: xp >= 5000
          },
          {
            id: 'vip',
            name: 'VIP-Event-Zugang',
            description: 'Exklusiver Zugang zu unserem nächsten Event',
            xpRequired: 10000,
            isClaimed: Array.isArray(claimedRewards) && claimedRewards.includes('vip'),
            isUnlocked: xp >= 10000
          }
        ];
        
        setRewards(availableRewards);

        // Fetch user challenge rewards
        const userChallengeRewards = await getUserRewards(user.id);
        
        // If we have no rewards, add some sample ones (for development)
        if (userChallengeRewards.length === 0) {
          setUserRewards(getSampleRewards());
        } else {
          setUserRewards(userChallengeRewards);
        }

      } catch (error) {
        console.error('Error fetching wallet data:', error);
        toast({
          title: "Fehler",
          description: "Deine Wallet-Daten konnten nicht geladen werden.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletData();
  }, [user, toast]);

  const claimReward = async (rewardId: string, xpRequired: number) => {
    if (!user || !walletData) return;
    
    try {
      if (walletData.xp_total < xpRequired) {
        toast({
          title: "Nicht genug XP",
          description: `Du benötigst ${xpRequired} XP um diese Belohnung freizuschalten.`,
          variant: "destructive"
        });
        return;
      }
      
      const updatedRewardsClaimed = Array.isArray(walletData.rewards_claimed) 
        ? [...walletData.rewards_claimed, rewardId] 
        : [rewardId];
      
      const { error } = await supabase
        .from('wallets')
        .update({ rewards_claimed: updatedRewardsClaimed })
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      setWalletData({
        ...walletData,
        rewards_claimed: updatedRewardsClaimed
      });
      
      setRewards(rewards.map(reward => 
        reward.id === rewardId 
          ? { ...reward, isClaimed: true } 
          : reward
      ));
      
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

  const claimChallengeReward = async (reward: UserReward) => {
    if (!user || reward.claimed) return;

    try {
      // Mark reward as claimed
      const rewardKey = reward.challengeId ? `${reward.challengeId}-${reward.type}` : reward.id;
      
      const { data: wallet } = await supabase
        .from('wallets')
        .select('rewards_claimed')
        .eq('user_id', user.id)
        .single();
      
      const currentClaimed = Array.isArray(wallet?.rewards_claimed) ? wallet.rewards_claimed : [];
      const updatedClaimed = [...currentClaimed, rewardKey];
      
      const { error } = await supabase
        .from('wallets')
        .update({ rewards_claimed: updatedClaimed })
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      // Update UI
      setUserRewards(userRewards.map(r => 
        r.id === reward.id ? { ...r, claimed: true } : r
      ));
      
      toast({
        title: "Belohnung beansprucht!",
        description: `Du hast erfolgreich "${reward.name}" beansprucht.`,
      });
      
      // Close dialog
      setRewardDialogOpen(false);
      
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
      // For external URLs
      if (reward.claimUrl.startsWith('http')) {
        window.open(reward.claimUrl, '_blank');
      } else {
        // For internal routes
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

  // Group rewards by type
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
            onClaimReward={claimReward}
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

      {/* Reward Detail Dialog */}
      <RewardDialog
        reward={selectedReward}
        open={rewardDialogOpen}
        onOpenChange={setRewardDialogOpen}
        onClaim={claimChallengeReward}
        onNavigate={navigateToReward}
      />
    </div>
  );
};

export default Wallet;
