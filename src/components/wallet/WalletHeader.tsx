
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Coins, Zap, Award } from 'lucide-react';

interface WalletHeaderProps {
  walletData: {
    xp_total: number;
    coins_total: number;
    rewards_claimed: any[];
  };
  userRewards: any[];
  level: number;
  progress: number;
  nextLevelXP: number;
}

const WalletHeader: React.FC<WalletHeaderProps> = ({ 
  walletData, 
  userRewards, 
  level, 
  progress, 
  nextLevelXP 
}) => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Meine Wallet</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPurple/20 border-jillr-neonPurple/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="text-jillr-neonPurple" />
              XP Points
            </CardTitle>
            <CardDescription>Dein aktueller Erfahrungsstand</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">{walletData.xp_total}</div>
            <div className="mb-2">Level {level}</div>
            <Progress value={progress} className="h-2 mb-2" />
            <div className="text-sm text-gray-400">{walletData.xp_total} / {nextLevelXP} XP zum nächsten Level</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonGreen/20 border-jillr-neonGreen/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="text-jillr-neonGreen" />
              Coins
            </CardTitle>
            <CardDescription>Dein aktuelles Guthaben</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">{walletData.coins_total}</div>
            <div className="text-sm text-gray-400">Für Prämien und Belohnungen einlösbar</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPink/20 border-jillr-neonPink/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="text-jillr-neonPink" />
              Rewards
            </CardTitle>
            <CardDescription>Deine freigeschalteten Belohnungen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">
              {userRewards.length}
            </div>
            <div className="text-sm text-gray-400">
              {userRewards.filter(r => r.claimed).length} Belohnungen eingelöst
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default WalletHeader;
