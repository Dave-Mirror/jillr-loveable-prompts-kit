
// Challenge type to reward image mapping
const challengeRewardImages: Record<string, Record<string, string>> = {
  'Video': {
    'product': 'https://images.unsplash.com/photo-1542587222-f9172e5eba29?q=80&w=500',
    'voucher': 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=500',
    'ticket': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=500',
  },
  'Geofencing': {
    'product': 'https://images.unsplash.com/photo-1527866512907-61d64dc45a5d?q=80&w=500',
    'voucher': 'https://images.unsplash.com/photo-1627843240167-b1f9a9f0cfb9?q=80&w=500',
    'ticket': 'https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=500',
  },
  'Photo & Video': {
    'product': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500',
    'voucher': 'https://images.unsplash.com/photo-1608500218890-c4f9062a8cba?q=80&w=500',
    'ticket': 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=500',
  },
  'Fashion': {
    'product': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500',
    'voucher': 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=500',
    'ticket': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=500',
  },
  'Sport': {
    'product': 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=500',
    'voucher': 'https://images.unsplash.com/photo-1561052967-61fc91e48d79?q=80&w=500',
    'ticket': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=500',
  },
  'Beauty': {
    'product': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=500',
    'voucher': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=500',
    'ticket': 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=500',
  },
  'Fitness': {
    'product': 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=500',
    'voucher': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500',
    'ticket': 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=500',
  },
  'Travel': {
    'product': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=500',
    'voucher': 'https://images.unsplash.com/photo-1581068506097-9eb0677b95af?q=80&w=500',
    'ticket': 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=500',
  },
  'Food': {
    'product': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500',
    'voucher': 'https://images.unsplash.com/photo-1565895405137-61b1d6c5af87?q=80&w=500',
    'ticket': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=500',
  },
  'default': {
    'product': 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?q=80&w=500',
    'voucher': 'https://images.unsplash.com/photo-1561715276-a2d087060f1d?q=80&w=500',
    'ticket': 'https://images.unsplash.com/photo-1572284808155-f16587c4c297?q=80&w=500',
    'access': 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=500',
    'coupon': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=500',
  }
};

// Get a reward image based on challenge type and reward type
export const getRewardImage = (challengeType: string, rewardType: string): string => {
  if (challengeRewardImages[challengeType]?.[rewardType]) {
    return challengeRewardImages[challengeType][rewardType];
  }
  return challengeRewardImages['default'][rewardType] || challengeRewardImages['default']['product'];
};

// Generate claim URL based on reward type
export const getClaimUrl = (rewardType: string, code?: string): string => {
  switch (rewardType) {
    case 'product':
      return `/shop?reward=${code}`;
    case 'ticket':
      return `/events?ticket=${code}`;
    case 'access':
      return `/exclusive?access=${code}`;
    case 'voucher':
    case 'coupon':
    default:
      return `/wallet?claim=${code}`;
  }
};
