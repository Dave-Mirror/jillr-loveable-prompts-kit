
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Award } from 'lucide-react';
import { RewardsCardProps } from './types';

export const RewardsCard: React.FC<RewardsCardProps> = ({ challengeRewards }) => {
  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'xp':
        return <Award className="h-5 w-5 text-yellow-400" />;
      case 'coins':
        return <Gift className="h-5 w-5 text-amber-500" />;
      default:
        return <Gift className="h-5 w-5 text-blue-400" />;
    }
  };

  const getRewardDescription = (type: string, value: number) => {
    switch (type) {
      case 'xp':
        return `${value} XP für deinen Account`;
      case 'coins':
        return `${value} Coins für deinen Wallet`;
      default:
        return `${value} ${type}`;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Gift className="h-5 w-5 text-jillr-neonPurple" />
          Rewards
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {challengeRewards.map((reward, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-jillr-darkBlue">
                  {getRewardIcon(reward.type)}
                </div>
                <div>
                  <p className="font-medium">{reward.value} {reward.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {getRewardDescription(reward.type, reward.value)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardsCard;
