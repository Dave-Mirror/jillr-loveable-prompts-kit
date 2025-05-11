
import { ContextTrigger, MemorySnapshot, RewardLog, Reward, UserContextSetting, Trigger } from '@/types/hypocampus';
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
    status: 'granted',
    reward_type: 'xp'
  },
  {
    id: uuidv4(),
    user_id: 'user-123',
    reward_id: 'reward-2',
    trigger_id: mockTriggers[1].id,
    granted_at: new Date(Date.now() - 86400000).toISOString(),
    status: 'granted',
    reward_type: 'xp'
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

// Check if a table exists in the database
async function tableExists(tableName: string): Promise<boolean> {
  try {
    // Use system schema to check if the table exists
    const { data } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public')
      .eq('tablename', tableName)
      .single();
    
    return !!data;
  } catch (err) {
    // If this fails, the table likely doesn't exist
    return false;
  }
}

// Methods to interact with context_triggers
export const getTriggersForUser = async (userId: string): Promise<ContextTrigger[]> => {
  try {
    // Check if the context_triggers table exists
    const exists = await tableExists('context_triggers');
    
    if (exists) {
      const { data, error } = await supabase
        .from('context_triggers')
        .select('*')
        .or(`user_id.eq.${userId},user_id.is.null`);
      
      if (error) throw error;
      return data as ContextTrigger[];
    } else {
      // Return mock data if the table doesn't exist
      console.log('Using mock triggers since the context_triggers table doesn\'t exist yet');
      return mockTriggers.filter(trigger => trigger.user_id === userId || !trigger.user_id);
    }
  } catch (err) {
    console.error('Error fetching triggers:', err);
    // Return mock data as fallback
    return mockTriggers.filter(trigger => trigger.user_id === userId || !trigger.user_id);
  }
};

export const getTriggersForBrand = async (brandId: string): Promise<ContextTrigger[]> => {
  try {
    // Check if the context_triggers table exists
    const exists = await tableExists('context_triggers');
    
    if (exists) {
      const { data, error } = await supabase
        .from('context_triggers')
        .select('*')
        .eq('brand_id', brandId);
      
      if (error) throw error;
      return data as ContextTrigger[];
    } else {
      // Return mock data if the table doesn't exist
      console.log('Using mock brand triggers since the context_triggers table doesn\'t exist yet');
      return mockTriggers.filter(trigger => trigger.brand_id === brandId);
    }
  } catch (err) {
    console.error('Error fetching brand triggers:', err);
    // Return mock data as fallback
    return mockTriggers.filter(trigger => trigger.brand_id === brandId);
  }
};

export const createTrigger = async (trigger: Omit<ContextTrigger, 'id' | 'created_at' | 'updated_at'>): Promise<ContextTrigger> => {
  try {
    // Check if the context_triggers table exists
    const exists = await tableExists('context_triggers');
    
    if (exists) {
      const { data, error } = await supabase
        .from('context_triggers')
        .insert({
          ...trigger,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as ContextTrigger;
    } else {
      // Return mock data as fallback
      console.log('Using mock service since the context_triggers table doesn\'t exist yet');
      
      const newTrigger: ContextTrigger = {
        ...trigger,
        id: uuidv4(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      mockTriggers.push(newTrigger);
      return newTrigger;
    }
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
    // Check if the context_triggers table exists
    const exists = await tableExists('context_triggers');
    
    if (exists) {
      const { data, error } = await supabase
        .from('context_triggers')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as ContextTrigger;
    } else {
      // Mock update as fallback
      console.log('Using mock service since the context_triggers table doesn\'t exist yet');
      
      const index = mockTriggers.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Trigger not found');
      
      mockTriggers[index] = { 
        ...mockTriggers[index], 
        ...updates, 
        updated_at: new Date().toISOString() 
      };
      
      return mockTriggers[index];
    }
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
    // Check if the rewards table exists
    const exists = await tableExists('rewards');
    
    if (exists) {
      const { data, error } = await supabase
        .from('rewards')
        .select('*');
      
      if (error) throw error;
      return data as Reward[];
    } else {
      // Return mock data if the table doesn't exist
      console.log('Using mock rewards since the rewards table doesn\'t exist yet');
      return mockRewards;
    }
  } catch (err) {
    console.error('Error fetching rewards:', err);
    // Return mock data as fallback
    return mockRewards;
  }
};

// Methods for reward logs
export const getRewardsForUser = async (userId: string): Promise<RewardLog[]> => {
  try {
    // Check if the reward_logs table exists
    const exists = await tableExists('reward_logs');
    
    if (exists) {
      const { data, error } = await supabase
        .from('reward_logs')
        .select(`
          *,
          rewards:reward_id (*)
        `)
        .eq('user_id', userId);
      
      if (error) throw error;
      return data as RewardLog[];
    } else {
      // Return mock data if the table doesn't exist
      console.log('Using mock reward logs since the reward_logs table doesn\'t exist yet');
      return mockRewardLogs.filter(log => log.user_id === userId);
    }
  } catch (err) {
    console.error('Error fetching reward logs:', err);
    // Return mock data as fallback
    return mockRewardLogs.filter(log => log.user_id === userId);
  }
};

export const createRewardLog = async (rewardLog: Omit<RewardLog, 'id' | 'granted_at'>): Promise<RewardLog> => {
  try {
    // Check if the reward_logs table exists
    const exists = await tableExists('reward_logs');
    
    if (exists) {
      const { data, error } = await supabase
        .from('reward_logs')
        .insert({
          ...rewardLog,
          granted_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as RewardLog;
    } else {
      // Return mock data as fallback
      console.log('Using mock service since the reward_logs table doesn\'t exist yet');
      
      const newLog: RewardLog = {
        ...rewardLog,
        id: uuidv4(),
        granted_at: new Date().toISOString()
      };
      
      mockRewardLogs.push(newLog);
      return newLog;
    }
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

    // Check if the memory_snapshots table exists
    const exists = await tableExists('memory_snapshots');
    
    if (exists) {
      const { data, error } = await supabase
        .from('memory_snapshots')
        .insert({
          user_id: snapshot.user_id,
          snapshot_date: snapshot.snapshot_date || new Date().toISOString().split('T')[0],
          data: snapshot.data || {},
          context_score: snapshot.context_score || 50,
          interpreted_summary: snapshot.interpreted_summary
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as MemorySnapshot;
    } else {
      // Return mock data as fallback
      console.log('Using mock service since the memory_snapshots table doesn\'t exist yet');
      
      const newSnapshot: MemorySnapshot = {
        id: uuidv4(),
        user_id: snapshot.user_id,
        snapshot_date: snapshot.snapshot_date || new Date().toISOString().split('T')[0],
        data: snapshot.data || {},
        context_score: snapshot.context_score || 50,
        created_at: new Date().toISOString()
      };
      
      mockMemorySnapshots.push(newSnapshot);
      return newSnapshot;
    }
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
    // Check if the memory_snapshots table exists
    const exists = await tableExists('memory_snapshots');
    
    if (exists) {
      const { data, error } = await supabase
        .from('memory_snapshots')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      return data as MemorySnapshot[];
    } else {
      // Return mock data if the table doesn't exist
      console.log('Using mock snapshots since the memory_snapshots table doesn\'t exist yet');
      return mockMemorySnapshots.filter(snapshot => snapshot.user_id === userId);
    }
  } catch (err) {
    console.error('Error fetching memory snapshots:', err);
    // Return mock data as fallback
    return mockMemorySnapshots.filter(snapshot => snapshot.user_id === userId);
  }
};

export const getUserContextSettings = async (userId: string): Promise<UserContextSetting | null> => {
  try {
    // Check if the user_context_settings table exists
    const exists = await tableExists('user_context_settings');
    
    if (exists) {
      const { data, error } = await supabase
        .from('user_context_settings')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (error) throw error;
      return data as UserContextSetting;
    } else {
      // Return mock data if the table doesn't exist
      console.log('Using mock settings since the user_context_settings table doesn\'t exist yet');
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
  } catch (err) {
    console.error('Error fetching user context settings:', err);
    // Return mock data as fallback
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
    // Check if the user_context_settings table exists
    const exists = await tableExists('user_context_settings');
    
    if (exists) {
      // First check if settings already exist for this user
      const { data: existingSettings } = await supabase
        .from('user_context_settings')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (existingSettings) {
        // Update existing settings
        const { data, error } = await supabase
          .from('user_context_settings')
          .update({
            preferred_trigger_types: settings.preferred_trigger_types || existingSettings.preferred_trigger_types,
            time_windows: settings.time_windows || existingSettings.time_windows,
            allow_behavioral_tracking: settings.allow_behavioral_tracking !== undefined ? settings.allow_behavioral_tracking : existingSettings.allow_behavioral_tracking,
            allow_data_analysis: settings.allow_data_analysis !== undefined ? settings.allow_data_analysis : existingSettings.allow_data_analysis
          })
          .eq('id', existingSettings.id)
          .select()
          .single();
        
        if (error) throw error;
        return data as UserContextSetting;
      } else {
        // Create new settings
        const { data, error } = await supabase
          .from('user_context_settings')
          .insert({
            user_id: userId,
            preferred_trigger_types: settings.preferred_trigger_types || ['time', 'location'],
            time_windows: settings.time_windows || { morning: true, evening: true },
            allow_behavioral_tracking: settings.allow_behavioral_tracking !== undefined ? settings.allow_behavioral_tracking : true,
            allow_data_analysis: settings.allow_data_analysis !== undefined ? settings.allow_data_analysis : true
          })
          .select()
          .single();
        
        if (error) throw error;
        return data as UserContextSetting;
      }
    } else {
      // Return mock data if the table doesn't exist
      console.log('Using mock service since the user_context_settings table doesn\'t exist yet');
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
  } catch (err) {
    console.error('Error updating user context settings:', err);
    // Return mock data as fallback
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
