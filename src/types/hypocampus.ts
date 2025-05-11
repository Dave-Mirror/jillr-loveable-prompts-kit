
export interface ContextTrigger {
  id: string;
  user_id?: string;
  brand_id?: string;
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
  // Erweiterte Eigenschaften
  frequency?: number;
  priority?: number;
  requires_multiple_conditions?: boolean;
  target_audience?: string[];
  expiration_date?: string;
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
  // Neue Eigenschaften
  brand_id?: string;
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  image_url?: string;
  conditions?: Record<string, any>;
}

export interface RewardLog {
  id: string;
  user_id: string;
  reward_id: string;
  trigger_id: string;
  granted_at: string;
  status: string;
  reward_type?: string; // This field exists now in our DB
  rewards?: Reward; // For joined queries
  // Neue Eigenschaften
  expiration_date?: string;
  usage_count?: number;
  conversion_data?: Record<string, any>;
}

export interface UserContextSetting {
  id: string;
  user_id: string;
  preferred_trigger_types: string[];
  time_windows: Record<string, any>;
  allow_behavioral_tracking: boolean;
  allow_data_analysis: boolean;
  created_at: string;
  // Neue Eigenschaften
  notification_preferences?: {
    reward_notifications?: boolean;
    trigger_notifications?: boolean;
    daily_summary?: boolean;
  };
  privacy_settings?: {
    share_triggers?: boolean;
    share_rewards?: boolean;
    public_activity?: boolean;
  };
}

// Neue Schnittstellen für erweiterte Funktionalität

export interface TriggerStatistics {
  trigger_id: string;
  activations: number;
  rewards_granted: number;
  conversion_rate: number;
  most_active_times?: Record<string, number>;
  most_active_locations?: Record<string, number>;
}

export interface BrandTriggerSettings {
  brand_id: string;
  allowed_trigger_types: string[];
  max_rewards_per_user: number;
  target_audience: {
    age_range?: [number, number];
    interests?: string[];
    locations?: string[];
  };
  campaign_id?: string;
  goal?: 'engagement' | 'conversion' | 'loyalty' | 'awareness';
}

// Add Trigger alias for backward compatibility
export type Trigger = ContextTrigger;
