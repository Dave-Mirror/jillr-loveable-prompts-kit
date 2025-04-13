
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Check } from 'lucide-react';
import { UserReward } from '@/utils/challenge/rewards/types';
import { getAchievements } from './achievements';

interface AchievementsCardProps {
  userRewards: UserReward[];
  xp: number;
  level: number;
}

const AchievementsCard: React.FC<AchievementsCardProps> = ({ userRewards, xp, level }) => {
  const achievements = getAchievements(userRewards, xp, level);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="text-jillr-neonGreen" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={index} 
                className={`rounded-lg p-4 flex flex-col items-center text-center ${
                  achievement.completed 
                    ? 'bg-jillr-neonGreen/10 border border-jillr-neonGreen/30' 
                    : 'bg-jillr-darkBlue/20'
                }`}
              >
                <div className={`p-3 rounded-full mb-2 ${
                  achievement.completed 
                    ? 'bg-jillr-neonGreen/20' 
                    : 'bg-jillr-darkBlue/30'
                }`}>
                  <Icon
                    className={achievement.completed
                      ? "h-5 w-5 text-jillr-neonGreen"
                      : "h-5 w-5 text-muted-foreground"
                    }
                  />
                </div>
                <h3 className="font-medium mb-1">{achievement.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                {achievement.completed ? (
                  <Badge className="bg-jillr-neonGreen">
                    <Check className="h-3 w-3 mr-1" />
                    Abgeschlossen
                  </Badge>
                ) : (
                  <Badge variant="outline">Ausstehend</Badge>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsCard;
