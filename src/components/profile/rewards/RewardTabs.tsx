
import React, { useState } from 'react';
import { UserReward } from '@/utils/challenge/rewards/types';
import RewardChallengeTab from './RewardChallengeTab';
import RewardAvailableTab from './RewardAvailableTab';
import RewardClaimedTab from './RewardClaimedTab';
import { Trophy, Gift, Check } from 'lucide-react';
import FilterDropdown, { FilterOption } from '@/components/ui/filter-dropdown';

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
  const [activeTab, setActiveTab] = useState("challenge-rewards");
  
  const tabOptions: FilterOption[] = [
    { value: "challenge-rewards", label: "Challenge Rewards" },
    { value: "available", label: "Available Rewards" },
    { value: "claimed", label: "Claimed Rewards" }
  ];
  
  const getIcon = () => {
    switch(activeTab) {
      case "challenge-rewards": return <Trophy size={16} className="text-jillr-neonPurple mr-2" />;
      case "available": return <Gift size={16} className="text-jillr-neonBlue mr-2" />;
      case "claimed": return <Check size={16} className="text-jillr-neonGreen mr-2" />;
      default: return <Trophy size={16} className="text-jillr-neonPurple mr-2" />;
    }
  };

  return (
    <div className="neon-card overflow-hidden">
      <div className="p-4 bg-jillr-dark/90 flex justify-between items-center border-b border-jillr-neonPurple/20">
        <div className="flex items-center">
          {getIcon()}
          <h3 className="font-medium">
            {activeTab === "challenge-rewards" && "Challenge Rewards"}
            {activeTab === "available" && "Available Rewards"}
            {activeTab === "claimed" && "Claimed Rewards"}
          </h3>
        </div>
        <FilterDropdown 
          options={tabOptions} 
          activeValue={activeTab} 
          onSelect={setActiveTab}
          label="Show" 
        />
      </div>
      
      <div className="p-4 bg-jillr-dark/90 h-full">
        {activeTab === "challenge-rewards" && (
          <RewardChallengeTab 
            groupedRewards={groupedRewards} 
            isLoading={isLoading} 
            openRewardDetails={openRewardDetails}
            navigate={navigate}
          />
        )}
        
        {activeTab === "available" && (
          <RewardAvailableTab 
            availableRewards={availableRewards}
          />
        )}
        
        {activeTab === "claimed" && (
          <RewardClaimedTab 
            claimedRewards={claimedRewards}
            userRewards={userRewards}
            openRewardDetails={openRewardDetails}
          />
        )}
      </div>
    </div>
  );
};

export default RewardTabs;
