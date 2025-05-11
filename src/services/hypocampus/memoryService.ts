
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { MemorySnapshot, UserContextSetting } from '@/types/hypocampus';
import { tableExists } from './dbUtils';

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

/**
 * Create a new memory snapshot
 * @param snapshot The memory snapshot to create
 * @returns A promise resolving to the created memory snapshot
 */
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

/**
 * Get memory snapshots for a user
 * @param userId The user's ID
 * @returns A promise resolving to an array of memory snapshots
 */
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

/**
 * Get user context settings
 * @param userId The user's ID
 * @returns A promise resolving to the user's context settings
 */
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

/**
 * Update user context settings
 * @param userId The user's ID
 * @param settings The settings to update
 * @returns A promise resolving to the updated user context settings
 */
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
