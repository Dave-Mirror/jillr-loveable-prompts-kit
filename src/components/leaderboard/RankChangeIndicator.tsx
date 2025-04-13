
import React from 'react';
import { ChevronUp, ChevronDown, Minus } from 'lucide-react';

interface RankChangeIndicatorProps {
  change: number;
  className?: string;
}

const RankChangeIndicator: React.FC<RankChangeIndicatorProps> = ({ change, className }) => {
  if (change === 0) {
    return (
      <div className={`flex items-center text-muted-foreground ${className}`}>
        <Minus className="h-3 w-3 mr-1" />
        <span className="text-xs">0</span>
      </div>
    );
  }

  if (change > 0) {
    return (
      <div className={`flex items-center text-green-500 ${className}`}>
        <ChevronUp className="h-3 w-3 mr-1" />
        <span className="text-xs">{change}</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center text-red-500 ${className}`}>
      <ChevronDown className="h-3 w-3 mr-1" />
      <span className="text-xs">{Math.abs(change)}</span>
    </div>
  );
};

export default RankChangeIndicator;
