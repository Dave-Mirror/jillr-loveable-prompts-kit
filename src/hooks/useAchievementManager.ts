
import { useState } from 'react';

export const useAchievementManager = () => {
  const [showAchievement, setShowAchievement] = useState<string | null>(null);

  // Handle showing achievement details
  const toggleAchievement = (id: string | null) => {
    setShowAchievement(showAchievement === id ? null : id);
  };

  return {
    showAchievement,
    toggleAchievement,
  };
};
