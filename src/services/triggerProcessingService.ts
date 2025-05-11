
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
    // Check if the table exists in Supabase
    const { error: checkError } = await supabase
      .from('context_triggers')
      .select('count')
      .limit(1)
      .single();
    
    // If no error, table exists
    if (!checkError) {
      const { data: triggers, error } = await supabase
        .from('context_triggers')
        .select('*')
        .eq('user_id', userId)
        .eq('active', true);
        
      if (error) throw error;
      
      // Filter triggers that match the current context
      const matchingTriggers = (triggers as ContextTrigger[]).filter(trigger => 
        matchTriggerCondition(trigger, context)
      );
      
      return matchingTriggers;
    } else {
      // Mock implementation for local testing
      console.log('Using mock trigger processing - context_triggers table may not exist yet');
      const mockTriggers: ContextTrigger[] = [
        {
          id: '1',
          user_id: userId,
          name: 'Morning App Open',
          description: 'Morgens App öffnen',
          category: 'time',
          condition_type: 'time_morning',
          target_value: { hour_range: [6, 11] },
          action_type: 'reward_xp_small',
          active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      
      return mockTriggers.filter(trigger => 
        matchTriggerCondition(trigger, context)
      );
    }
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
