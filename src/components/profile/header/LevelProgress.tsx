
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface LevelProgressProps {
  currentLevel: number;
  currentXP: number;
  nextLevelXP: number;
  previousLevelXP: number;
  progress: number;
}

const LevelProgress: React.FC<LevelProgressProps> = ({ 
  currentLevel, 
  currentXP, 
  nextLevelXP, 
  progress 
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm">Level {currentLevel}</span>
        <span className="text-sm">Level {currentLevel + 1}</span>
      </div>
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-muted-foreground text-center">
        {nextLevelXP - currentXP} XP needed for next level
      </p>
    </div>
  );
};

export default LevelProgress;
