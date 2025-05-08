
import { UserReward } from './types';

// Mock function to simulate API call for user rewards
export const getUserRewards = async (userId: string): Promise<UserReward[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock data
  return [
    {
      id: 'reward-101',
      name: 'VIP Concert Ticket',
      description: 'Exklusives Ticket für das nächste große Konzert in deiner Stadt',
      type: 'ticket',
      challengeId: 'challenge-1',
      challengeName: 'Summer Dance Challenge',
      claimed: false,
      imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Concert+Ticket',
      details: 'Dieses Ticket gibt dir Zugang zum VIP-Bereich beim nächsten großen Konzert in deiner Stadt. Zeige deinen QR-Code am Eingang vor.',
      claimUrl: '/events/concert-vip'
    },
    {
      id: 'reward-102',
      name: '30% Fashion Rabatt',
      description: '30% Rabatt auf deine nächste Bestellung bei ASOS',
      type: 'voucher',
      challengeId: 'challenge-1',
      challengeName: 'Summer Dance Challenge',
      claimed: true,
      claimCode: 'JILLR30DANCE',
      imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Fashion+Voucher',
      details: 'Einmaliger 30% Rabattcode für deine nächste Bestellung bei ASOS. Gib den Code beim Checkout ein.',
      claimUrl: 'https://asos.com'
    },
    {
      id: 'reward-103',
      name: 'Dance Master Badge',
      description: 'Offizielles Dance Master Badge für dein Profil',
      type: 'badge',
      challengeId: 'challenge-1',
      challengeName: 'Summer Dance Challenge',
      claimed: true,
      imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Dance+Badge'
    },
    {
      id: 'reward-201',
      name: 'Exclusive Sneakers',
      description: 'Eine Chance auf limitierte Edition Sneakers',
      type: 'product',
      challengeId: 'challenge-2',
      challengeName: 'Urban Photography Challenge',
      claimed: false,
      imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Exclusive+Sneakers',
      details: 'Nimm an der Verlosung für ein Paar limitierte Edition Sneakers teil. Die Gewinner werden am Ende des Monats bekanntgegeben.'
    },
    {
      id: 'reward-202',
      name: 'Photography Workshop',
      description: 'Teilnahme an einem exklusiven Photography Workshop',
      type: 'ticket',
      challengeId: 'challenge-2',
      challengeName: 'Urban Photography Challenge',
      claimed: false,
      imageUrl: 'https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Photography+Workshop',
      details: 'Dieser Workshop wird von professionellen Fotografen geleitet und findet am 15. Juni statt.',
      claimUrl: '/events/photo-workshop'
    }
  ];
};

// Function to simulate claiming a reward
export const claimReward = async (userId: string, rewardId: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Simulate success (in a real app, this would verify eligibility, etc.)
  return true;
};

// Function to group rewards by challenge
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
