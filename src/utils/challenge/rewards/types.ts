
import { Challenge, ChallengeType } from '@/components/challenge/types';

export interface UserReward {
  id: string;
  name: string;
  description: string;
  type: 'coupon' | 'product' | 'ticket' | 'access' | 'voucher';
  image: string;
  code?: string;
  expireDate?: string;
  challengeId?: string;
  challengeName?: string;
  unlocked: boolean;
  claimed: boolean;
  claimUrl?: string;
}
