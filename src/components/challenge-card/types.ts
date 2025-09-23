
export interface Challenge {
  id: string;
  slug?: string;
  title: string;
  description: string;
  type: string;
  category?: "city-clash" | "video" | "photo" | "ar" | "geo" | "mystery" | "fitness" | "sustainability";
  xp?: number;
  tags?: string[];
  imageUrl?: string;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
  // Video poster frame support
  mediaType?: 'image' | 'video';
  mediaUrl?: string;
  posterUrl?: string;  // Generated from video frame
  reward?: string;
  expiresIn?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  challengeId?: string;
  // Additional fields for challenge details
  start_date?: string;
  end_date?: string;
  coin_reward?: number;
  xp_reward?: number;
  brand_name?: string;
  status?: string;
  stats?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface ChallengeCardProps {
  challenge: Challenge;
  className?: string;
  size?: "default" | "compact" | "large";
  onClick?: (id: string) => void;
  onJoinClick?: (id: string) => void;
}

// Challenge type icons mapping
export const typeIcons: Record<string, string> = {
  'photo': '📸',
  'video': '🎬',
  'photo & video': '📸',
  'ar': '🥽',
  'geofencing': '📍',
  'fitness': '💪',
  'sustainability': '♻️',
  'gamification': '🎮',
  'community': '👥',
  'battle': '⚔️',
  'review': '⭐',
  'travel': '✈️',
  'food': '🍔',
  'fashion': '👕',
  'beauty': '💄',
  'dance': '💃',
  'sport': '🏆'
};
