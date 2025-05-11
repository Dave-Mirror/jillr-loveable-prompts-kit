
import { ContextTrigger, MemorySnapshot, RewardLog, Reward, UserContextSetting } from '@/types/hypocampus';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';

// Mock data for triggers
const mockTriggers: ContextTrigger[] = [
  {
    id: uuidv4(),
    name: 'Morning App Open',
    description: 'Morgens App öffnen',
    category: 'time',
    condition_type: 'time_morning',
    target_value: { hour_range: [6, 11] },
    action_type: 'reward_xp',
    reward_id: 'reward-1',
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'Home Challenge',
    description: 'Zu Hause Challenge vorschlagen',
    category: 'location',
    condition_type: 'location_home',
    target_value: { location: 'home' },
    action_type: 'challenge_suggest',
    active: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString()
  }
];

// Mock data for rewards
const mockRewards: Reward[] = [
  {
    id: 'reward-1',
    title: 'Small XP Boost',
    description: 'A small amount of XP',
    reward_type: 'xp',
    value: 25,
    usage_limit: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 'reward-2',
    title: 'Medium XP Boost',
    description: 'A medium amount of XP',
    reward_type: 'xp',
    value: 50,
    usage_limit: 1,
    created_at: new Date().toISOString()
  }
];

// Mock data for reward logs
const mockRewardLogs: RewardLog[] = [
  {
    id: uuidv4(),
    user_id: 'user-123',
    reward_id: 'reward-1',
    trigger_id: mockTriggers[0].id,
    granted_at: new Date().toISOString(),
    status: 'granted'
  },
  {
    id: uuidv4(),
    user_id: 'user-123',
    reward_id: 'reward-2',
    trigger_id: mockTriggers[1].id,
    granted_at: new Date(Date.now() - 86400000).toISOString(),
    status: 'granted'
  }
];

