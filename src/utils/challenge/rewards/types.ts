
export interface UserReward {
  id: string;
  name: string;
  description: string;
  type: string; // badge, voucher, ticket, product, etc.
  challengeId?: string;
  challengeName?: string;
  claimed?: boolean;
  claimUrl?: string;
  claimCode?: string; // Instead of code
  imageUrl?: string; // Instead of image
  details?: string;
  expiryDate?: string; // Correct property name (not expireDate)
  code?: string; // For backward compatibility
  image?: string; // For backward compatibility
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
