
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
  videoTemplate?: VideoTemplate; // Neuer Typ für Video-Templates
}

export interface VideoTemplate {
  id: string;
  name: string;
  description?: string;
  brandId: string;
  brandingElements: BrandingElements;
  format: 'tiktok' | 'instagram' | 'youtube_shorts' | 'all';
  duration: number; // in seconds
  effects: VideoEffect[];
  musicTrackId?: string;
  voiceoverId?: string;
  templateType: 'trend' | 'before_after' | 'testimonial' | 'product_review' | 'custom';
  previewUrl?: string;
  performanceMetrics?: TemplatePerformanceMetrics;
  geoRestricted?: boolean;
  geoLocations?: string[];
  arEffects?: AREffect[];
}

export interface BrandingElements {
  logoUrl?: string;
  colorPalette?: string[];
  fonts?: string[];
  watermark?: boolean;
  textOverlays?: TextOverlay[];
  callToAction?: string;
}

export interface VideoEffect {
  type: 'filter' | 'transition' | 'overlay' | 'animation' | 'text_effect' | 'slow_motion' | 'zoom' | 'jump_cut';
  name: string;
  intensity?: number;
  timeRanges?: [number, number][]; // Arrays of [start, end] in seconds
  parameters?: Record<string, any>;
}

export interface AREffect {
  id: string;
  name: string;
  type: 'filter' | 'object' | 'background' | 'interaction';
  fileUrl: string;
}

export interface TextOverlay {
  text: string;
  position: 'top' | 'center' | 'bottom';
  style: 'minimal' | 'bold' | 'neon' | 'handwritten';
  timeRange?: [number, number];
}

export interface TemplatePerformanceMetrics {
  views: number;
  engagement: number;
  completionRate: number;
  shareRate: number;
  conversionRate?: number;
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
  videoTemplates?: string[]; // IDs der Video-Templates
  brandingAssets?: BrandingAssets;
}

export interface BrandingAssets {
  logos: MediaAsset[];
  fonts: FontAsset[];
  colors: ColorAsset[];
  soundtracks: MediaAsset[];
  voiceovers: MediaAsset[];
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'audio' | 'video';
  tags?: string[];
}

export interface FontAsset {
  id: string;
  name: string;
  url: string;
  style: 'regular' | 'bold' | 'italic' | 'bold_italic';
}

export interface ColorAsset {
  id: string;
  name: string;
  hex: string;
  rgb?: string;
}
