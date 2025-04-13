
// Mock data for available rewards - would come from database in real app
export const availableRewards = [
  {
    id: '1',
    name: '20% Off Coupon',
    description: 'Get 20% off your next purchase at Nike',
    requiredLevel: 2,
    isUnlocked: false, // This will be calculated based on user level
    isClaimed: false,
    type: 'coupon'
  },
  {
    id: '2',
    name: 'Early Product Access',
    description: 'Get early access to the latest product releases',
    requiredLevel: 5,
    isUnlocked: false,
    isClaimed: false,
    type: 'access'
  },
  {
    id: '3',
    name: 'VIP Event Ticket',
    description: 'Exclusive access to our next in-store event',
    requiredLevel: 10,
    isUnlocked: false,
    isClaimed: false,
    type: 'ticket'
  }
];

export const claimedRewards = [
  {
    id: '4',
    name: 'Free Shipping Coupon',
    description: 'Free shipping on your next order',
    claimedDate: '2023-08-15',
    expireDate: '2023-12-31',
    code: 'FREESHIP2023',
    type: 'coupon'
  }
];

// Mock data for streaks
export const streakData = {
  currentStreak: 5,
  bestStreak: 12,
  nextReward: {
    days: 7,
    reward: '50 Coins'
  }
};
