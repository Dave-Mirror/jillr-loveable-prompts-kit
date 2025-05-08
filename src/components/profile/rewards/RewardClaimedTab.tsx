
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserReward } from '@/utils/challenge/rewards/types';
import { Award, Check, Calendar, Gift, QrCode, Ticket } from 'lucide-react';

interface RewardClaimedTabProps {
  claimedRewards: any[];
  userRewards: UserReward[];
  openRewardDetails: (reward: UserReward) => void;
}

const RewardClaimedTab: React.FC<RewardClaimedTabProps> = ({
  claimedRewards,
  userRewards,
  openRewardDetails
}) => {
  const claimedUserRewards = userRewards.filter(reward => reward.claimed);
  const combinedRewards = [...claimedUserRewards, ...claimedRewards];
  
  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'voucher':
        return <Gift className="h-10 w-10 text-jillr-neonPink" />;
      case 'ticket':
        return <Ticket className="h-10 w-10 text-jillr-neonBlue" />;
      case 'badge':
        return <Award className="h-10 w-10 text-jillr-neonGreen" />;
      default:
        return <Award className="h-10 w-10 text-jillr-neonPurple" />;
    }
  };

  if (combinedRewards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="bg-jillr-darkBlue/30 inline-flex rounded-full p-4 mb-4">
          <Award className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">Keine eingelösten Rewards</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Hier werden deine eingelösten Rewards angezeigt. Löse Rewards ein, um sie hier zu sehen.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {combinedRewards.map((reward, index) => (
        <Card 
          key={reward.id || index}
          className="neon-card overflow-hidden hover:scale-[1.02] transition-all cursor-pointer"
          onClick={() => 'id' in reward ? openRewardDetails(reward) : null}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <Badge className="bg-green-500/80">
                <Check className="mr-1 h-3 w-3" />
                Claimed
              </Badge>
              {'date' in reward && (
                <Badge variant="outline" className="text-xs">
                  <Calendar className="mr-1 h-3 w-3" />
                  {reward.date}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-0 flex flex-col items-center text-center">
            <div className="p-4 mb-2 rounded-full bg-jillr-darkBlue/50">
              {getRewardIcon(reward.type)}
            </div>
            <h3 className="font-medium mb-1">{reward.name}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {reward.description}
            </p>
            <Button 
              size="sm" 
              variant="outline"
              className="border-jillr-neonPurple/30 hover:bg-jillr-neonPurple/20"
            >
              <QrCode className="mr-2 h-4 w-4" />
              Show QR Code
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RewardClaimedTab;
