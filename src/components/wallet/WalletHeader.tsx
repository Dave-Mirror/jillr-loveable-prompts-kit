
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Coins, Zap, Award, TrendingUp, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
  boostedChallenges?: {
    id: string;
    title: string;
    xpMultiplier: number;
  }[];
}

const WalletHeader: React.FC<WalletHeaderProps> = ({ 
  walletData, 
  userRewards, 
  level, 
  progress, 
  nextLevelXP,
  boostedChallenges = []
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Meine Wallet</h1>
        
        <div className="flex items-center gap-2">
          {level >= 10 && (
            <Badge variant="outline" className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-300 text-black border-0">
              <Star className="h-3 w-3" />
              VIP Status
            </Badge>
          )}
          
          {level >= 5 && level < 10 && (
            <Badge variant="outline" className="flex items-center gap-1 bg-gradient-to-r from-slate-300 to-slate-100 text-black border-0">
              <Star className="h-3 w-3" />
              Premium Status
            </Badge>
          )}
          
          <Button variant="outline" size="sm" asChild>
            <Link to="/shop">
              <Coins className="mr-2 h-4 w-4 text-jillr-neonGreen" />
              Shop
            </Link>
          </Button>
        </div>
      </div>
      
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
            {walletData.coins_total >= 5000 && (
              <div className="mt-2 text-xs flex items-center gap-1 text-jillr-neonGreen">
                <TrendingUp className="h-3 w-3" />
                Genug für Premium-Belohnungen
              </div>
            )}
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
      
      {boostedChallenges && boostedChallenges.length > 0 && (
        <Alert className="mb-6 bg-jillr-neonPurple/10 border-jillr-neonPurple">
          <TrendingUp className="h-4 w-4 text-jillr-neonPurple" />
          <AlertDescription className="flex flex-col">
            <span className="font-medium">Doppelte XP-Challenges verfügbar!</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {boostedChallenges.map(challenge => (
                <Badge key={challenge.id} variant="outline" className="bg-jillr-neonPurple/20">
                  {challenge.title} ({challenge.xpMultiplier}x XP)
                </Badge>
              ))}
            </div>
            <Button size="sm" variant="outline" className="mt-2 w-fit" asChild>
              <Link to="/explore">Jetzt teilnehmen</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default WalletHeader;
