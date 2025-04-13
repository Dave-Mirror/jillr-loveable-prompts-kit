
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gift, Flame, Calendar } from 'lucide-react';

interface AvailableRewardItem {
  id: string;
  name: string;
  description: string;
  requiredLevel: number;
  isUnlocked: boolean;
  isClaimed: boolean;
  type: string;
}

interface RewardAvailableTabProps {
  availableRewards: AvailableRewardItem[];
}

const RewardAvailableTab: React.FC<RewardAvailableTabProps> = ({ availableRewards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {availableRewards.map(reward => (
        <Card key={reward.id} className="transition-all">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="flex items-center gap-2 text-base">
                {reward.type === 'coupon' && <Gift className="h-5 w-5 text-jillr-neonPink" />}
                {reward.type === 'access' && <Flame className="h-5 w-5 text-orange-500" />}
                {reward.type === 'ticket' && <Calendar className="h-5 w-5 text-jillr-neonBlue" />}
                {reward.name}
              </CardTitle>
              <Badge variant={reward.isUnlocked ? "default" : "outline"}>
                {reward.isUnlocked ? "Available" : `Level ${reward.requiredLevel}`}
              </Badge>
            </div>
            <CardDescription>
              {reward.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-2">
            <Button 
              className="w-full" 
              disabled={!reward.isUnlocked}
              variant={reward.isUnlocked ? "default" : "outline"}
              size="sm"
            >
              {reward.isUnlocked ? "Claim Reward" : `Unlock at Level ${reward.requiredLevel}`}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default RewardAvailableTab;
