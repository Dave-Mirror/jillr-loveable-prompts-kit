
import React from 'react';
import { cn } from '@/lib/utils';

type BadgeItemProps = {
  icon: string;
  name: string;
  description: string;
  className?: string;
};

const BadgeItem = ({ icon, name, description, className }: BadgeItemProps) => {
  return (
    <div className={cn("flex items-center gap-3 p-2 rounded-lg border border-border", className)}>
      <div className="text-xl">{icon}</div>
      <div className="flex-1">
        <div className="text-sm font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </div>
  );
};

export default BadgeItem;
