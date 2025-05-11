
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { ContextTrigger } from '@/types/hypocampus';
import { tableExists } from './dbUtils';

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

/**
 * Get triggers for a specific user
 * @param userId The user's ID
 * @returns A promise resolving to an array of triggers
 */
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

/**
 * Get triggers for a specific brand
 * @param brandId The brand's ID
 * @returns A promise resolving to an array of triggers
 */
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

/**
 * Create a new trigger
 * @param trigger The trigger to create
 * @returns A promise resolving to the created trigger
 */
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

/**
 * Update an existing trigger
 * @param id The ID of the trigger to update
 * @param updates The updates to apply to the trigger
 * @returns A promise resolving to the updated trigger
 */
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
