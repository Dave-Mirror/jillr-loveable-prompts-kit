
export interface UserReward {
  id: string;
  name: string;
  description: string;
  type: string; // badge, voucher, ticket, product, etc.
  challengeId?: string;
  challengeName?: string;
  claimed?: boolean;
  unlocked?: boolean; // Added unlocked property
  claimUrl?: string;
  claimCode?: string;
  imageUrl?: string;
  details?: string;
  expiryDate?: string;
  // For backward compatibility
  code?: string;
  image?: string;
}

export interface RewardAPIResponse {
  rewards: UserReward[];
}

export interface ClaimRewardParams {
  userId: string;
  rewardId: string;
}

export interface ClaimRewardResponse {
  success: boolean;
  reward: UserReward;
}
