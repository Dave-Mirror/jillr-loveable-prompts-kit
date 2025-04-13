
import { Challenge } from '@/components/challenge/types';
import { UserReward } from './types';
import { getRewardImage, getClaimUrl } from './assetUtils';

// Format reward data from challenges
export const formatChallengeReward = (
  challenge: Challenge, 
  reward: any, 
  claimed: boolean = false
): UserReward => {
  const type = reward.type as UserReward['type'];
  const rewardId = `${challenge.id}-${type}-${Math.floor(Math.random() * 10000)}`;
  
  return {
    id: rewardId,
    name: `${challenge.title} - ${type.charAt(0).toUpperCase() + type.slice(1)}`,
    description: reward.description,
    type,
    image: getRewardImage(challenge.type || 'default', type),
    code: `${type.substr(0, 3).toUpperCase()}${Math.floor(10000 + Math.random() * 90000)}`,
    challengeId: challenge.id,
    challengeName: challenge.title,
    unlocked: true,
    claimed,
    claimUrl: getClaimUrl(type),
    expireDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 90 days from now
  };
};

// Group rewards by type
export const groupRewardsByType = (rewards: UserReward[]): Record<string, UserReward[]> => {
  return rewards.reduce((acc, reward) => {
    const type = reward.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(reward);
    return acc;
  }, {} as Record<string, UserReward[]>);
};
