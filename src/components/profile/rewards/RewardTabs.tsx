
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserReward } from '@/utils/challenge/rewards/types';
import RewardChallengeTab from './RewardChallengeTab';
import RewardAvailableTab from './RewardAvailableTab';
import RewardClaimedTab from './RewardClaimedTab';
import { Trophy, Gift, Check } from 'lucide-react';

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
    <Tabs defaultValue="challenge-rewards" className="neon-card overflow-hidden">
      <TabsList className="grid grid-cols-3 w-full bg-jillr-dark border-b border-jillr-neonPurple/20">
        <TabsTrigger 
          value="challenge-rewards"
          className="data-[state=active]:bg-jillr-neonPurple/20 data-[state=active]:text-jillr-neonPurple flex items-center gap-2"
        >
          <Trophy size={16} />
          <span>Challenge Rewards</span>
        </TabsTrigger>
        <TabsTrigger 
          value="available"
          className="data-[state=active]:bg-jillr-neonBlue/20 data-[state=active]:text-jillr-neonBlue flex items-center gap-2"
        >
          <Gift size={16} />
          <span>Available Rewards</span>
        </TabsTrigger>
        <TabsTrigger 
          value="claimed"
          className="data-[state=active]:bg-jillr-neonGreen/20 data-[state=active]:text-jillr-neonGreen flex items-center gap-2"
        >
          <Check size={16} />
          <span>Claimed Rewards</span>
        </TabsTrigger>
      </TabsList>
      
      <div className="p-4 bg-jillr-dark/90 h-full">
        <TabsContent value="challenge-rewards" className="mt-4 animate-fade-in">
          <RewardChallengeTab 
            groupedRewards={groupedRewards} 
            isLoading={isLoading} 
            openRewardDetails={openRewardDetails}
            navigate={navigate}
          />
        </TabsContent>
        
        <TabsContent value="available" className="mt-4 animate-fade-in">
          <RewardAvailableTab 
            availableRewards={availableRewards}
          />
        </TabsContent>
        
        <TabsContent value="claimed" className="mt-4 animate-fade-in">
          <RewardClaimedTab 
            claimedRewards={claimedRewards}
            userRewards={userRewards}
            openRewardDetails={openRewardDetails}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default RewardTabs;
