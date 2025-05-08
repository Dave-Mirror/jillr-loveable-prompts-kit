
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Gift, QrCode } from 'lucide-react';
import { UserReward } from '@/utils/challenge/rewards/types';

interface ClaimedRewardsTabProps {
  rewards: Array<{
    id: string;
    name: string;
    description: string;
    isClaimed: boolean;
  }>;
  userRewards: UserReward[];
  onOpenRewardDetails: (reward: UserReward) => void;
  onGenerateQRCode: (reward: UserReward) => void;
}

const ClaimedRewardsTab: React.FC<ClaimedRewardsTabProps> = ({ 
  rewards, 
  userRewards, 
  onOpenRewardDetails,
  onGenerateQRCode
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rewards.filter(reward => reward.isClaimed).map(reward => (
        <Card key={reward.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="flex items-center gap-2">
                <Gift className="text-jillr-neonPurple" />
                {reward.name}
              </CardTitle>
              <Badge className="bg-jillr-neonGreen">
                <div className="flex items-center gap-1">
                  <Check size={12} />
                  Eingelöst
                </div>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p>{reward.description}</p>
          </CardContent>
        </Card>
      ))}
      
      {/* Add claimed challenge rewards */}
      {userRewards.filter(r => r.claimed).map(reward => (
        <Card key={reward.id} className="overflow-hidden h-full flex flex-col">
          <div className="relative aspect-video">
            <img 
              src={reward.imageUrl || reward.image} 
              alt={reward.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-jillr-darkBlue/80 to-transparent"></div>
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-green-500">
                <span className="flex items-center gap-1">
                  <Check size={12} />
                  Eingelöst
                </span>
              </Badge>
            </div>
          </div>
          
          <CardHeader className="pb-2">
            <CardTitle className="line-clamp-1">{reward.name}</CardTitle>
          </CardHeader>
          
          <CardFooter className="mt-auto flex gap-2">
            <Button 
              onClick={() => onOpenRewardDetails(reward)}
              variant="outline"
              className="flex-1"
            >
              Details
            </Button>
            
            {/* Add QR code generation for in-store redemption */}
            {reward.type === 'product' || reward.type === 'voucher' ? (
              <Button 
                onClick={() => onGenerateQRCode(reward)}
                variant="outline"
                className="flex-1"
              >
                <QrCode className="h-4 w-4 mr-2" />
                QR-Code
              </Button>
            ) : null}
          </CardFooter>
        </Card>
      ))}
      
      {rewards.filter(reward => reward.isClaimed).length === 0 && 
       userRewards.filter(r => r.claimed).length === 0 && (
        <div className="col-span-full text-center p-8">
          <h3 className="text-xl mb-2">Keine eingelösten Rewards</h3>
          <p className="text-gray-400">Löse deine ersten Belohnungen ein!</p>
        </div>
      )}
    </div>
  );
};

export default ClaimedRewardsTab;
