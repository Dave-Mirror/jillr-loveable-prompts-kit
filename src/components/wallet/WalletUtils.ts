
import { UserReward } from "@/utils/challenge/rewards/types";

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

// Calculate rank change by comparing previous and current ranks
export const calculateRankChange = (previousRank: number, currentRank: number): number => {
  // Positive value means ranking improved (moved up on the leaderboard)
  // Negative value means ranking got worse (moved down on the leaderboard)
  // Lower rank number is better (rank 1 is higher than rank 2)
  return previousRank - currentRank;
};

// Determine badge tier based on XP
export const determineBadgeTier = (xp: number): string => {
  if (xp >= 10000) return 'diamond';
  if (xp >= 5000) return 'platinum';
  if (xp >= 2500) return 'gold';
  if (xp >= 1000) return 'silver';
  return 'bronze';
};

// Determine if user is in top percentage
export const isInTopPercentage = (rank: number, totalUsers: number, percentage: number): boolean => {
  const topCount = Math.ceil(totalUsers * (percentage / 100));
  return rank <= topCount;
};

// Calculate XP needed for next level
export const xpForNextLevel = (currentXP: number): number => {
  const currentLevel = calculateLevel(currentXP);
  return currentLevel * 1000;
};

// Format large numbers with K/M suffix
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

