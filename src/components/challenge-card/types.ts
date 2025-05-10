
export interface ChallengeCardProps {
  id: string;
  title: string;
  description: string;
  type: string;
  hashtags: string[];
  xpReward: number;
  endDate: string | Date;
  imageUrl?: string;
  videoUrl?: string;
  mediaType?: 'image' | 'video';
}

// Challenge type icons mapping
export const typeIcons: Record<string, string> = {
  'photo': '📸',
  'video': '🎥',
  'ar': '🥽',
  'geofencing': '📍',
  'fitness': '💪',
  'wearable': '⌚',
  'schnitzeljagd': '🔍',
  'community': '👥',
  'battle': '⚔️',
  'review': '⭐',
  'fashion': '👕',
  'beauty': '💄',
  'sport': '🏆',
  'food': '🍔',
  'travel': '✈️',
  'gaming': '🎮',
  'mobility': '🚗',
  'sustainability': '♻️',
  'entertainment': '🎭',
  'education': '📚',
};
