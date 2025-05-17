
export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: string;
  imageUrl?: string;
  reward?: string;
  expiresIn?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  challengeId?: string;
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
