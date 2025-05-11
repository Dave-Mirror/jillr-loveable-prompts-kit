
import { supabase } from '@/integrations/supabase/client';

interface TriggerCondition {
  type: string;
  value: string;
  original: string;
}

interface TriggerAction {
  type: string;
  value: string;
  amount?: string | null;
  original: string;
}

interface Trigger {
  id: string;
  user_id: string;
  created_by: 'user' | 'brand' | 'system';
  trigger_condition: TriggerCondition;
  trigger_action: TriggerAction;
  description?: string;
  active: boolean;
}

export const processTriggers = async (userId: string, context: any) => {
  if (!userId) return [];
  
  try {
    // Get all active triggers for this user
    const { data: triggers, error } = await supabase
      .from('context_triggers')
      .select('*')
      .eq('user_id', userId)
      .eq('active', true);
    
    if (error) throw error;
    if (!triggers || triggers.length === 0) return [];
    
    const matchedTriggers: Trigger[] = [];
    
    // Check each trigger against the current context
    for (const trigger of triggers) {
      if (matchTriggerCondition(trigger.trigger_condition, context)) {
        matchedTriggers.push(trigger);
        
        // Record the trigger match in rewards_log if it's a reward
        if (trigger.trigger_action.type === 'reward') {
          await recordReward(userId, trigger);
        }
      }
    }
    
    return matchedTriggers;
  } catch (error) {
    console.error('Error processing triggers:', error);
    return [];
  }
};

const matchTriggerCondition = (condition: TriggerCondition, context: any): boolean => {
  // Match based on condition type
  switch (condition.type) {
    case 'time':
      const hour = context.hour || new Date().getHours();
      
      if (condition.value === 'morning' && hour >= 6 && hour < 11) return true;
      if (condition.value === 'noon' && hour >= 11 && hour < 14) return true;
      if (condition.value === 'evening' && hour >= 14 && hour < 22) return true;
      if (condition.value === 'night' && (hour >= 22 || hour < 6)) return true;
      break;
      
    case 'location':
      if (context.location_type === condition.value) return true;
      break;
      
    case 'activity':
      if (context.activity === condition.value) return true;
      break;
      
    case 'weather':
      if (context.weather === condition.value) return true;
      break;
      
    case 'mood':
      if (context.mood === condition.value) return true;
      break;
  }
  
  return false;
};

const recordReward = async (userId: string, trigger: Trigger) => {
  try {
    let xpAmount = 0;
    
    // Extract XP amount from the action
    if (trigger.trigger_action.amount) {
      xpAmount = parseInt(trigger.trigger_action.amount);
    } else {
      // Default amounts based on reward type
      if (trigger.trigger_action.value === 'xp_small') xpAmount = 25;
      if (trigger.trigger_action.value === 'xp_medium') xpAmount = 50;
      if (trigger.trigger_action.value === 'xp_large') xpAmount = 100;
    }
    
    // Record the reward
    if (xpAmount > 0) {
      await supabase.from('rewards_log').insert({
        user_id: userId,
        trigger_id: trigger.id,
        reward_type: 'xp',
        xp_earned: xpAmount,
        description: trigger.description || `Belohnung für: ${trigger.trigger_condition.value}`
      });
      
      // Also update the user's total XP in the wallet table
      const { data, error } = await supabase
        .from('wallets')
        .select('xp_total')
        .eq('user_id', userId)
        .single();
      
      if (!error && data) {
        await supabase
          .from('wallets')
          .update({ xp_total: data.xp_total + xpAmount })
          .eq('user_id', userId);
      }
    }
  } catch (error) {
    console.error('Error recording reward:', error);
  }
};

export default {
  processTriggers
};
