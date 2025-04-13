
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type BadgeItemProps = {
  icon: string | React.ReactNode;
  name: string;
  description: string;
  unlocked?: boolean;
  progress?: number;
  className?: string;
  onClick?: () => void;
};

const BadgeItem = ({ 
  icon, 
  name, 
  description, 
  unlocked = true, 
  progress, 
  className,
  onClick 
}: BadgeItemProps) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-2 rounded-lg border transition-all", 
        unlocked 
          ? "border-border bg-background/50 hover:bg-background/80" 
          : "border-muted bg-muted/30 opacity-70",
        onClick && "cursor-pointer",
        className
      )}
    >
      <div className={cn(
        "text-xl flex items-center justify-center w-10 h-10 rounded-full",
        unlocked ? "text-foreground bg-jillr-neonPurple/20" : "text-muted-foreground bg-muted"
      )}>
        {typeof icon === 'string' ? icon : icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">{name}</div>
          {!unlocked && progress !== undefined && progress > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-xs bg-jillr-neonPurple/10 hover:bg-jillr-neonPurple/20">
                    {Math.round(progress)}%
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your progress toward this badge</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="text-xs text-muted-foreground">{description}</div>
        
        {!unlocked && progress !== undefined && progress > 0 && (
          <div className="w-full bg-background rounded-full h-1 mt-1">
            <div 
              className="bg-jillr-neonPurple h-1 rounded-full" 
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgeItem;
