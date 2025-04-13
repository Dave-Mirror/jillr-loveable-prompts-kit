
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Gift, BadgePercent, ShoppingBag, Ticket, Flame } from 'lucide-react';
import { UserReward } from '@/utils/challenge/rewards/types';
import { useNavigate } from 'react-router-dom';

interface ChallengeRewardsTabProps {
  groupedRewards: Record<string, UserReward[]>;
  onOpenRewardDetails: (reward: UserReward) => void;
}

const ChallengeRewardsTab: React.FC<ChallengeRewardsTabProps> = ({ groupedRewards, onOpenRewardDetails }) => {
  const navigate = useNavigate();

  return (
    <>
      {Object.keys(groupedRewards).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedRewards).map(([type, typeRewards]) => (
            <div key={type}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                {type === 'coupon' && <BadgePercent className="text-yellow-500" />}
                {type === 'product' && <ShoppingBag className="text-jillr-neonBlue" />}
                {type === 'ticket' && <Ticket className="text-jillr-neonPink" />}
                {type === 'access' && <Flame className="text-orange-500" />}
                {type === 'voucher' && <Gift className="text-jillr-neonGreen" />}
                {type.charAt(0).toUpperCase() + type.slice(1)}s
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {typeRewards.map(reward => (
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
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-card rounded-lg border">
          <Gift className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-medium mb-2">Keine Challenge-Belohnungen</h3>
          <p className="text-muted-foreground mb-4">
            Nimm an Challenges teil und gewinne exklusive Belohnungen!
          </p>
          <Button onClick={() => navigate('/explore')}>Challenges entdecken</Button>
        </div>
      )}
    </>
  );
};

export default ChallengeRewardsTab;
