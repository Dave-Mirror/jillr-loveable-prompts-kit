
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Zap, Users, Star } from 'lucide-react';

interface ChallengeStatsProps {
  xpReward: number;
}

const ChallengeStats: React.FC<ChallengeStatsProps> = ({ xpReward }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPink text-white text-xs font-bold shadow-glow-purple border border-white/30">
        <Zap className="h-3.5 w-3.5" />
        <span>+{xpReward} XP</span>
      </div>
      
      <div className="flex items-center gap-3 text-xs text-[var(--txt-dim)]">
        <div className="flex items-center gap-1">
          <Users size={12} className="text-jillr-neonCyan" />
          <span>124</span>
        </div>
        <div className="flex items-center gap-1">
          <Star size={12} className="text-jillr-neonPink" />
          <span>4.8</span>
        </div>
      </div>
    </div>
  );
};

export default ChallengeStats;
