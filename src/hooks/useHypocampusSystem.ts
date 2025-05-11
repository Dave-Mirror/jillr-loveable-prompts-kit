
import { useEffect } from 'react';
import useMemorySnapshots from './useMemorySnapshots';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { createRewardLog } from '@/services/mockHypocampusService';

export const useHypocampusSystem = () => {
  const { captureSnapshot } = useMemorySnapshots();
  const { user } = useAuth();
  const { toast } = useToast();

  // Track route changes
  useEffect(() => {
    const handleRouteChange = () => {
      if (user) {
        // Capture page navigation as an activity
        captureSnapshot('app_opened', {
          hour: new Date().getHours(),
          screen: window.location.pathname,
          activity: 'navigation'
        });
      }
    };

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);
    
    // Capture initial page load
    handleRouteChange();

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [user, captureSnapshot]);

  // Process trigger matches
  useEffect(() => {
    const checkTriggers = async () => {
      if (!user) return;
      
      try {
        // Get current context data
        const context = {
          hour: new Date().getHours(),
          screen: window.location.pathname,
          activity: window.location.pathname.split('/')[1] || 'home'
        };
        
        // Mock processing triggers
        // In a real implementation, this would call the Supabase function
        
        // Simulate a reward occasionally (10% chance when on hypocampus page)
        if (context.screen === '/hypocampus' && Math.random() < 0.1) {
          const mockReward = {
            user_id: user.id,
            trigger_id: uuidv4(),
            reward_type: 'xp',
            xp_earned: 25,
            description: 'Hypocampus-System erkundet'
          };
          
          await createRewardLog(mockReward);
          
          toast({
            title: "Trigger aktiviert!",
            description: `Du hast ${mockReward.xp_earned} XP verdient!`,
          });
        }
      } catch (err) {
        console.error('Error checking triggers:', err);
      }
    };
    
    // Check for triggers on component mount
    checkTriggers();
    
    // Set up periodic trigger checking
    const intervalId = setInterval(checkTriggers, 5 * 60 * 1000); // Check every 5 minutes
    
    return () => {
      clearInterval(intervalId);
    };
  }, [user, toast]);

  return {
    captureSnapshot
  };
};

export default useHypocampusSystem;
