
import { useEffect } from 'react';
import useMemorySnapshots from './useMemorySnapshots';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
        
        // Call backend to check for matching triggers
        const { data, error } = await supabase.functions.invoke('process-snapshots', {
          body: { userId: user.id, context }
        });
        
        if (error) throw error;
        
        // Process any matched triggers with rewards
        if (data.rewards && data.rewards.length > 0) {
          data.rewards.forEach((reward: any) => {
            toast({
              title: "Trigger aktiviert!",
              description: reward.description || `Du hast ${reward.xp_earned} XP verdient!`,
            });
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
