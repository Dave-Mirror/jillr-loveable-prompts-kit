
import React from 'react';
import { BadgePercent, ShoppingBag, Ticket, Flame, Gift } from 'lucide-react';
import { UserReward } from '@/utils/challenge/rewards/types';
import RewardCard from './RewardCard';

interface RewardTypeSectionProps {
  type: string;
  typeRewards: UserReward[];
  onOpenRewardDetails: (reward: UserReward) => void;
}

const RewardTypeSection: React.FC<RewardTypeSectionProps> = ({ 
  type, 
  typeRewards, 
  onOpenRewardDetails 
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'coupon': return <BadgePercent className="text-yellow-500" />;
      case 'product': return <ShoppingBag className="text-jillr-neonBlue" />;
      case 'ticket': return <Ticket className="text-jillr-neonPink" />;
      case 'access': return <Flame className="text-orange-500" />;
      case 'voucher': 
      default: return <Gift className="text-jillr-neonGreen" />;
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        {getTypeIcon()}
        {type.charAt(0).toUpperCase() + type.slice(1)}s
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {typeRewards.map(reward => (
          <RewardCard 
            key={reward.id} 
            reward={reward} 
            onOpenRewardDetails={onOpenRewardDetails} 
          />
        ))}
      </div>
    </div>
  );
};

export default RewardTypeSection;
