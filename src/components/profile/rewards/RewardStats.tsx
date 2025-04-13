
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Zap, Award, Flame, ShoppingBag, ExternalLink } from 'lucide-react';
import { useRewards } from './RewardsContext';

interface StreakData {
  currentStreak: number;
  bestStreak: number;
  nextReward: {
    days: number;
    reward: string;
  };
}

interface RewardStatsProps {
  streakData: StreakData;
}

const RewardStats: React.FC<RewardStatsProps> = ({ streakData }) => {
  const { userProfile } = useRewards() as any;
  
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonGreen/10 border-jillr-neonGreen/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-yellow-500" />
            Jillr Coins
          </CardTitle>
          <CardDescription>
            Your current coin balance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold">{userProfile.coins || 0}</div>
            <p className="text-sm text-muted-foreground">Available Coins</p>
          </div>
          
          <Button className="w-full flex items-center gap-2" asChild>
            <a href="/wallet">
              <ShoppingBag className="h-4 w-4" />
              Visit Rewards Shop
            </a>
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Daily Streak
          </CardTitle>
          <CardDescription>
            Your consecutive activity days
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold">{streakData.currentStreak}</div>
              <p className="text-xs text-muted-foreground">Current Streak</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{streakData.bestStreak}</div>
              <p className="text-xs text-muted-foreground">Best Streak</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{streakData.nextReward.days}</div>
              <p className="text-xs text-muted-foreground">Days to Reward</p>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <div 
                key={i} 
                className={`aspect-square rounded-full flex items-center justify-center text-xs ${
                  i < streakData.currentStreak % 7
                    ? 'bg-orange-500/80 text-white'
                    : 'bg-jillr-darkBlue/30 text-muted-foreground'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
          
          <div className="bg-jillr-darkBlue/30 p-3 rounded-md">
            <p className="text-sm flex justify-between">
              <span>Next reward:</span>
              <span className="font-medium">{streakData.nextReward.reward}</span>
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">VIP Rewards Shop</CardTitle>
          <CardDescription>
            Exclusive rewards for level {userProfile?.level || 1}+ users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" size="sm" className="w-full flex items-center gap-2" asChild>
            <a href="/shop">
              <ShoppingBag className="h-4 w-4" />
              <span>Browse VIP Rewards</span>
              <ExternalLink className="h-3 w-3 ml-auto" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardStats;
