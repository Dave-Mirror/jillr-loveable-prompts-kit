
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Lock, Zap } from 'lucide-react';

interface AvailableRewardsTabProps {
  rewards: Array<{
    id: string;
    name: string;
    description: string;
    xpRequired: number;
    isClaimed: boolean;
    isUnlocked: boolean;
  }>;
  walletData: {
    xp_total: number;
  };
  onClaimReward: (rewardId: string, xpRequired: number) => Promise<void>;
}

const AvailableRewardsTab: React.FC<AvailableRewardsTabProps> = ({ 
  rewards, 
  walletData, 
  onClaimReward 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rewards.filter(reward => !reward.isClaimed).map(reward => (
        <Card key={reward.id} className={`transition-all ${!reward.isUnlocked ? 'opacity-60' : ''}`}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="flex items-center gap-2">
                <Gift className={reward.isUnlocked ? "text-jillr-neonPurple" : "text-gray-500"} />
                {reward.name}
              </CardTitle>
              {!reward.isUnlocked && <Lock size={18} className="text-gray-500" />}
            </div>
            <CardDescription className="flex items-center gap-2">
              <Zap size={14} /> {reward.xpRequired} XP benötigt
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{reward.description}</p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => onClaimReward(reward.id, reward.xpRequired)} 
              disabled={!reward.isUnlocked || reward.isClaimed}
              className={`${reward.isUnlocked ? "bg-jillr-neonPurple hover:bg-jillr-neonPurple/80" : ""} w-full`}
              variant={reward.isUnlocked ? "default" : "outline"}
              size="sm"
            >
              {reward.isUnlocked ? "Einlösen" : `${reward.xpRequired - walletData.xp_total} XP fehlen`}
            </Button>
          </CardFooter>
        </Card>
      ))}
      
      {rewards.filter(reward => !reward.isClaimed).length === 0 && (
        <div className="col-span-full text-center p-8">
          <h3 className="text-xl mb-2">Keine verfügbaren Rewards</h3>
          <p className="text-gray-400">Du hast alle Belohnungen bereits eingelöst!</p>
        </div>
      )}
    </div>
  );
};

export default AvailableRewardsTab;
