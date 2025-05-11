
export interface ContextTrigger {
  id: string;
  name: string;
  description?: string;
  category?: string;
  condition_type: string;
  target_value: Record<string, any>;
  action_type: string;
  reward_id?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MemorySnapshot {
  id: string;
  user_id: string;
  snapshot_date: string;
  data: Record<string, any>;
  interpreted_summary?: string;
  context_score?: number;
  created_at: string;
}

export interface Reward {
  id: string;
  title: string;
  description?: string;
  reward_type: string;
  value: number;
  usage_limit: number;
  expires_at?: string;
  created_at: string;
}

export interface RewardLog {
  id: string;
  user_id: string;
  reward_id: string;
  trigger_id: string;
  granted_at: string;
  status: string;
}

export interface UserContextSetting {
  id: string;
  user_id: string;
  preferred_trigger_types: string[];
  time_windows: Record<string, any>;
  allow_behavioral_tracking: boolean;
  allow_data_analysis: boolean;
  created_at: string;
}
