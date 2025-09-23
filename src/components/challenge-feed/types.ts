
export interface Comment {
  id: string;
  userId?: string;
  username: string;
  userAvatar?: string;
  text: string;
  timestamp: string;
  likes?: number;
}

export interface FeedItem {
  id: string;
  challengeId?: string;
  userId: string;
  username: string;
  userAvatar: string;
  caption: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  liked: boolean;
  likes: number;
  views: number;
  commentCount: number;
  comments: Comment[];
  hashtags: string[];
  type: 'challenge' | 'ugc' | 'cause';
  category?: string; // Add category field
  challengeInfo?: {
    title: string;
    subtitle?: string;
    reward: string;
    brandLogo?: string;
  };
  causeInfo?: {
    name: string;
    description: string;
    logoUrl: string;
  };
  postedAt: string;
  location?: string;
  // Additional fields for build error fixes
  achievements?: any[];
  content?: any;
  shares?: number;
  impactPoints?: number;
  user?: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  challenge?: any;
  commentsList?: Comment[];
}
