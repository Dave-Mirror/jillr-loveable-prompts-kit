
import { ReactNode } from 'react';
import { Zap, Rocket, Star, Crown } from 'lucide-react';

export interface VipChallenge {
  name: string;
  description: string;
  requiredLevel: number;
  reward: string;
  icon: ReactNode;
}

export const getVipChallenges = (): VipChallenge[] => [
  { 
    name: "Fashion Creator Challenge", 
    description: "Erstelle ein Fashion-Video mit unserem Produkt", 
    requiredLevel: 3, 
    reward: "500 Coins + Exklusives Produkt", 
    icon: <Zap className="h-5 w-5 text-jillr-neonPink" /> 
  },
  { 
    name: "VIP Product Launch", 
    description: "Sei Teil unseres nächsten großen Produkt-Launches", 
    requiredLevel: 5, 
    reward: "1000 Coins + Zugang zur Pre-Launch Party", 
    icon: <Rocket className="h-5 w-5 text-jillr-neonPurple" /> 
  },
  { 
    name: "Star Creator Programm", 
    description: "Werde offizieller Markenbotschafter für 3 Monate", 
    requiredLevel: 8, 
    reward: "2500 Coins + monatliche Produkte", 
    icon: <Star className="h-5 w-5 text-yellow-500" /> 
  },
  { 
    name: "Platinum Exclusive", 
    description: "Exklusiver Zugang zu unserem VIP-Event", 
    requiredLevel: 12, 
    reward: "5000 Coins + VIP Ticket", 
    icon: <Crown className="h-5 w-5 text-jillr-neonBlue" /> 
  }
];
