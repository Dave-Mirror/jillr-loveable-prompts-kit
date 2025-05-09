
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RewardsCard } from '@/components/challenge/RewardsCard';
import { LeaderboardCard } from '@/components/challenge/LeaderboardCard';
import { UserProgressCard } from '@/components/challenge/UserProgressCard';
import LiveMapPromotion from '@/components/challenge/LiveMapPromotion';
import { SecurityInfo } from '@/components/challenge/SecurityInfo';
import { ChallengeActions } from '@/components/challenge/ChallengeActions';
import { Challenge, Submission } from '@/components/challenge/types';

interface ChallengeSidebarProps {
  challenge: Challenge;
  submissions: Submission[];
  handleJoinClick: () => void;
  requestCoachTip: () => void;
  shareChallenge: (id: string) => void;
  coachTip: string;
  isLoadingTip: boolean;
  topUsers: Array<{
    id: string;
    user_id: string;
    username: string;
    views: number;
    likes: number;
  }>;
}

export const ChallengeSidebar: React.FC<ChallengeSidebarProps> = ({
  challenge,
  submissions,
  handleJoinClick,
  requestCoachTip,
  shareChallenge,
  coachTip,
  isLoadingTip,
  topUsers
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <ChallengeActions
            handleJoinClick={handleJoinClick}
            requestCoachTip={requestCoachTip}
            shareChallenge={() => shareChallenge(challenge.id)}
            coachTip={coachTip}
            isLoadingTip={isLoadingTip}
            challenge={challenge}
          />
        </CardContent>
      </Card>
      
      <RewardsCard 
        challengeRewards={[
          { 
            type: 'xp', 
            value: challenge.xp_reward || 100, 
            icon: '⭐',
            immediate: true,
            description: `${challenge.xp_reward || 100} XP für deinen Account` 
          },
          { 
            type: 'coins', 
            value: challenge.coin_reward || 50, 
            icon: '🪙',
            immediate: false,
            description: `${challenge.coin_reward || 50} Coins für deinen Wallet`,
            level: 500
          },
        ]} 
      />
      
      <LeaderboardCard topUsers={topUsers} />
      
      <UserProgressCard 
        user={{ id: '123', name: 'User', submissions: 0 }}
        challenge={challenge}
        submissions={submissions.filter(s => s.user_id === '123')}
      />
      
      <LiveMapPromotion />
      
      <SecurityInfo />
    </div>
  );
};
