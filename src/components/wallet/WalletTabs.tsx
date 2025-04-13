
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserReward } from '@/utils/challenge/rewards/types';
import { groupRewardsByType } from '@/utils/challenge/rewards/formatters';
import ChallengeRewardsTab from './ChallengeRewardsTab';
import ClaimedRewardsTab from './ClaimedRewardsTab';
import AvailableRewardsTab from './AvailableRewardsTab';
import GameficationTab from './GameficationTab';
import TransactionHistory from './TransactionHistory';
import { WalletData } from '@/hooks/useWalletData';

interface WalletTabsProps {
  walletData: WalletData;
  userRewards: UserReward[];
  rewards: any[];
  level: number;
  onClaimReward: (rewardId: string, xpRequired: number) => Promise<void>;
  onOpenRewardDetails: (reward: UserReward) => void;
  onGenerateQRCode: (reward: UserReward) => void;
}

const WalletTabs: React.FC<WalletTabsProps> = ({
  walletData,
  userRewards,
  rewards,
  level,
  onClaimReward,
  onOpenRewardDetails,
  onGenerateQRCode
}) => {
  const groupedRewards = groupRewardsByType(userRewards);

  return (
    <Tabs defaultValue="challenge-rewards" className="mb-6">
      <TabsList className="mb-4">
        <TabsTrigger value="challenge-rewards">Challenge Belohnungen</TabsTrigger>
        <TabsTrigger value="available">Level Belohnungen</TabsTrigger>
        <TabsTrigger value="claimed">Eingelöste Belohnungen</TabsTrigger>
        <TabsTrigger value="gamification">VIP & Status</TabsTrigger>
        <TabsTrigger value="history">Transaktionen</TabsTrigger>
      </TabsList>
      
      <TabsContent value="challenge-rewards">
        <ChallengeRewardsTab
          groupedRewards={groupedRewards}
          onOpenRewardDetails={onOpenRewardDetails}
        />
      </TabsContent>
      
      <TabsContent value="available">
        <AvailableRewardsTab
          rewards={rewards}
          walletData={walletData}
          onClaimReward={onClaimReward}
        />
      </TabsContent>
      
      <TabsContent value="claimed">
        <ClaimedRewardsTab
          rewards={rewards}
          userRewards={userRewards}
          onOpenRewardDetails={onOpenRewardDetails}
          onGenerateQRCode={onGenerateQRCode}
        />
      </TabsContent>

      <TabsContent value="gamification">
        <GameficationTab 
          level={level} 
          xp={walletData.xp_total}
          userRewards={userRewards}
        />
      </TabsContent>

      <TabsContent value="history">
        <TransactionHistory walletData={walletData} />
      </TabsContent>
    </Tabs>
  );
};

export default WalletTabs;
