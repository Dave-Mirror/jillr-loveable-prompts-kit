
import React from 'react';
import { UserReward } from '@/utils/challenge/rewards/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Ticket, Gift, Star, Check, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="p-4">
            <div className="flex items-start gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'voucher':
        return <Gift className="h-6 w-6 text-jillr-neonPink" />;
      case 'ticket':
        return <Ticket className="h-6 w-6 text-jillr-neonBlue" />;
      case 'badge':
        return <Award className="h-6 w-6 text-jillr-neonGreen" />;
      default:
        return <Trophy className="h-6 w-6 text-jillr-neonPurple" />;
    }
  };

  const getCardGradient = (type: string) => {
    switch (type) {
      case 'voucher':
        return 'from-jillr-neonPink/10 to-transparent border-jillr-neonPink/20';
      case 'ticket':
        return 'from-jillr-neonBlue/10 to-transparent border-jillr-neonBlue/20';
      case 'badge':
        return 'from-jillr-neonGreen/10 to-transparent border-jillr-neonGreen/20';
      default:
        return 'from-jillr-neonPurple/10 to-transparent border-jillr-neonPurple/20';
    }
  };

  if (Object.keys(groupedRewards).length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-jillr-darkBlue/30 inline-flex rounded-full p-4 mb-4">
          <Trophy className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">Keine Challenge Rewards</h3>
        <p className="text-muted-foreground mb-4">
          Nimm an Challenges teil, um exklusive Rewards freizuschalten!
        </p>
        <Button onClick={() => navigate('/explore')}>
          Challenges entdecken <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedRewards).map(([challengeName, rewards]) => (
        <div key={challengeName} className="space-y-3">
          <h3 className="text-lg font-medium flex items-center">
            <Star className="text-yellow-500 mr-2 h-5 w-5" />
            {challengeName}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.map((reward) => (
              <Card 
                key={reward.id}
                className={`bg-gradient-to-br ${getCardGradient(reward.type)} relative overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer group`}
                onClick={() => openRewardDetails(reward)}
              >
                <div className="p-4 flex gap-3">
                  <div className="p-3 bg-jillr-darkBlue/50 rounded-full">
                    {getRewardIcon(reward.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{reward.name}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{reward.description}</p>
                      </div>
                      
                      {reward.claimed && (
                        <Badge className="bg-green-500/80">
                          <Check className="mr-1 h-3 w-3" />
                          Claimed
                        </Badge>
                      )}
                    </div>
                    
                    <div className="mt-3">
                      <Button 
                        size="sm"
                        variant={reward.claimed ? "outline" : "default"}
                        className={reward.claimed 
                          ? "text-white/80 border-white/20 hover:bg-white/10" 
                          : "bg-jillr-neonPurple hover:bg-jillr-neonPurple/80"
                        }
                      >
                        {reward.claimed ? 'Details anzeigen' : 'Reward einlösen'}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-jillr-neonPurple/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RewardChallengeTab;
