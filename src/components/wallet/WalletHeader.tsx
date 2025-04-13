
import React from 'react';
import HeaderTitle from './header/HeaderTitle';
import CardsGrid from './header/CardsGrid';
import BoostedChallengesAlert from './header/BoostedChallengesAlert';
import { UserReward } from '@/utils/challenge/rewards/types';

interface WalletHeaderProps {
  walletData: {
    xp_total: number;
    coins_total: number;
    rewards_claimed: any[];
  };
  userRewards: any[];
  level: number;
  progress: number;
  nextLevelXP: number;
  boostedChallenges?: {
    id: string;
    title: string;
    xpMultiplier: number;
  }[];
}

const WalletHeader: React.FC<WalletHeaderProps> = ({ 
  walletData, 
  userRewards, 
  level, 
  progress, 
  nextLevelXP,
  boostedChallenges = []
}) => {
  return (
    <>
      <HeaderTitle level={level} />
      
      <CardsGrid 
        xpTotal={walletData.xp_total}
        coinsTotal={walletData.coins_total}
        userRewards={userRewards}
        level={level}
        progress={progress}
        nextLevelXP={nextLevelXP}
      />
      
      <BoostedChallengesAlert boostedChallenges={boostedChallenges} />
    </>
  );
};

export default WalletHeader;
