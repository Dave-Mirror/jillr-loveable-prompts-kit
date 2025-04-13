
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserReward } from '@/utils/challenge/rewards/types';
import { getUserRewards } from '@/utils/challenge/rewards/api';
import { groupRewardsByType } from '@/utils/challenge/rewards/formatters';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface RewardsContextType {
  userRewards: UserReward[];
  groupedRewards: Record<string, UserReward[]>;
  selectedReward: UserReward | null;
  rewardDialogOpen: boolean;
  isLoading: boolean;
  openRewardDetails: (reward: UserReward) => void;
  closeRewardDialog: () => void;
  claimChallengeReward: (reward: UserReward) => Promise<void>;
  navigateToReward: (reward: UserReward) => void;
}

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export const RewardsProvider: React.FC<{ userProfile: any; children: React.ReactNode }> = ({ 
  userProfile,
  children
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [userRewards, setUserRewards] = useState<UserReward[]>([]);
  const [selectedReward, setSelectedReward] = useState<UserReward | null>(null);
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const closeRewardDialog = () => {
    setRewardDialogOpen(false);
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
  const groupedRewards = groupRewardsByType(userRewards);

  const value = {
    userRewards,
    groupedRewards,
    selectedReward,
    rewardDialogOpen,
    isLoading,
    openRewardDetails,
    closeRewardDialog,
    claimChallengeReward,
    navigateToReward
  };

  return (
    <RewardsContext.Provider value={value}>
      {children}
    </RewardsContext.Provider>
  );
};

export const useRewards = () => {
  const context = useContext(RewardsContext);
  if (context === undefined) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return context;
};
