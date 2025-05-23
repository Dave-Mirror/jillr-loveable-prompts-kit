
import { Reward } from '@/types/dashboard';

// Define allowed submission statuses
export type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'verified';

// Define challenge types
export type ChallengeType = 
  | 'Video' 
  | 'Geofencing' 
  | 'Photo & Video'
  | 'AR' 
  | 'Fashion'
  | 'Sport'
  | 'Beauty'
  | 'Fitness'
  | 'Travel'
  | 'Food'
  | 'Dance'
  | 'Sustainability'
  | 'Gamification'
  | 'Community'
  | 'Battle'
  | 'Review'
  | 'Live Party'
  | 'Zero Waste'
  | 'Team Battle'
  | 'Easter Egg Hunt'
  | 'Last-Minute Trip';

export type Submission = {
  id: string;
  user_id: string;
  username?: string;
  profile_image?: string;
  video_url?: string;
  views: number;
  likes: number;
  status: SubmissionStatus;
  verified?: boolean;
  challenge_id?: string;
  submitted_at?: string;
};

export type Challenge = {
  id: string;
  title: string;
  description?: string;
  type?: ChallengeType;
  imageUrl?: string;
  brand_logo?: string;
  brand_color?: string;
  brand_name?: string;
  start_date: string;
  end_date: string;
  coin_reward?: number;
  xp_reward?: number;
  location?: string;
  required_format?: string;
  hashtags?: string[];
  views?: number;
  status?: 'active' | 'completed' | 'draft';
  // Add the new properties needed for preview media
  previewMediaType?: 'image' | 'video';
  previewMediaUrl?: string;
};

export type ChallengeDetailsProps = {
  challenge: Challenge;
};

export type LeaderboardCardProps = {
  topUsers: {
    id: string;
    user_id: string;
    username: string;
    views: number;
    likes: number;
  }[];
};

export type ChallengeActionsProps = {
  handleJoinClick: () => void;
  requestCoachTip: () => void;
  shareChallenge: () => void;
  coachTip: string;
  isLoadingTip: boolean;
  challenge: Challenge;
};

export type CommunitySubmissionsProps = {
  verifiedSubmissions: Submission[];
  inviteFriends: () => void;
};

export type ChallengeReward = {
  type: string;
  value: number;
  icon: string;
  description?: string;
  immediate?: boolean;
  level?: number;
  location_based?: boolean;
  social_based?: boolean;
  team_based?: boolean;
};

export type RewardsCardProps = {
  challengeRewards: ChallengeReward[];
};

export type UserProgressCardProps = {
  user: any;
  challenge: Challenge;
  submissions: Submission[];
};
