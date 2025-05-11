
import { ContextTrigger, Reward } from '@/types/hypocampus';
import { createTrigger } from '@/services/mockHypocampusService';
import { getConditionLabel, getActionLabel } from '../config/triggerOptions';

export interface TriggerCreationParams {
  user: any;
  triggerCondition: string;
  triggerAction: string;
  description: string;
  frequency: number;
  priority: number;
  requiresMultipleConditions: boolean;
  triggerType: 'personal' | 'brand';
  rewards: Reward[];
}

export const saveTrigger = async (params: TriggerCreationParams): Promise<void> => {
  const {
    user,
    triggerCondition,
    triggerAction,
    description,
    frequency,
    priority,
    requiresMultipleConditions,
    triggerType,
    rewards
  } = params;
  
  // Parse the condition type and value
  const [conditionType, conditionValue] = triggerCondition.split('_');
  
  // Parse action type and potential reward
  const [actionType, actionValue, actionAmount] = triggerAction.split('_');
  
  // Find matching reward if this is a reward action
  let rewardId: string | undefined;
  if (actionType === 'reward') {
    const matchingReward = rewards.find(r => 
      r.reward_type === 'xp' && 
      ((actionValue === 'xp_small' && r.value === 25) ||
       (actionValue === 'xp_medium' && r.value === 50) ||
       (actionValue === 'xp_large' && r.value === 100))
    );
    rewardId = matchingReward?.id;
  }
  
  // Generate trigger name if description is empty
  const triggerName = description || 
    `${getConditionLabel(triggerCondition)} → ${getActionLabel(triggerAction)}`;
  
  // Create trigger object
  const newTrigger: Omit<ContextTrigger, 'id' | 'created_at' | 'updated_at'> = {
    name: triggerName,
    description: description || `Auto-generated trigger for ${conditionType} ${conditionValue}`,
    category: conditionType,
    condition_type: triggerCondition,
    target_value: { 
      type: conditionType,
      value: conditionValue,
      frequency,
      priority,
      requires_multiple_conditions: requiresMultipleConditions
    },
    action_type: triggerAction,
    reward_id: rewardId,
    active: true,
    user_id: user.id,
    // Handle brand_id safely by checking if user email includes 'brand'
    ...(triggerType === 'brand' && user.email?.includes('brand') ? { brand_id: 'demo-brand-id' } : {})
  };

  // Save the trigger
  await createTrigger(newTrigger);
};
