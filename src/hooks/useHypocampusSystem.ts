
import { useEffect } from 'react';
import useMemorySnapshots from './useMemorySnapshots';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { createRewardLog, getRewards } from '@/services/mockHypocampusService';
import { processTriggers } from '@/services/triggerProcessingService';
import { ContextTrigger } from '@/types/hypocampus';

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
        
        // Process triggers using the service
        const matchedTriggers = await processTriggers(user.id, context);
        
        // If we have any matching triggers, process their actions
        if (matchedTriggers.length > 0) {
          // Get available rewards
          const rewards = await getRewards();
          
          // Process each matched trigger
          for (const trigger of matchedTriggers as ContextTrigger[]) {
            if (trigger.action_type?.startsWith('reward_')) {
              // Find the appropriate reward based on the action type
              const rewardParts = trigger.action_type.split('_');
              const rewardType = rewardParts[1] || 'xp';
              const rewardSize = rewardParts[2] || 'small';
              
              let xpValue = 25; // Default to small reward
              
              if (rewardSize === 'medium') xpValue = 50;
              if (rewardSize === 'large') xpValue = 100;
              
              // Find matching reward in the rewards table
              const matchingReward = rewards.find(r => 
                r.reward_type === rewardType && r.value === xpValue
              );
              
              if (matchingReward) {
                // Log the reward
                await createRewardLog({
                  user_id: user.id,
                  reward_id: matchingReward.id,
                  trigger_id: trigger.id,
                  status: 'granted',
                  reward_type: rewardType
                });
                
                // Notify the user
                toast({
                  title: "Trigger aktiviert!",
                  description: `Du hast ${xpValue} XP verdient!`,
                });
              }
            }
          }
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
