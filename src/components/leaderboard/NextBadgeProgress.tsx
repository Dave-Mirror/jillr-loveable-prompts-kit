
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type NextBadgeProgressProps = {
  icon: string | React.ReactNode;
  name: string;
  currentXP: number;
  requiredXP: number;
  className?: string;
};

const NextBadgeProgress = ({ 
  icon, 
  name, 
  currentXP, 
  requiredXP,
  className 
}: NextBadgeProgressProps) => {
  const progressPercentage = Math.min(Math.round((currentXP / requiredXP) * 100), 100);
  const remainingXP = Math.max(requiredXP - currentXP, 0);
  
  return (
    <div className={cn("p-3 bg-muted rounded-lg", className)}>
      <h4 className="text-sm font-medium mb-2">Your next badge</h4>
      <div className="flex items-center gap-3">
        <div className={cn(
          "text-xl flex items-center justify-center w-10 h-10 rounded-full",
          progressPercentage < 100 ? "bg-jillr-neonPurple/20" : "bg-jillr-neonPurple text-white"
        )}>
          {typeof icon === 'string' ? icon : icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">{name}</div>
            <Badge variant="outline" className="text-xs bg-jillr-neonPurple/10">
              {progressPercentage}%
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            {currentXP.toLocaleString()} / {requiredXP.toLocaleString()} XP
            {remainingXP > 0 && ` (${remainingXP.toLocaleString()} XP needed)`}
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
