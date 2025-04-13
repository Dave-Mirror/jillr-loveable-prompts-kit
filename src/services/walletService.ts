
import { supabase } from '@/integrations/supabase/client';
import { UserReward } from '@/utils/challenge/rewards/types';

export const claimReward = async (
  userId: string, 
  rewardId: string, 
  xpRequired: number, 
  currentWalletData: any
) => {
  if (!userId || !currentWalletData) return false;
  
  if (currentWalletData.xp_total < xpRequired) {
    return { success: false, reason: 'not_enough_xp' };
  }
  
  const updatedRewardsClaimed = Array.isArray(currentWalletData.rewards_claimed) 
    ? [...currentWalletData.rewards_claimed, rewardId] 
    : [rewardId];
  
  const { error } = await supabase
    .from('wallets')
    .update({ rewards_claimed: updatedRewardsClaimed })
    .eq('user_id', userId);
    
  if (error) throw error;
  
  return { 
    success: true, 
    updatedWalletData: {
      ...currentWalletData,
      rewards_claimed: updatedRewardsClaimed
    }
  };
};

export const claimChallengeReward = async (
  userId: string, 
  reward: UserReward
) => {
  if (!userId || reward.claimed) return false;

  const rewardKey = reward.challengeId ? `${reward.challengeId}-${reward.type}` : reward.id;
  
  const { data: wallet } = await supabase
    .from('wallets')
    .select('rewards_claimed')
    .eq('user_id', userId)
    .single();
  
  const currentClaimed = Array.isArray(wallet?.rewards_claimed) ? wallet.rewards_claimed : [];
  const updatedClaimed = [...currentClaimed, rewardKey];
  
  const { error } = await supabase
    .from('wallets')
    .update({ rewards_claimed: updatedClaimed })
    .eq('user_id', userId);
    
  if (error) throw error;
  
  return true;
};
