
import { UserReward } from './types';

// Function to group rewards by challenge name
export const groupRewardsByType = (rewards: UserReward[]): Record<string, UserReward[]> => {
  const grouped: Record<string, UserReward[]> = {};
  
  rewards.forEach(reward => {
    const challengeName = reward.challengeName || 'Other Rewards';
    
    if (!grouped[challengeName]) {
      grouped[challengeName] = [];
    }
    
    grouped[challengeName].push(reward);
  });
  
  return grouped;
};

// Format reward type for display
export const formatRewardType = (type: string): string => {
  switch (type) {
    case 'voucher':
      return 'Gutschein';
    case 'ticket':
      return 'Ticket';
    case 'badge':
      return 'Abzeichen';
    case 'product':
      return 'Produkt';
    default:
      return type;
  }
};

// Get color for reward type
export const getRewardTypeColor = (type: string): string => {
  switch (type) {
    case 'voucher':
      return 'text-jillr-neonPink';
    case 'ticket':
      return 'text-jillr-neonBlue';
    case 'badge':
      return 'text-jillr-neonGreen';
    case 'product':
      return 'text-yellow-500';
    default:
      return 'text-jillr-neonPurple';
  }
};
