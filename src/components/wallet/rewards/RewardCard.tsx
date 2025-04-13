
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { UserReward } from '@/utils/challenge/rewards/types';

interface RewardCardProps {
  reward: UserReward;
  onOpenRewardDetails: (reward: UserReward) => void;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, onOpenRewardDetails }) => {
  return (
    <Card key={reward.id} className="overflow-hidden h-full flex flex-col">
      <div className="relative aspect-video">
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
                <Check size={12} />
                Eingelöst
              </span>
            ) : 'Verfügbar'}
          </Badge>
        </div>
        {reward.challengeName && (
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-jillr-darkBlue/60 backdrop-blur-sm">
              {reward.challengeName}
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1">{reward.name}</CardTitle>
        <CardDescription className="line-clamp-2">{reward.description}</CardDescription>
      </CardHeader>
      
      <CardFooter className="mt-auto">
        <Button 
          onClick={() => onOpenRewardDetails(reward)}
          className="w-full bg-jillr-neonBlue hover:bg-jillr-neonBlue/80"
        >
          {reward.claimed ? 'Details anzeigen' : 'Belohnung einlösen'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RewardCard;
