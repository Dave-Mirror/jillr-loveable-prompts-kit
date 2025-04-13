
import { UserReward } from './types';

// Mock/sample rewards for development
export const getSampleRewards = (): UserReward[] => {
  return [
    {
      id: 'reward1',
      name: 'Nike Rabattcode',
      description: '20% Rabatt auf deine nächste Bestellung',
      type: 'coupon',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500',
      code: 'NIKE20',
      expireDate: '2025-12-31',
      unlocked: true,
      claimed: false,
      claimUrl: '/shop?code=NIKE20'
    },
    {
      id: 'reward2',
      name: 'Exclusive Sneaker Release',
      description: 'Frühzeitiger Zugang zum neuesten Sneaker-Release',
      type: 'access',
      image: 'https://images.unsplash.com/photo-1527866512907-61d64dc45a5d?q=80&w=500',
      unlocked: true,
      claimed: true,
      claimUrl: '/shop/exclusive'
    },
    {
      id: 'reward3',
      name: 'VIP Festival Ticket',
      description: 'Zugang zur VIP-Lounge beim nächsten Festival',
      type: 'ticket',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=500',
      code: 'VIPFEST24',
      expireDate: '2025-09-30',
      unlocked: true,
      claimed: false,
      claimUrl: '/events?code=VIPFEST24'
    },
    {
      id: 'reward4',
      name: 'Limitiertes T-Shirt',
      description: 'Exklusives Creator T-Shirt in limitierter Auflage',
      type: 'product',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=500',
      unlocked: true,
      claimed: false,
      claimUrl: '/shop/product/tshirt'
    }
  ];
};
