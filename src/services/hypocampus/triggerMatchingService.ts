
import { ContextTrigger } from '@/types/hypocampus';

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
 * Determines if a trigger's condition matches the given context
 * @param trigger The trigger to evaluate
 * @param context The current context
 * @returns A boolean indicating if the trigger matches the context
 */
export const matchTriggerCondition = (trigger: ContextTrigger, context: Context): boolean => {
  // Safely handle trigger condition format
  if (!trigger.condition_type) return false;
  
  const conditionParts = trigger.condition_type.split('_');
  if (conditionParts.length < 2) return false;
  
  const conditionType = conditionParts[0];
  const conditionValue = conditionParts[1];
  
  // Match based on condition type
  switch (conditionType) {
    case 'time':
      const hour = context.hour || new Date().getHours();
      
      if (conditionValue === 'morning' && hour >= 6 && hour < 11) return true;
      if (conditionValue === 'noon' && hour >= 11 && hour < 14) return true;
      if (conditionValue === 'evening' && hour >= 14 && hour < 22) return true;
      if (conditionValue === 'night' && (hour >= 22 || hour < 6)) return true;
      break;
      
    case 'location':
      if (context.location_type === conditionValue) return true;
      break;
      
    case 'activity':
      if (context.activity === conditionValue) return true;
      break;
      
    case 'weather':
      if (context.weather === conditionValue) return true;
      break;
      
    case 'mood':
      if (context.mood === conditionValue) return true;
      break;
  }
  
  return false;
};

export default {
  matchTriggerCondition
};
