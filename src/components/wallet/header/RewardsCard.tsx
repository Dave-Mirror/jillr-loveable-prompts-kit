
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Award } from 'lucide-react';
import { UserReward } from '@/utils/challenge/rewards/types';

interface RewardsCardProps {
  userRewards: UserReward[];
}

const RewardsCard: React.FC<RewardsCardProps> = ({ userRewards }) => {
  return (
    <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPink/20 border-jillr-neonPink/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="text-jillr-neonPink" />
          Rewards
        </CardTitle>
        <CardDescription>Deine freigeschalteten Belohnungen</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold mb-2">
          {userRewards.length}
        </div>
        <div className="text-sm text-gray-400">
          {userRewards.filter(r => r.claimed).length} Belohnungen eingelöst
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardsCard;
