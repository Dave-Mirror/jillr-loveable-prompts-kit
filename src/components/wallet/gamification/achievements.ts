
import { Trophy, Gift, Zap, Crown } from 'lucide-react';
import { UserReward } from '@/utils/challenge/rewards/types';
import { ReactNode } from 'react';

export interface Achievement {
  name: string;
  description: string;
  completed: boolean;
  icon: ReactNode;
}

export const getAchievements = (userRewards: UserReward[], xp: number, level: number): Achievement[] => [
  { 
    name: "Erster Erfolg", 
    description: "Schließe deine erste Challenge ab", 
    completed: userRewards.length > 0,
    icon: Trophy 
  },
  { 
    name: "Sammelwut", 
    description: "Sammle 5 verschiedene Belohnungen", 
    completed: userRewards.length >= 5,
    icon: Gift 
  },
  { 
    name: "XP Master", 
    description: "Erreiche 5000 XP", 
    completed: xp >= 5000,
    icon: Zap 
  },
  { 
    name: "Elite Creator", 
    description: "Erreiche Level 10", 
    completed: level >= 10,
    icon: Crown 
  }
];
