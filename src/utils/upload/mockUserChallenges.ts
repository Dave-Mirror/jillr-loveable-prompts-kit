
import { supabase } from '@/integrations/supabase/client';

export interface UserChallenge {
  id: string;
  user_id: string;
  challenge_id: string;
  status: 'active' | 'completed' | 'draft';
  joined_at: string;
  completed_at?: string;
}

// Mock function for managing user challenges when DB table doesn't exist yet
export const upsertUserChallenge = async (userChallenge: Partial<UserChallenge>) => {
  try {
    // Skip database attempt since table doesn't exist in types
    // Return mock data
    console.log("Using mock user challenge data");
    const mockUserChallenge: UserChallenge = {
      id: 'mock-id-' + Math.random().toString(36).substr(2, 9),
      user_id: userChallenge.user_id || '',
      challenge_id: userChallenge.challenge_id || '',
      status: userChallenge.status || 'active',
      joined_at: userChallenge.joined_at || new Date().toISOString(),
      completed_at: userChallenge.completed_at
    };
    
    return { data: [mockUserChallenge], error: null };
  } catch (error) {
    console.error("Error in upsertUserChallenge:", error);
    return { data: null, error };
  }
};
