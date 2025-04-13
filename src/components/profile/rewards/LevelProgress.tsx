
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Award, Zap } from 'lucide-react';

interface LevelProgressProps {
  currentLevel: number;
  currentXP: number;
  progress: number;
  nextLevelXP: number;
}

const LevelProgress: React.FC<LevelProgressProps> = ({
  currentLevel,
  currentXP,
  progress,
  nextLevelXP
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Level Progress</CardTitle>
        <CardDescription>
          Your journey to becoming a top creator
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <Progress value={progress} className="h-4" />
            <div className="flex justify-between mt-2 text-sm">
              <div>Level {currentLevel}</div>
              <div>{nextLevelXP - currentXP} XP to Level {currentLevel + 1}</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPurple/20 border border-jillr-neonPurple/30 p-4 rounded-xl flex flex-col items-center justify-center min-w-28">
            <Zap className="h-6 w-6 text-jillr-neonPurple mb-1" />
            <span className="text-2xl font-bold">{currentXP}</span>
            <span className="text-xs">Total XP</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[5, 10, 15, 20].map(level => (
            <Card 
              key={level} 
              className={`border ${currentLevel >= level 
                ? 'border-jillr-neonPurple bg-jillr-neonPurple/10' 
                : 'border-dashed'}`}
            >
              <CardContent className="p-4 text-center">
                <Award 
                  className={`h-8 w-8 mx-auto mb-2 ${
                    currentLevel >= level 
                      ? 'text-jillr-neonPurple' 
                      : 'text-gray-400'
                  }`} 
                />
                <h4 className="font-medium">Level {level}</h4>
                <p className="text-xs text-muted-foreground">
                  {currentLevel >= level 
                    ? 'Unlocked!' 
                    : `${(level - currentLevel) * 1000 - (currentXP - (currentLevel - 1) * 1000)} XP needed`}
                </p>
                {currentLevel >= level && (
                  <Badge className="mt-2 bg-jillr-neonPurple">
                    <Award size={10} className="mr-1" /> Achieved
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
