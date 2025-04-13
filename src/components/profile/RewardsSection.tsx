
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRewards, UserReward, groupRewardsByType } from '@/utils/challenge/userRewards';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Import our new components
import LevelProgress from './rewards/LevelProgress';
import RewardTabs from './rewards/RewardTabs';
import RewardStats from './rewards/RewardStats';
import RewardDialog from './rewards/RewardDialog';

interface RewardsSectionProps {
  userProfile: any;
}

const RewardsSection: React.FC<RewardsSectionProps> = ({ userProfile }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Calculate XP progress to next level
  const currentLevel = userProfile?.level || 1;
  const nextLevelXP = currentLevel * 1000;
  const previousLevelXP = (currentLevel - 1) * 1000;
  const currentXP = userProfile?.xp || 0;
  const progress = Math.min(100, ((currentXP - previousLevelXP) / (nextLevelXP - previousLevelXP)) * 100);

  const [userRewards, setUserRewards] = useState<UserReward[]>([]);
  const [selectedReward, setSelectedReward] = useState<UserReward | null>(null);
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for available rewards - would come from database in real app
  const availableRewards = [
    {
      id: '1',
      name: '20% Off Coupon',
      description: 'Get 20% off your next purchase at Nike',
      requiredLevel: 2,
      isUnlocked: currentLevel >= 2,
      isClaimed: false,
      type: 'coupon'
    },
    {
      id: '2',
      name: 'Early Product Access',
      description: 'Get early access to the latest product releases',
      requiredLevel: 5,
      isUnlocked: currentLevel >= 5,
      isClaimed: false,
      type: 'access'
    },
    {
      id: '3',
      name: 'VIP Event Ticket',
      description: 'Exclusive access to our next in-store event',
      requiredLevel: 10,
      isUnlocked: currentLevel >= 10,
      isClaimed: false,
      type: 'ticket'
    }
  ];
  
  const claimedRewards = [
    {
      id: '4',
      name: 'Free Shipping Coupon',
      description: 'Free shipping on your next order',
      claimedDate: '2023-08-15',
      expireDate: '2023-12-31',
      code: 'FREESHIP2023',
      type: 'coupon'
    }
  ];
  
  // Mock data for streaks
  const streakData = {
    currentStreak: 5,
    bestStreak: 12,
    nextReward: {
      days: 7,
      reward: '50 Coins'
    }
  };

  useEffect(() => {
    const fetchUserRewards = async () => {
      if (!userProfile?.id) return;
      
      try {
        setIsLoading(true);
        const rewards = await getUserRewards(userProfile.id);
        setUserRewards(rewards);
      } catch (error) {
        console.error('Error fetching user rewards:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRewards();
  }, [userProfile?.id]);

  const openRewardDetails = (reward: UserReward) => {
    setSelectedReward(reward);
    setRewardDialogOpen(true);
  };

  const claimChallengeReward = async (reward: UserReward) => {
    if (!userProfile?.id || reward.claimed) return;

    try {
      // Mark reward as claimed
      const rewardKey = reward.challengeId ? `${reward.challengeId}-${reward.type}` : reward.id;
      
      const { data: wallet } = await supabase
        .from('wallets')
        .select('rewards_claimed')
        .eq('user_id', userProfile.id)
        .single();
      
      const currentClaimed = Array.isArray(wallet?.rewards_claimed) ? wallet.rewards_claimed : [];
      const updatedClaimed = [...currentClaimed, rewardKey];
      
      const { error } = await supabase
        .from('wallets')
        .update({ rewards_claimed: updatedClaimed })
        .eq('user_id', userProfile.id);
        
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

  // Group rewards by type for display
  const groupedRewards = userRewards.reduce((acc, reward) => {
    const type = reward.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(reward);
    return acc;
  }, {} as Record<string, UserReward[]>);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <LevelProgress 
          currentLevel={currentLevel}
          currentXP={currentXP}
          progress={progress}
          nextLevelXP={nextLevelXP}
        />
        
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
      
      <RewardStats 
        userProfile={userProfile}
        streakData={streakData}
      />

      <RewardDialog 
        selectedReward={selectedReward} 
        open={rewardDialogOpen}
        onOpenChange={setRewardDialogOpen}
        onClaimReward={claimChallengeReward}
        onNavigateToReward={navigateToReward}
      />
    </div>
  );
};

export default RewardsSection;
