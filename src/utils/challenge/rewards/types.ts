
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
  // Für überschüssige Ressourcen
  resourceType?: 'surplus' | 'unused' | 'sustainable' | 'limited';
  companyId?: string;
  companyName?: string;
  industry?: string;
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

// Neue Schnittstelle für Challenges
export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  brandId: string;
  brandName: string;
  industry: IndustryType;
  hashtags: string[];
  xpReward: number;
  coinReward?: number;
  startDate: string;
  endDate: string;
  imageUrl: string;
  brandLogoUrl?: string;
  location?: string;
  locationBased: boolean;
  status: 'active' | 'upcoming' | 'completed';
  rewards: UserReward[];
  specialFeatures?: string[];
}

export type ChallengeType = 
  | 'photo' 
  | 'video' 
  | 'ar' 
  | 'geofencing'
  | 'fitness'
  | 'wearable'
  | 'schnitzeljagd'
  | 'community'
  | 'battle'
  | 'review';

export type IndustryType = 
  | 'fashion' 
  | 'beauty' 
  | 'sport' 
  | 'food' 
  | 'travel' 
  | 'gaming'
  | 'mobility'
  | 'sustainability'
  | 'entertainment'
  | 'education'
  | 'lifestyle'; 

// Neue Schnittstelle für Unternehmen/Marken
export interface Company {
  id: string;
  name: string;
  industry: IndustryType;
  description: string;
  logoUrl: string;
  website: string;
  tone: string;
  targetAudience: string[];
  colorPalette: string[];
  availableResources: string[];
  challenges: string[]; // IDs der Challenges
}
