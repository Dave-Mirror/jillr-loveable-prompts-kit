import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Gift, BadgePercent, ShoppingBag, Ticket, Flame } from 'lucide-react';
import { UserReward } from '@/utils/challenge/rewards/types';

interface RewardChallengeTabProps {
  groupedRewards: Record<string, UserReward[]>;
  isLoading: boolean;
  openRewardDetails: (reward: UserReward) => void;
  navigate: (path: string) => void;
}

const RewardChallengeTab: React.FC<RewardChallengeTabProps> = ({ 
  groupedRewards, 
  isLoading, 
  openRewardDetails,
  navigate
}) => {
  if (isLoading) {
    return (
      <div className="text-center p-6">
        <div className="w-6 h-6 border-4 border-t-jillr-neonPurple rounded-full animate-spin mx-auto mb-4"></div>
        <p>Loading your rewards...</p>
      </div>
    );
  }

  if (Object.keys(groupedRewards).length === 0) {
    return (
      <div className="text-center p-8 bg-card rounded-lg border">
        <Gift className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
        <h3 className="text-lg font-medium mb-2">No Challenge Rewards Yet</h3>
        <p className="text-muted-foreground mb-4">
          Complete challenges to earn exclusive rewards!
        </p>
        <Button onClick={() => navigate('/explore')} size="sm">Explore Challenges</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedRewards).map(([type, typeRewards]) => (
        <div key={type}>
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            {type === 'coupon' && <BadgePercent className="text-yellow-500" />}
            {type === 'product' && <ShoppingBag className="text-jillr-neonBlue" />}
            {type === 'ticket' && <Ticket className="text-jillr-neonPink" />}
            {type === 'access' && <Flame className="text-orange-500" />}
            {type === 'voucher' && <Gift className="text-jillr-neonGreen" />}
            {type.charAt(0).toUpperCase() + type.slice(1)}s
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {typeRewards.map(reward => (
              <Card key={reward.id} className="overflow-hidden h-full flex flex-col">
                <div className="relative h-40">
                  <img 
                    src={reward.image} 
                    alt={reward.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jillr-darkBlue/80 to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <Badge className={`${reward.claimed ? 'bg-green-500' : 'bg-jillr-neonPurple'}`}>
                      {reward.claimed ? (
                        <span className="flex items-center gap-1">
                          <Check size={10} />
                          Eingelöst
                        </span>
                      ) : 'Verfügbar'}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-base line-clamp-1">{reward.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{reward.description}</CardDescription>
                </CardHeader>
                
                <CardFooter className="pt-0 mt-auto">
                  <Button 
                    onClick={() => openRewardDetails(reward)}
                    size="sm"
                    className="w-full"
                    variant={reward.claimed ? "outline" : "default"}
                  >
                    {reward.claimed ? 'Details' : 'Einlösen'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RewardChallengeTab;
