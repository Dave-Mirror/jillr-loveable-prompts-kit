
import React from 'react';
import { Award, Coins, Zap, Trophy, Smartphone } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Reward } from '@/types/dashboard';

type RewardsCardProps = {
  challengeRewards: Reward[];
}

export const RewardsCard: React.FC<RewardsCardProps> = ({ challengeRewards }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award size={20} className="text-yellow-500" />
          Belohnungen
        </CardTitle>
        <CardDescription>
          Das kannst du in dieser Challenge gewinnen
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {challengeRewards.map((reward, index) => {
            const isReachable = reward.immediate || (reward.level && reward.level <= 1000);
            
            return (
              <div 
                key={index} 
                className={`flex items-center p-3 rounded-lg border ${
                  isReachable 
                    ? 'border-green-500/30 bg-green-500/5' 
                    : 'glassmorphism'
                }`}
              >
                <div className="mr-4">
                  {reward.type === 'coins' && <Coins size={24} className="text-yellow-500" />}
                  {reward.type === 'xp' && <Zap size={24} className="text-jillr-neonPurple" />}
                  {reward.type === 'product' && <Trophy size={24} className="text-amber-500" />}
                  {reward.type === 'ticket' && <Smartphone size={24} className="text-jillr-neonBlue" />}
                  {reward.type === 'voucher' && <Award size={24} className="text-jillr-neonPink" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{reward.description}</div>
                  <div className="text-xs text-muted-foreground">
                    {reward.immediate 
                      ? 'Sofort nach Upload' 
                      : reward.level 
                        ? `Ab ${reward.level} Views` 
                        : 'Nach Verifikation'
                    }
                  </div>
                </div>
                {isReachable && (
                  <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded">
                    Erreichbar
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
