
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface LevelProgressBarProps {
  currentLevel: number;
  currentXP: number;
  nextLevelXP: number;
  progress: number;
}

const LevelProgressBar: React.FC<LevelProgressBarProps> = ({
  currentLevel,
  currentXP,
  nextLevelXP,
  progress
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs">Level {currentLevel}</span>
        <span className="text-xs">Level {currentLevel + 1}</span>
      </div>
      <Progress value={progress} className="h-2" indicatorClassName="bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPink" />
      <p className="text-xs text-muted-foreground text-center">
        {nextLevelXP - currentXP} XP needed for next level
      </p>
    </div>
  );
};

export default LevelProgressBar;
