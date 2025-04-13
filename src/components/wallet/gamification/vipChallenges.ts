
import { Zap, Rocket, Star, Crown, LucideIcon } from 'lucide-react';

export interface VipChallenge {
  name: string;
  description: string;
  requiredLevel: number;
  reward: string;
  icon: LucideIcon;
}

export const getVipChallenges = (): VipChallenge[] => [
  { 
    name: "Fashion Creator Challenge", 
    description: "Erstelle ein Fashion-Video mit unserem Produkt", 
    requiredLevel: 3, 
    reward: "500 Coins + Exklusives Produkt", 
    icon: Zap 
  },
  { 
    name: "VIP Product Launch", 
    description: "Sei Teil unseres nächsten großen Produkt-Launches", 
    requiredLevel: 5, 
    reward: "1000 Coins + Zugang zur Pre-Launch Party", 
    icon: Rocket 
  },
  { 
    name: "Star Creator Programm", 
    description: "Werde offizieller Markenbotschafter für 3 Monate", 
    requiredLevel: 8, 
    reward: "2500 Coins + monatliche Produkte", 
    icon: Star 
  },
  { 
    name: "Platinum Exclusive", 
    description: "Exklusiver Zugang zu unserem VIP-Event", 
    requiredLevel: 12, 
    reward: "5000 Coins + VIP Ticket", 
    icon: Crown 
  }
];
