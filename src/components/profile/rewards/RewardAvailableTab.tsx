
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gift, Flame, Calendar, Lock, Trophy } from 'lucide-react';

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
  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'coupon':
        return <Gift className="h-5 w-5 text-jillr-neonPink" />;
      case 'access':
        return <Flame className="h-5 w-5 text-orange-500" />;
      case 'ticket':
        return <Calendar className="h-5 w-5 text-jillr-neonBlue" />;
      default:
        return <Trophy className="h-5 w-5 text-jillr-neonPurple" />;
    }
  };

  const getCardGradient = (type: string, isUnlocked: boolean) => {
    if (!isUnlocked) {
      return 'from-gray-800/20 to-transparent border-gray-500/20';
    }
    
    switch (type) {
      case 'coupon':
        return 'from-jillr-neonPink/10 to-transparent border-jillr-neonPink/20';
      case 'access':
        return 'from-orange-500/10 to-transparent border-orange-500/20';
      case 'ticket':
        return 'from-jillr-neonBlue/10 to-transparent border-jillr-neonBlue/20';
      default:
        return 'from-jillr-neonPurple/10 to-transparent border-jillr-neonPurple/20';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {availableRewards.map(reward => (
        <Card 
          key={reward.id} 
          className={`bg-gradient-to-br ${getCardGradient(reward.type, reward.isUnlocked)} transition-all hover:scale-[1.02]`}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="flex items-center gap-2 text-base">
                {getRewardIcon(reward.type)}
                {reward.name}
              </CardTitle>
              <Badge variant={reward.isUnlocked ? "default" : "outline"} className={reward.isUnlocked ? 
                "bg-jillr-neonGreen/80 text-white" : 
                "border-muted-foreground/50"
              }>
                {reward.isUnlocked ? "Available" : `Level ${reward.requiredLevel}`}
              </Badge>
            </div>
            <CardDescription className="line-clamp-2">
              {reward.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-2">
            <Button 
              className="w-full" 
              disabled={!reward.isUnlocked}
              variant={reward.isUnlocked ? "default" : "secondary"}
              size="sm"
            >
              {reward.isUnlocked ? (
                <>
                  <Gift className="mr-2 h-4 w-4" /> Claim Reward
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" /> Unlock at Level {reward.requiredLevel}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default RewardAvailableTab;
