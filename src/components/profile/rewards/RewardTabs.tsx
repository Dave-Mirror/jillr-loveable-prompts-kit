
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserReward } from '@/utils/challenge/userRewards';
import RewardChallengeTab from './RewardChallengeTab';
import RewardAvailableTab from './RewardAvailableTab';
import RewardClaimedTab from './RewardClaimedTab';

interface RewardTabsProps {
  userRewards: UserReward[];
  groupedRewards: Record<string, UserReward[]>;
  isLoading: boolean;
  availableRewards: any[];
  claimedRewards: any[];
  openRewardDetails: (reward: UserReward) => void;
  navigate: (path: string) => void;
}

const RewardTabs: React.FC<RewardTabsProps> = ({
  userRewards,
  groupedRewards,
  isLoading,
  availableRewards,
  claimedRewards,
  openRewardDetails,
  navigate
}) => {
  return (
    <Tabs defaultValue="challenge-rewards">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="challenge-rewards">Challenge Rewards</TabsTrigger>
        <TabsTrigger value="available">Available Rewards</TabsTrigger>
        <TabsTrigger value="claimed">Claimed Rewards</TabsTrigger>
      </TabsList>
      
      <TabsContent value="challenge-rewards" className="mt-4">
        <RewardChallengeTab 
          groupedRewards={groupedRewards} 
          isLoading={isLoading} 
          openRewardDetails={openRewardDetails}
          navigate={navigate}
        />
      </TabsContent>
      
      <TabsContent value="available" className="mt-4">
        <RewardAvailableTab 
          availableRewards={availableRewards}
        />
      </TabsContent>
      
      <TabsContent value="claimed" className="mt-4">
        <RewardClaimedTab 
          claimedRewards={claimedRewards}
          userRewards={userRewards}
          openRewardDetails={openRewardDetails}
        />
      </TabsContent>
    </Tabs>
  );
};

export default RewardTabs;
