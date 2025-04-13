
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

// This function has been moved to formatters.ts to avoid duplication
// Removed groupRewardsByType function from here since it already exists in formatters.ts
