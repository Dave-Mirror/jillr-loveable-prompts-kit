
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Award, Zap, Star, Trophy, Crown } from 'lucide-react';
import { useRewards } from './RewardsContext';

const LevelProgress: React.FC = () => {
  // Get user profile from the parent RewardsSection component
  const { userProfile } = useRewards() as any;
  
  // Calculate XP progress to next level
  const currentLevel = userProfile?.level || 1;
  const nextLevelXP = currentLevel * 1000;
  const previousLevelXP = (currentLevel - 1) * 1000;
  const currentXP = userProfile?.xp || 0;
  const progress = Math.min(100, ((currentXP - previousLevelXP) / (nextLevelXP - previousLevelXP)) * 100);

  return (
    <Card className="neon-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="neon-text">Level Progress</CardTitle>
            <CardDescription>
              Deine Reise zum Top Creator
            </CardDescription>
          </div>
          <div className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPurple/20 border border-jillr-neonPurple/30 p-3 rounded-xl flex flex-col items-center justify-center min-w-20">
            <Zap className="h-5 w-5 text-jillr-neonPurple mb-1" />
            <span className="text-xl font-bold">{currentXP}</span>
            <span className="text-xs">Total XP</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative mt-2">
          <Progress value={progress} className="h-5" />
          <div 
            className="absolute top-1/2 left-0 transform -translate-y-1/2 h-full w-full flex items-center justify-between px-3"
            style={{ pointerEvents: 'none' }}
          >
            <div className="text-xs font-medium">Level {currentLevel}</div>
            <div className="text-xs font-medium">Level {currentLevel + 1}</div>
          </div>
        </div>
        
        <div className="text-center text-sm">
          <span className="text-jillr-neonGreen font-medium">{nextLevelXP - currentXP} XP</span> needed for next level
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {level: 5, icon: <Star className="h-6 w-6" />, title: "Rising Star"},
            {level: 10, icon: <Trophy className="h-6 w-6" />, title: "Creator Pro"},
            {level: 15, icon: <Crown className="h-6 w-6" />, title: "Top Talent"},
            {level: 20, icon: <Award className="h-6 w-6" />, title: "Legend"}
          ].map(milestone => (
            <Card 
              key={milestone.level} 
              className={`border transition-all transform hover:scale-105 ${currentLevel >= milestone.level 
                ? 'border-jillr-neonPurple bg-jillr-neonPurple/10 animate-glow' 
                : 'border-dashed'}`}
            >
              <CardContent className="p-4 text-center">
                <div 
                  className={`mx-auto mb-2 p-3 rounded-full ${
                    currentLevel >= milestone.level 
                      ? 'bg-jillr-neonPurple/30' 
                      : 'bg-jillr-darkBlue/30'
                  }`}
                >
                  <div className={`${currentLevel >= milestone.level 
                    ? 'text-jillr-neonPurple' 
                    : 'text-gray-400'}`}
                  > 
                    {milestone.icon}
                  </div>
                </div>
                <h4 className="font-medium">{milestone.title}</h4>
                <p className="text-xs text-muted-foreground">
                  {currentLevel >= milestone.level 
                    ? 'Freigeschaltet!' 
                    : `Level ${milestone.level} benötigt`}
                </p>
                {currentLevel >= milestone.level && (
                  <Badge className="mt-2 bg-jillr-neonPurple">
                    <Award size={10} className="mr-1" /> Erreicht
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LevelProgress;
