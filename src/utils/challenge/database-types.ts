
// Define types for database tables
// These types will help us work with the data from Supabase
// without modifying the read-only types.ts file

export interface Wallet {
  id: string;
  user_id: string;
  xp_total: number;
  coins_total: number;
  rewards_claimed: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Challenge {
  id: string;
  user_id?: string;
  title: string;
  description?: string;
  type?: string;
  status?: 'active' | 'completed' | 'draft';
  coin_reward?: number;
  xp_reward?: number;
  start_date?: string;
  end_date?: string;
  hashtags?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Upload {
  id: string;
  user_id?: string;
  challenge_id?: string;
  views?: number;
  likes?: number;
  video_url?: string;
  tiktok_link?: string;
  capcut_template?: string;
  submitted_at?: string;
  created_at?: string;
  updated_at?: string;
}

// Add this function to help with type safety when working with Supabase data
export function isValidData<T>(data: T | null | undefined): data is T {
  return data !== null && data !== undefined;
}
