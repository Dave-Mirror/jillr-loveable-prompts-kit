
import React from 'react';
import XPCard from './XPCard';
import CoinsCard from './CoinsCard';
import RewardsCard from './RewardsCard';
import { UserReward } from '@/utils/challenge/rewards/types';

interface CardsGridProps {
  xpTotal: number;
  coinsTotal: number;
  userRewards: UserReward[];
  level: number;
  progress: number;
  nextLevelXP: number;
}

const CardsGrid: React.FC<CardsGridProps> = ({ 
  xpTotal, 
  coinsTotal, 
  userRewards, 
  level, 
  progress, 
  nextLevelXP 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <XPCard 
        xpTotal={xpTotal} 
        level={level} 
        progress={progress} 
        nextLevelXP={nextLevelXP} 
      />
      
      <CoinsCard coinsTotal={coinsTotal} />
      
      <RewardsCard userRewards={userRewards} />
    </div>
  );
};

export default CardsGrid;
