
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { v4 as uuidv4 } from 'uuid';
import { createMemorySnapshot } from '@/services/mockHypocampusService';

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
      
      // Create snapshot using our mock service
      const snapshot = await createMemorySnapshot({
        user_id: user.id,
        activity_type: activityType,
        data: data
      });
      
      console.log('Memory snapshot captured:', snapshot);
      
      return snapshot;
    } catch (err) {
      console.error('Failed to capture memory snapshot:', err);
      return null;
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
