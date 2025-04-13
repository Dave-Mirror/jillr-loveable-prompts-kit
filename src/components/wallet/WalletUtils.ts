
import { UserReward } from "@/utils/challenge/userRewards";

// Calculate user level based on XP
export const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 1000) + 1;
};

// Calculate progress to next level
export const calculateProgress = (xp: number): number => {
  const currentLevel = calculateLevel(xp);
  const previousLevelXP = (currentLevel - 1) * 1000;
  const nextLevelXP = currentLevel * 1000;
  return Math.floor(((xp - previousLevelXP) / (nextLevelXP - previousLevelXP)) * 100);
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