// Mock data for memory snapshots
const mockMemorySnapshots: MemorySnapshot[] = [
  {
    id: uuidv4(),
    user_id: 'user-123',
    snapshot_date: new Date().toISOString().split('T')[0],
    data: { 
      hour: 9,
      screen: '/dashboard',
      activity_type: 'app_opened'
    },
    context_score: 75,
    created_at: new Date().toISOString()
  },
  {
    id: uuidv4(),
    user_id: 'user-123',
    snapshot_date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    data: { 
      challenge_id: 'chal-123',
      hour: 14,
      activity_type: 'challenge_viewed'
    },
    context_score: 65,
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

// Methods to interact with context_triggers
export const getTriggersForUser = async (userId: string): Promise<ContextTrigger[]> => {
  try {
    // Since the table doesn't exist in the DB schema yet, just return the mock data
    console.log('Using mock triggers since the tables are not yet created in Supabase');
    return mockTriggers.filter(trigger => trigger.user_id === userId || !trigger.user_id);
  } catch (err) {
    console.error('Error fetching triggers:', err);
    return mockTriggers.filter(trigger => trigger.user_id === userId || !trigger.user_id);
  }
};

export const getTriggersForBrand = async (brandId: string): Promise<ContextTrigger[]> => {
  try {
    // Since the table doesn't exist in the DB schema yet, just return the mock data
    console.log('Using mock brand triggers since the tables are not yet created in Supabase');
    return mockTriggers.filter(trigger => trigger.brand_id === brandId);
  } catch (err) {
    console.error('Error fetching brand triggers:', err);
    return mockTriggers.filter(trigger => trigger.brand_id === brandId);
  }
};

export const createTrigger = async (trigger: Omit<ContextTrigger, 'id' | 'created_at' | 'updated_at'>): Promise<ContextTrigger> => {
  try {
    // Since the table doesn't exist in the DB schema yet, just use mock data
    console.log('Using mock service since the tables are not yet created in Supabase');
    
    // Return mock data as fallback
    const newTrigger: ContextTrigger = {
      ...trigger,
      id: uuidv4(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    mockTriggers.push(newTrigger);
    return newTrigger;
  } catch (err) {
    console.error('Error creating trigger:', err);
    
    // Return mock data as fallback
    const newTrigger: ContextTrigger = {
      ...trigger,
      id: uuidv4(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    mockTriggers.push(newTrigger);
    return newTrigger;
  }
};

export const updateTrigger = async (id: string, updates: Partial<ContextTrigger>): Promise<ContextTrigger> => {
  try {
    // Since the table doesn't exist in the DB schema yet, just use mock data
    console.log('Using mock service since the tables are not yet created in Supabase');
    
    // Mock update as fallback
    const index = mockTriggers.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Trigger not found');
    
    mockTriggers[index] = { 
      ...mockTriggers[index], 
      ...updates, 
      updated_at: new Date().toISOString() 
    };
    
    return mockTriggers[index];
  } catch (err) {
    console.error('Error updating trigger:', err);
    
    // Mock update as fallback
    const index = mockTriggers.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Trigger not found');
    
    mockTriggers[index] = { 
      ...mockTriggers[index], 
      ...updates, 
      updated_at: new Date().toISOString() 
    };
    
    return mockTriggers[index];
  }
};

// Methods for rewards
export const getRewards = async (): Promise<Reward[]> => {
  try {
    // Since the table doesn't exist in the DB schema yet, just return the mock data
    console.log('Using mock rewards since the tables are not yet created in Supabase');
    return mockRewards;
  } catch (err) {
    console.error('Error fetching rewards:', err);
    return mockRewards;
  }
};

// Methods for reward logs
export const getRewardsForUser = async (userId: string): Promise<RewardLog[]> => {
  try {
    // Since the table doesn't exist in the DB schema yet, just return the mock data
    console.log('Using mock reward logs since the tables are not yet created in Supabase');
    return mockRewardLogs.filter(log => log.user_id === userId);
  } catch (err) {
    console.error('Error fetching reward logs:', err);
    return mockRewardLogs.filter(log => log.user_id === userId);
  }
};

export const createRewardLog = async (rewardLog: Omit<RewardLog, 'id' | 'granted_at'>): Promise<RewardLog> => {
  try {
    // Since the table doesn't exist in the DB schema yet, just use mock data
    console.log('Using mock service since the tables are not yet created in Supabase');
    
    // Return mock data as fallback
    const newLog: RewardLog = {
      ...rewardLog,
      id: uuidv4(),
      granted_at: new Date().toISOString()
    };
    
    mockRewardLogs.push(newLog);
    return newLog;
  } catch (err) {
    console.error('Error creating reward log:', err);
    
    // Return mock data as fallback
    const newLog: RewardLog = {
      ...rewardLog,
      id: uuidv4(),
      granted_at: new Date().toISOString()
    };
    
    mockRewardLogs.push(newLog);
    return newLog;
  }
};

// Methods for memory snapshots
export const createMemorySnapshot = async (snapshot: Partial<MemorySnapshot>): Promise<MemorySnapshot> => {
  try {
    // Ensure required fields are present
    if (!snapshot.user_id) {
      throw new Error('user_id is required');
    }

    // Since the table doesn't exist in the DB schema yet, just use mock data
    console.log('Using mock service since the tables are not yet created in Supabase');
    
    // Return mock data as fallback
    const newSnapshot: MemorySnapshot = {
      id: uuidv4(),
      user_id: snapshot.user_id || 'unknown',
      snapshot_date: snapshot.snapshot_date || new Date().toISOString().split('T')[0],
      data: snapshot.data || {},
      context_score: snapshot.context_score || 50,
      created_at: new Date().toISOString()
    };
    
    mockMemorySnapshots.push(newSnapshot);
    return newSnapshot;
  } catch (err) {
    console.error('Error creating memory snapshot:', err);
    
    // Return mock data as fallback
    const newSnapshot: MemorySnapshot = {
      id: uuidv4(),
      user_id: snapshot.user_id || 'unknown',
      snapshot_date: snapshot.snapshot_date || new Date().toISOString().split('T')[0],
      data: snapshot.data || {},
      context_score: snapshot.context_score || 50,
      created_at: new Date().toISOString()
    };
    
    mockMemorySnapshots.push(newSnapshot);
    return newSnapshot;
  }
};

export const getMemorySnapshotsForUser = async (userId: string): Promise<MemorySnapshot[]> => {
  try {
    // Since the table doesn't exist in the DB schema yet, just return the mock data
    console.log('Using mock snapshots since the tables are not yet created in Supabase');
    return mockMemorySnapshots.filter(snapshot => snapshot.user_id === userId);
  } catch (err) {
    console.error('Error fetching memory snapshots:', err);
    return mockMemorySnapshots.filter(snapshot => snapshot.user_id === userId);
  }
};

export const getUserContextSettings = async (userId: string): Promise<UserContextSetting | null> => {
  try {
    // Since the table doesn't exist in the DB schema yet, just return mock data
    console.log('Using mock settings since the tables are not yet created in Supabase');
    return {
      id: uuidv4(),
      user_id: userId,
      preferred_trigger_types: ['time', 'location'],
      time_windows: { morning: true, evening: true },
      allow_behavioral_tracking: true,
      allow_data_analysis: true,
      created_at: new Date().toISOString()
    };
  } catch (err) {
    console.error('Error fetching user context settings:', err);
    return {
      id: uuidv4(),
      user_id: userId,
      preferred_trigger_types: ['time', 'location'],
      time_windows: { morning: true, evening: true },
      allow_behavioral_tracking: true,
      allow_data_analysis: true,
      created_at: new Date().toISOString()
    };
  }
};

export const updateUserContextSettings = async (userId: string, settings: Partial<UserContextSetting>): Promise<UserContextSetting> => {
  try {
    // Since the table doesn't exist in the DB schema yet, just return mock data
    console.log('Using mock service since the tables are not yet created in Supabase');
    return {
      id: uuidv4(),
      user_id: userId,
      preferred_trigger_types: settings.preferred_trigger_types || ['time', 'location'],
      time_windows: settings.time_windows || { morning: true, evening: true },
      allow_behavioral_tracking: settings.allow_behavioral_tracking !== undefined ? settings.allow_behavioral_tracking : true,
      allow_data_analysis: settings.allow_data_analysis !== undefined ? settings.allow_data_analysis : true,
      created_at: new Date().toISOString()
    };
  } catch (err) {
    console.error('Error updating user context settings:', err);
    return {
      id: uuidv4(),
      user_id: userId,
      preferred_trigger_types: settings.preferred_trigger_types || ['time', 'location'],
      time_windows: settings.time_windows || { morning: true, evening: true },
      allow_behavioral_tracking: settings.allow_behavioral_tracking !== undefined ? settings.allow_behavioral_tracking : true,
      allow_data_analysis: settings.allow_data_analysis !== undefined ? settings.allow_data_analysis : true,
      created_at: new Date().toISOString()
    };
  }
};
