
export interface TriggerCondition {
  type: string;
  value: string;
  original: string;
  location?: string;
}

export interface TriggerAction {
  type: string;
  value: string;
  amount?: string | null;
  original: string;
}

export interface Trigger {
  id: string;
  user_id?: string;
  brand_id?: string;
  created_by: 'user' | 'brand' | 'system';
  trigger_condition: TriggerCondition;
  trigger_action: TriggerAction;
  description?: string;
  active: boolean;
  created_at: string;
}

export interface MemorySnapshot {
  id: string;
  user_id: string;
  activity_type: string;
  data: Record<string, any>;
  created_at: string;
}

export interface RewardLog {
  id: string;
  user_id: string;
  trigger_id: string;
  reward_type: string;
  xp_earned: number;
  description?: string;
  created_at: string;
}
