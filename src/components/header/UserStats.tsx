
import React from 'react';
import { Zap, Coins, Award } from 'lucide-react';

interface UserStatsProps {
  userProfile: any;
}

const UserStats: React.FC<UserStatsProps> = ({ userProfile }) => {
  return (
    <div className="hidden md:flex items-center gap-3">
      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-jillr-darkBlue/50">
        <Zap size={16} className="text-jillr-neonPurple" />
        <span className="text-sm font-medium">{userProfile?.xp || 0} XP</span>
      </div>
      
      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-jillr-darkBlue/50">
        <Coins size={16} className="text-jillr-neonGreen" />
        <span className="text-sm font-medium">{userProfile?.coins || 0}</span>
      </div>
      
      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-jillr-darkBlue/50">
        <Award size={16} className="text-jillr-neonPink" />
        <span className="text-sm font-medium">Lvl {userProfile?.level || 1}</span>
      </div>
    </div>
  );
};

export default UserStats;
