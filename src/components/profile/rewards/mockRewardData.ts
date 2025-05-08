
import { UserReward } from '@/utils/challenge/rewards/types';

export const availableRewards = [
  {
    id: 'reward-1',
    name: 'Summer Fashion Drop',
    description: 'Exklusiver Zugang zum ASOS Summer Fashion Drop mit 30% Rabatt',
    requiredLevel: 5,
    isUnlocked: true,
    isClaimed: false,
    type: 'coupon'
  },
  {
    id: 'reward-2',
    name: 'VIP Club Access',
    description: 'Freier Eintritt für dich und einen Freund in Top Clubs deiner Stadt',
    requiredLevel: 10,
    isUnlocked: false,
    isClaimed: false,
    type: 'access'
  },
  {
    id: 'reward-3',
    name: 'Festival Ticket',
    description: 'Ein Ticket für das Urban Music Festival im Sommer',
    requiredLevel: 15,
    isUnlocked: false,
    isClaimed: false,
    type: 'ticket'
  },
  {
    id: 'reward-4',
    name: 'Creator Workshop',
    description: 'Exklusiver Zugang zum Content Creator Workshop',
    requiredLevel: 8,
    isUnlocked: false,
    isClaimed: false,
    type: 'ticket'
  },
  {
    id: 'reward-5',
    name: '50% Beauty Rabatt',
    description: 'Einmaliger 50% Rabatt auf alle Beauty-Produkte bei Sephora',
    requiredLevel: 3,
    isUnlocked: true,
    isClaimed: false,
    type: 'coupon'
  },
  {
    id: 'reward-6',
    name: 'Mystery Box',
    description: 'Eine exklusive Mystery Box mit Fashion und Beauty Produkten',
    requiredLevel: 12,
    isUnlocked: false,
    isClaimed: false,
    type: 'coupon'
  }
];

export const claimedRewards = [
  {
    id: 'claimed-1',
    name: 'Content Creator Badge',
    description: 'Offizielles Jillr Content Creator Badge für dein Profil',
    type: 'badge',
    date: '01.05.2023'
  },
  {
    id: 'claimed-2',
    name: 'Sneaker Rabatt 20%',
    description: '20% Rabatt auf deine nächste Sneaker-Bestellung',
    type: 'voucher',
    date: '15.04.2023'
  }
];

export const streakData = {
  currentStreak: 5,
  maxStreak: 12,
  days: [
    { date: 'Mo', completed: true },
    { date: 'Di', completed: true },
    { date: 'Mi', completed: true },
    { date: 'Do', completed: true },
    { date: 'Fr', completed: true },
    { date: 'Sa', completed: false },
    { date: 'So', completed: false }
  ]
};

// Types required for the rewards system
export interface ChallengeReward extends UserReward {
  challengeName: string;
}
