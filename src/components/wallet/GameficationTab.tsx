
import React from 'react';
import { UserReward } from '@/utils/challenge/rewards/types';
import VipStatusCard from './gamification/VipStatusCard';
import VipChallengesCard from './gamification/VipChallengesCard';
import AchievementsCard from './gamification/AchievementsCard';
import LevelBoostCard from './gamification/LevelBoostCard';

interface GameficationTabProps {
  level: number;
  xp: number;
  userRewards: UserReward[];
}

const GameficationTab: React.FC<GameficationTabProps> = ({ level, xp, userRewards }) => {
  return (
    <div className="space-y-8">
      {/* Current Status & Progress */}
      <VipStatusCard level={level} />
      
      {/* VIP Challenges */}
      <VipChallengesCard level={level} />
      
      {/* Achievements */}
      <AchievementsCard userRewards={userRewards} xp={xp} level={level} />
      
      {/* Boost section */}
      <LevelBoostCard />
    </div>
  );
};

export default GameficationTab;
