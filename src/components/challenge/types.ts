
import { Reward } from '@/types/dashboard';

export type Submission = {
  id: string;
  user_id: string;
  username?: string;
  profile_image?: string;
  video_url?: string;
  views: number;
  likes: number;
  status: string;
  verified?: boolean;
  challenge_id?: string;
};

export type Challenge = {
  id: string;
  title: string;
  description?: string;
  type?: string;
  imageUrl?: string;
  brand_logo?: string;
  brand_color?: string;
  start_date: string;
  end_date: string;
  coin_reward?: number;
  xp_reward?: number;
  location?: string;
  required_format?: string;
  hashtags?: string[];
  views?: number;
};
