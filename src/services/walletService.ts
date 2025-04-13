
import { supabase } from '@/integrations/supabase/client';
import { UserReward } from '@/utils/challenge/rewards/types';
import { WalletData } from '@/hooks/useWalletData';

export interface ClaimResult {
  success: boolean;
  reason?: string;
  updatedWalletData?: WalletData;
}

export const claimReward = async (
  userId: string, 
  rewardId: string, 
  xpRequired: number, 
  currentWalletData: WalletData
): Promise<ClaimResult> => {
  if (!userId || !currentWalletData) {
    return { success: false, reason: 'invalid_input' };
  }
  
  if (currentWalletData.xp_total < xpRequired) {
    return { success: false, reason: 'not_enough_xp' };
  }
  
  const updatedRewardsClaimed = Array.isArray(currentWalletData.rewards_claimed) 
    ? [...currentWalletData.rewards_claimed, rewardId] 
    : [rewardId];
  
  try {
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
  } catch (error) {
    console.error('Error claiming reward:', error);
    return { success: false, reason: 'database_error' };
  }
};

export const claimChallengeReward = async (
  userId: string, 
  reward: UserReward
): Promise<boolean> => {
  if (!userId || reward.claimed) return false;

  const rewardKey = reward.challengeId ? `${reward.challengeId}-${reward.type}` : reward.id;
  
  try {
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
  } catch (error) {
    console.error('Error claiming challenge reward:', error);
    return false;
  }
};
