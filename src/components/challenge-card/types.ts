
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

// Exportiere die typeIcons Map für ChallengeBadges.tsx
export const typeIcons: Record<string, string> = {
  'video': '🎬',
  'photo': '📸',
  'ar': '🥽',
  'geofencing': '📍',
  'fitness': '💪',
  'fashion': '👗',
  'sport': '🏆',
  'beauty': '💄',
  'travel': '✈️',
  'food': '🍔',
  'dance': '💃',
  'sustainability': '♻️',
  'gamification': '🎮',
  'community': '👥',
  'battle': '⚔️',
  'review': '⭐',
  'liveparty': '🎉',
  'zerowaste': '♻️',
  'teambattle': '👥⚔️',
  'easteregg': '🥚',
  'lastminute': '⏱️'
};
