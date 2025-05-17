
export interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
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
  challengeInfo?: {
    title: string;
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
}
