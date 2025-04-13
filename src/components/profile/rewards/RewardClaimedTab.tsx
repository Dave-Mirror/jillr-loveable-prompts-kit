
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Gift } from 'lucide-react';
import { UserReward } from '@/utils/challenge/userRewards';

interface ClaimedRewardItem {
  id: string;
  name: string;
  description: string;
  type: string;
  code?: string;
  expireDate?: string;
}

interface RewardClaimedTabProps {
  claimedRewards: ClaimedRewardItem[];
  userRewards: UserReward[];
  openRewardDetails: (reward: UserReward) => void;
}

const RewardClaimedTab: React.FC<RewardClaimedTabProps> = ({ 
  claimedRewards, 
  userRewards, 
  openRewardDetails
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {claimedRewards.length > 0 ? (
        claimedRewards.map(reward => (
          <Card key={reward.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-2 text-base">
                  {reward.type === 'coupon' && <Gift className="h-5 w-5 text-jillr-neonPink" />}
                  {reward.name}
                </CardTitle>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                  <Check size={12} className="mr-1" /> Claimed
                </Badge>
              </div>
              <CardDescription>
                {reward.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="py-2">
              <div className="bg-jillr-darkBlue/30 rounded-md p-3 font-mono text-center">
                {reward.code}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Valid until {reward.expireDate && new Date(reward.expireDate).toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full" size="sm">Use Reward</Button>
            </CardFooter>
          </Card>
        ))
      ) : null}
      
      {/* Challenge rewards that have been claimed */}
      {userRewards.filter(r => r.claimed).map(reward => (
        <Card key={reward.id} className="overflow-hidden flex flex-col">
          <div className="relative h-32">
            <img 
              src={reward.image} 
              alt={reward.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-jillr-darkBlue/80 to-transparent"></div>
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-green-500">
                <span className="flex items-center gap-1">
                  <Check size={10} />
                  Claimed
                </span>
              </Badge>
            </div>
          </div>
          
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-sm">{reward.name}</CardTitle>
          </CardHeader>
          
          <CardFooter className="pt-0">
            <Button 
              onClick={() => openRewardDetails(reward)}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Details
            </Button>
          </CardFooter>
        </Card>
      ))}
      
      {claimedRewards.length === 0 && userRewards.filter(r => r.claimed).length === 0 && (
        <Card className="col-span-full">
          <CardContent className="p-8 text-center">
            <Gift className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-medium mb-2">No Claimed Rewards Yet</h3>
            <p className="text-muted-foreground mb-4">
              You haven't claimed any rewards yet. Check the available rewards to get started!
            </p>
            <Button>View Available Rewards</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RewardClaimedTab;
