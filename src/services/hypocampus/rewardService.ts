
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { Reward, RewardLog } from '@/types/hypocampus';
import { tableExists } from './dbUtils';

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
    trigger_id: 'trigger-1',
    granted_at: new Date().toISOString(),
    status: 'granted',
    reward_type: 'xp'
  },
  {
    id: uuidv4(),
    user_id: 'user-123',
    reward_id: 'reward-2',
    trigger_id: 'trigger-2',
    granted_at: new Date(Date.now() - 86400000).toISOString(),
    status: 'granted',
    reward_type: 'xp'
  }
];

/**
 * Get available rewards
 * @returns A promise resolving to an array of rewards
 */
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

/**
 * Get reward logs for a user
 * @param userId The user's ID
 * @returns A promise resolving to an array of reward logs
 */
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

/**
 * Create a new reward log
 * @param rewardLog The reward log to create
 * @returns A promise resolving to the created reward log
 */
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
