
import { Trigger, MemorySnapshot, RewardLog } from '@/types/hypocampus';
import { v4 as uuidv4 } from 'uuid';

// Mock data for triggers
const mockTriggers: Trigger[] = [
  {
    id: uuidv4(),
    user_id: 'user-123',
    created_by: 'user',
    trigger_condition: {
      type: 'time',
      value: 'morning',
      original: 'time_morning'
    },
    trigger_action: {
      type: 'reward',
      value: 'xp_small',
      amount: '25',
      original: 'reward_xp_small'
    },
    description: 'Morgens App öffnen',
    active: true,
    created_at: new Date().toISOString()
  },
  {
    id: uuidv4(),
    user_id: 'user-123',
    created_by: 'system',
    trigger_condition: {
      type: 'location',
      value: 'home',
      original: 'location_home'
    },
    trigger_action: {
      type: 'challenge',
      value: 'suggest',
      original: 'challenge_suggest'
    },
    description: 'Zu Hause Challenge vorschlagen',
    active: true,
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: uuidv4(),
    brand_id: 'brand-1',
    created_by: 'brand',
    trigger_condition: {
      type: 'store',
      value: 'visit',
      original: 'store_visit',
      location: 'Berlin Store'
    },
    trigger_action: {
      type: 'show',
      value: 'challenge',
      original: 'show_challenge'
    },
    description: 'Store-Besuch in Berlin',
    active: false,
    created_at: new Date(Date.now() - 172800000).toISOString()
  }
];

// Mock data for reward logs
const mockRewardLogs: RewardLog[] = [
  {
    id: uuidv4(),
    user_id: 'user-123',
    trigger_id: mockTriggers[0].id,
    reward_type: 'xp',
    xp_earned: 25,
    description: 'Morgens App geöffnet',
    created_at: new Date().toISOString()
  },
  {
    id: uuidv4(),
    user_id: 'user-123',
    trigger_id: mockTriggers[1].id,
    reward_type: 'xp',
    xp_earned: 50,
    description: 'Challenge vorgeschlagen',
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

// Methods to mimic Supabase queries for triggers
export const getTriggersForUser = async (userId: string): Promise<Trigger[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockTriggers.filter(trigger => trigger.user_id === userId);
};

export const getTriggersForBrand = async (brandId: string): Promise<Trigger[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockTriggers.filter(trigger => trigger.brand_id === brandId);
};

export const createTrigger = async (trigger: Omit<Trigger, 'id' | 'created_at'>): Promise<Trigger> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newTrigger: Trigger = {
    ...trigger,
    id: uuidv4(),
    created_at: new Date().toISOString()
  };
  
  mockTriggers.push(newTrigger);
  return newTrigger;
};

export const updateTrigger = async (id: string, updates: Partial<Trigger>): Promise<Trigger> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = mockTriggers.findIndex(t => t.id === id);
  if (index === -1) throw new Error('Trigger not found');
  
  mockTriggers[index] = { ...mockTriggers[index], ...updates };
  return mockTriggers[index];
};

// Methods to mimic Supabase queries for reward logs
export const getRewardsForUser = async (userId: string): Promise<RewardLog[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRewardLogs.filter(log => log.user_id === userId);
};

export const createRewardLog = async (rewardLog: Omit<RewardLog, 'id' | 'created_at'>): Promise<RewardLog> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newLog: RewardLog = {
    ...rewardLog,
    id: uuidv4(),
    created_at: new Date().toISOString()
  };
  
  mockRewardLogs.push(newLog);
  return newLog;
};
