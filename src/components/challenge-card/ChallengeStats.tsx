
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Zap, Users, Star } from 'lucide-react';

interface ChallengeStatsProps {
  xpReward: number;
}

const ChallengeStats: React.FC<ChallengeStatsProps> = ({ xpReward }) => {
  return (
    <div className="flex items-center justify-between">
      <Badge variant="outline" className="bg-jillr-neonPurple/10 border-jillr-neonPurple/30 text-jillr-neonPurple flex items-center gap-1.5 px-2.5 py-1">
        <Zap className="h-3.5 w-3.5" />
        <span className="font-medium">{xpReward} XP</span>
      </Badge>
      
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <Users size={12} />
          <span>124</span>
        </div>
        <div className="flex items-center gap-1">
          <Star size={12} />
          <span>4.8</span>
        </div>
      </div>
    </div>
  );
};

export default ChallengeStats;
