
import React from 'react';

type NextBadgeProgressProps = {
  icon: string;
  name: string;
  currentXP: number;
  requiredXP: number;
};

const NextBadgeProgress = ({ icon, name, currentXP, requiredXP }: NextBadgeProgressProps) => {
  const progressPercentage = Math.min(Math.round((currentXP / requiredXP) * 100), 100);
  
  return (
    <div className="mt-4 p-3 bg-muted rounded-lg">
      <h4 className="text-sm font-medium mb-2">Your next badge</h4>
      <div className="flex items-center gap-3">
        <div className="text-xl">{icon}</div>
        <div>
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs text-muted-foreground">
            {currentXP.toLocaleString()} / {requiredXP.toLocaleString()} XP
          </div>
          <div className="w-full bg-background rounded-full h-1.5 mt-1">
            <div 
              className="bg-jillr-neonPurple h-1.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextBadgeProgress;
