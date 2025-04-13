
import { supabase } from '@/integrations/supabase/client';
import { rewardsData } from '../../challengeData';
import { Challenge, ChallengeType } from '@/components/challenge/types';
import { UserReward } from './types';
import { formatChallengeReward } from './formatters';

// Get all rewards for a user based on completed challenges
export const getUserRewards = async (userId: string): Promise<UserReward[]> => {
  try {
    // Fetch user's completed challenges
    const { data: userChallenges, error: challengeError } = await supabase
      .from('user_challenges')
      .select(`
        challenge_id,
        status,
        completed_at
      `)
      .eq('user_id', userId)
      .in('status', ['completed', 'verified']);

    if (challengeError) throw challengeError;
    
    if (!userChallenges || userChallenges.length === 0) {
      return [];
    }

    // Get challenge details for completed challenges
    const challengeIds = userChallenges.map(uc => uc.challenge_id);
    const { data: challenges, error: challengesError } = await supabase
      .from('challenges')
      .select('*')
      .in('id', challengeIds);

    if (challengesError) throw challengesError;
    
    // Get claimed rewards from wallet
    const { data: wallet, error: walletError } = await supabase
      .from('wallets')
      .select('rewards_claimed')
      .eq('user_id', userId)
      .single();

    if (walletError && walletError.code !== 'PGRST116') throw walletError;

    const claimedRewards = wallet?.rewards_claimed || [];
    
    // Format rewards from challenges
    let allRewards: UserReward[] = [];
    
    // Process each challenge
    if (challenges) {
      challenges.forEach(challenge => {
        // Get rewards for this challenge type
        const challengeType = challenge.type || 'default';
        const typeRewards = rewardsData[challengeType] || rewardsData['default'];
        
        // Process each reward for this challenge
        typeRewards.forEach(reward => {
          // Determine if this reward has been claimed
          const rewardKey = `${challenge.id}-${reward.type}`;
          const isClaimed = Array.isArray(claimedRewards) && 
                          claimedRewards.some((cr: any) => 
                            typeof cr === 'string' 
                              ? cr === rewardKey
                              : cr.id === rewardKey);
          
          // Create a compliant Challenge object with correct type
          const typedChallenge: Challenge = {
            ...challenge,
            type: (challenge.type || 'default') as ChallengeType,
            status: (challenge.status || 'active') as 'active' | 'completed' | 'draft'
          };
          
          // Add this reward to the list
          allRewards.push(formatChallengeReward(typedChallenge, reward, isClaimed));
        });
      });
    }

    return allRewards;
  } catch (error) {
    console.error('Error fetching user rewards:', error);
    return [];
  }
};
