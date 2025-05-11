
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

// Activity types
export type ActivityType = 
  | 'app_opened'
  | 'challenge_viewed'
  | 'challenge_started'
  | 'content_uploaded'
  | 'brand_interaction'
  | 'location_changed'
  | 'feed_scrolled'
  | 'reward_claimed';

interface SnapshotData {
  hour?: number;
  location_type?: string;
  activity?: string;
  mood?: string;
  challenge_id?: string;
  brand_id?: string;
  content_type?: 'photo' | 'video' | 'text';
  [key: string]: any;
}

export const useMemorySnapshots = () => {
  const { user } = useAuth();

  // Function to capture and store memory snapshots
  const captureSnapshot = async (activityType: ActivityType, data: SnapshotData = {}) => {
    if (!user) return;
    
    try {
      // Add current hour if not provided
      if (!data.hour) {
        data.hour = new Date().getHours();
      }
      
      // Insert snapshot into the database
      const { error } = await supabase.from('memory_snapshots').insert({
        user_id: user.id,
        activity_type: activityType,
        data: data
      });
      
      if (error) {
        console.error('Error saving memory snapshot:', error);
      }
    } catch (err) {
      console.error('Failed to capture memory snapshot:', err);
    }
  };
  
  // Capture app opened event automatically
  useEffect(() => {
    if (user) {
      captureSnapshot('app_opened', {
        hour: new Date().getHours(),
        screen: window.location.pathname
      });
    }
  }, [user]);
  
  return { captureSnapshot };
};

export default useMemorySnapshots;
