
import { Challenge } from '@/components/challenge/types';
import { Reward } from '@/types/dashboard';

/**
 * Get rewards based on challenge type
 */
export const getChallengeRewards = (
  challenge: Challenge | null, 
  rewardsData: Record<string, Reward[]>
): Reward[] => {
  if (!challenge?.type) return rewardsData['default'];
  return rewardsData[challenge.type] || rewardsData['default'];
};
