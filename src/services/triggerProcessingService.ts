
import { ContextTrigger } from '@/types/hypocampus';
import { getTriggersForUser } from './hypocampus/triggerService';
import { matchTriggerCondition } from './hypocampus/triggerMatchingService';

interface Context {
  hour?: number;
  screen?: string;
  activity?: string;
  location_type?: string;
  weather?: string;
  mood?: string;
  [key: string]: any;
}

/**
 * Processes triggers for a user based on the current context
 * @param userId The user's ID
 * @param context The current context data
 * @returns A promise resolving to an array of matching triggers
 */
export const processTriggers = async (userId: string, context: Context) => {
  if (!userId) return [];
  
  try {
    // Get user's triggers using the service
    console.log('Checking triggers for user', userId);
    const triggers = await getTriggersForUser(userId);
    
    // Filter triggers that match the current context
    const matchingTriggers = triggers.filter(trigger => 
      matchTriggerCondition(trigger, context)
    );
    
    return matchingTriggers;
  } catch (error) {
    console.error('Error processing triggers:', error);
    return [];
  }
};

export default {
  processTriggers
};
