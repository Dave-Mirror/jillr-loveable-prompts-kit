
import { ContextTrigger } from '@/types/hypocampus';
import { supabase } from '@/integrations/supabase/client';

interface Context {
  hour?: number;
  screen?: string;
  activity?: string;
  location_type?: string;
  weather?: string;
  mood?: string;
  [key: string]: any;
}

export const processTriggers = async (userId: string, context: Context) => {
  if (!userId) return [];
  
  try {
    const { data: triggers, error } = await supabase
      .from('context_triggers')
      .select('*')
      .eq('user_id', userId)
      .eq('active', true);
      
    if (error) throw error;
    
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

const matchTriggerCondition = (trigger: ContextTrigger, context: Context): boolean => {
  const conditionType = trigger.condition_type.split('_')[0];
  const conditionValue = trigger.condition_type.split('_')[1];
  
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
  processTriggers
};
