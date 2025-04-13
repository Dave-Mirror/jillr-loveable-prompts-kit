
export interface ActiveChallenge {
  id: string;
  title: string;
  brand: string;
  deadline: string;
  xpReward: number;
  coinReward: number;
  progress: number;
  status: 'in_progress' | 'not_started';
}

export interface CompletedChallenge {
  id: string;
  title: string;
  brand: string;
  completedDate: string;
  xpEarned: number;
  coinsEarned: number;
  views: number;
  likes: number;
}

export interface ContentUpload {
  id: string;
  thumbnail: string;
  title: string;
  date: string;
  views: number;
  likes: number;
  featured: boolean;
  challenge: string;
  tiktokLink: string;
}
