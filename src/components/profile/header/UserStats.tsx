
import React from 'react';
import { Zap, Award, Coins } from 'lucide-react';

interface UserStatsProps {
  xp: number;
  level: number;
  coins: number;
}

const UserStats: React.FC<UserStatsProps> = ({ xp, level, coins }) => {
  return (
    <div className="flex gap-2">
      <div className="rounded-lg bg-jillr-darkBlue/50 p-3 flex flex-col items-center min-w-20">
        <Zap className="h-5 w-5 text-jillr-neonPurple mb-1" />
        <span className="text-xl font-bold">{xp}</span>
        <span className="text-xs text-muted-foreground">XP</span>
      </div>
      <div className="rounded-lg bg-jillr-darkBlue/50 p-3 flex flex-col items-center min-w-20">
        <Award className="h-5 w-5 text-jillr-neonPink mb-1" />
        <span className="text-xl font-bold">{level}</span>
        <span className="text-xs text-muted-foreground">Level</span>
      </div>
      <div className="rounded-lg bg-jillr-darkBlue/50 p-3 flex flex-col items-center min-w-20">
        <Coins className="h-5 w-5 text-yellow-500 mb-1" />
        <span className="text-xl font-bold">{coins}</span>
        <span className="text-xs text-muted-foreground">Coins</span>
      </div>
    </div>
  );
};

export default UserStats;
