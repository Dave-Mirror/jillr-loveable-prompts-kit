
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Award, Clock, Trophy } from 'lucide-react';
import { RewardsCardProps } from './types';
import { Badge } from '@/components/ui/badge';

// Updated reward type to match what's used in the component
interface ChallengeReward {
  type: string;
  value: number;
  icon: string;
  description?: string;
  immediate?: boolean;
  level?: number;
}

// Update the props interface to use our enhanced type
export interface EnhancedRewardsCardProps {
  challengeRewards: ChallengeReward[];
}

export const RewardsCard: React.FC<EnhancedRewardsCardProps> = ({ challengeRewards }) => {
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
                    {reward.description || getRewardDescription(reward.type, reward.value)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                {reward.immediate !== undefined && (
                  <Badge variant={reward.immediate ? "default" : "outline"} className="text-xs">
                    {reward.immediate ? (
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Sofort</span>
                    ) : (
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Nach Verifizierung</span>
                    )}
                  </Badge>
                )}
                {reward.level !== undefined && (
                  <Badge variant="secondary" className="text-xs">
                    <span className="flex items-center gap-1"><Trophy className="h-3 w-3" /> Ab {reward.level}+ Views</span>
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardsCard;
