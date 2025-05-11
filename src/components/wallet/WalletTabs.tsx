
import React, { useState } from 'react';
import { UserReward } from '@/utils/challenge/rewards/types';
import { groupRewardsByType } from '@/utils/challenge/rewards/formatters';
import ChallengeRewardsTab from './ChallengeRewardsTab';
import ClaimedRewardsTab from './ClaimedRewardsTab';
import AvailableRewardsTab from './AvailableRewardsTab';
import GameficationTab from './GameficationTab';
import TransactionHistory from './TransactionHistory';
import { WalletData } from '@/hooks/useWalletData';
import FilterDropdown, { FilterOption } from '@/components/ui/filter-dropdown';
import { Gift, Check, Trophy, CreditCard, Award } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState("challenge-rewards");
  const groupedRewards = groupRewardsByType(userRewards);
  
  const tabOptions: FilterOption[] = [
    { value: "challenge-rewards", label: "Challenge Belohnungen" },
    { value: "available", label: "Level Belohnungen" },
    { value: "claimed", label: "Eingelöste Belohnungen" },
    { value: "gamification", label: "VIP & Status" },
    { value: "history", label: "Transaktionen" }
  ];

  const getIcon = () => {
    switch(activeTab) {
      case "challenge-rewards": return <Trophy className="h-5 w-5 text-jillr-neonPurple mr-2" />;
      case "available": return <Gift className="h-5 w-5 text-jillr-neonBlue mr-2" />;
      case "claimed": return <Check className="h-5 w-5 text-jillr-neonGreen mr-2" />;
      case "gamification": return <Award className="h-5 w-5 text-yellow-500 mr-2" />;
      case "history": return <CreditCard className="h-5 w-5 text-jillr-neonPink mr-2" />;
      default: return <Trophy className="h-5 w-5 text-jillr-neonPurple mr-2" />;
    }
  };

  return (
    <div className="mb-6">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center">
          {getIcon()}
          <h2 className="text-xl font-semibold">
            {activeTab === "challenge-rewards" && "Challenge Belohnungen"}
            {activeTab === "available" && "Level Belohnungen"}
            {activeTab === "claimed" && "Eingelöste Belohnungen"}
            {activeTab === "gamification" && "VIP & Status"}
            {activeTab === "history" && "Transaktionen"}
          </h2>
        </div>
        <FilterDropdown 
          options={tabOptions}
          activeValue={activeTab}
          onSelect={setActiveTab}
          label="Kategorie"
          buttonVariant="outline"
        />
      </div>
      
      <div className="mt-4">
        {activeTab === "challenge-rewards" && (
          <ChallengeRewardsTab
            groupedRewards={groupedRewards}
            onOpenRewardDetails={onOpenRewardDetails}
          />
        )}
        
        {activeTab === "available" && (
          <AvailableRewardsTab
            rewards={rewards}
            walletData={walletData}
            onClaimReward={onClaimReward}
          />
        )}
        
        {activeTab === "claimed" && (
          <ClaimedRewardsTab
            rewards={rewards}
            userRewards={userRewards}
            onOpenRewardDetails={onOpenRewardDetails}
            onGenerateQRCode={onGenerateQRCode}
          />
        )}

        {activeTab === "gamification" && (
          <GameficationTab 
            level={level} 
            xp={walletData.xp_total}
            userRewards={userRewards}
          />
        )}

        {activeTab === "history" && (
          <TransactionHistory walletData={walletData} />
        )}
      </div>
    </div>
  );
};

export default WalletTabs;
