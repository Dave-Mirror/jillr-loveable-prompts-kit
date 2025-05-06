
import { supabase } from '@/integrations/supabase/client';

export async function fetchUserProfile(username: string) {
  // This is a mock function since we don't have a real backend yet
  // In a real implementation, this would fetch data from Supabase or another API
  
  // Mock data for demonstration
  return new Promise((resolve) => {
    setTimeout(() => {
      // If no username provided, return null
      if (!username) {
        resolve(null);
        return;
      }
      
      const profile = {
        id: 'user-' + Math.random().toString(36).substring(2, 9),
        username: username || 'alex98',
        level: 14,
        xp: 14500,
        avatar: 'https://placehold.co/200x200/9b87f5/FFFFFF/png?text=JC', 
        coins: 3150,
        active_challenges: 3,
        completed_challenges: 8,
        location: 'Berlin',
        joinDate: '2022',
        socialLinks: {
          tiktok: username,
          instagram: username,
          youtube: username,
          twitch: '',
          twitter: ''
        },
        badges: ['Top 10 Creator', 'Easter Egg Hunter', 'Viral Challenge Master'],
        followers: 2081
      };
      
      resolve(profile);
    }, 500);
  });
}
