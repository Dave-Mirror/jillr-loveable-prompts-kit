
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Star, Calendar, TrendingUp, Flame } from 'lucide-react';

interface StreakDay {
  date: string;
  completed: boolean;
}

interface RewardStatsProps {
  streakData: {
    currentStreak: number;
    maxStreak: number;
    days: StreakDay[];
  };
}

const RewardStats: React.FC<RewardStatsProps> = ({ streakData }) => {
  return (
    <div className="space-y-6">
      {/* Streak Card */}
      <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPurple/10 border-jillr-neonPurple/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Flame className="text-orange-500" />
            Activity Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="block text-3xl font-bold">{streakData.currentStreak}</span>
              <span className="text-xs text-muted-foreground">Current Streak</span>
            </div>
            
            <div className="border-l border-white/10 h-12 mx-4"></div>
            
            <div>
              <span className="block text-2xl font-bold">{streakData.maxStreak}</span>
              <span className="text-xs text-muted-foreground">Best Streak</span>
            </div>
            
            <div className="border-l border-white/10 h-12 mx-4"></div>
            
            <Badge className="bg-gradient-to-r from-orange-500 to-jillr-neonPink">
              <Flame className="mr-1 h-3 w-3" />
              On Fire
            </Badge>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {streakData.days.map((day, i) => (
              <div key={i} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    day.completed ? 'bg-orange-500/80' : 'bg-jillr-darkBlue/50'
                  }`}
                >
                  {day.completed && <Check className="h-4 w-4 text-white" />}
                </div>
                <span className="text-xs mt-1">{day.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Next Rewards Card */}
      <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonBlue/10 border-jillr-neonBlue/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Award className="text-jillr-neonBlue" />
            Next Rewards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-jillr-darkBlue/50 rounded-lg p-3 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-jillr-neonBlue" />
              <h4 className="font-medium">VIP Event Access</h4>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Erreiche Level 10 um VIP Zugang zu exklusiven Events freizuschalten
            </p>
            <div className="w-full h-1.5 bg-jillr-dark rounded-full overflow-hidden">
              <div className="h-full bg-jillr-neonBlue" style={{ width: '65%' }}></div>
            </div>
            <div className="text-xs mt-1 flex justify-between">
              <span>Level 7</span>
              <span>Level 10</span>
            </div>
            <div className="absolute -right-2 -top-2 transform rotate-12">
              <Badge className="bg-jillr-neonBlue/80">Soon</Badge>
            </div>
          </div>
          
          <div className="bg-jillr-darkBlue/50 rounded-lg p-3 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <h4 className="font-medium">Product Giveaway</h4>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Schließe 5 weitere Challenges ab um an Product Giveaways teilzunehmen
            </p>
            <div className="w-full h-1.5 bg-jillr-dark rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500" style={{ width: '40%' }}></div>
            </div>
            <div className="text-xs mt-1 flex justify-between">
              <span>2/5 Challenges</span>
              <span>5 benötigt</span>
            </div>
          </div>
          
          <div className="bg-jillr-darkBlue/50 rounded-lg p-3 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-jillr-neonGreen" />
              <h4 className="font-medium">XP Booster x2</h4>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Bei täglicher Aktivität für 7 Tage erhälst du einen XP Booster
            </p>
            <div className="w-full h-1.5 bg-jillr-dark rounded-full overflow-hidden">
              <div className="h-full bg-jillr-neonGreen" style={{ width: '70%' }}></div>
            </div>
            <div className="text-xs mt-1 flex justify-between">
              <span>5/7 Tage</span>
              <span>7 benötigt</span>
            </div>
            <div className="absolute -right-2 -top-2 transform rotate-12">
              <Badge className="bg-jillr-neonGreen/80">Almost</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Check = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default RewardStats;
