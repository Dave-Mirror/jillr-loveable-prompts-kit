
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, Trophy, Star, BarChart2, TrendingUp, Activity } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface StatsSectionProps {
  userProfile: any;
}

const StatsSection: React.FC<StatsSectionProps> = ({ userProfile }) => {
  // Mock data for statistics - would come from database in real app
  const statsData = {
    totalXP: userProfile.xp || 2500,
    lastMonthXP: 750,
    completedChallenges: 15,
    topChallenges: [
      { name: "Dance Challenge 2023", engagement: 2340 },
      { name: "Fashion Summer Vibes", engagement: 1890 },
      { name: "Fitness Transformation", engagement: 1550 }
    ],
    averageEngagement: 1220,
    achievements: [
      { name: "Rising Creator", description: "Completed 5 challenges", icon: <Star className="h-5 w-5 text-yellow-500" /> },
      { name: "City Clash Master", description: "Found 50 Easter Eggs", icon: <Trophy className="h-5 w-5 text-amber-500" /> },
      { name: "Content Creator", description: "Created 10 original challenges", icon: <Award className="h-5 w-5 text-purple-500" /> }
    ],
    levelProgress: {
      current: Math.floor(userProfile.xp / 1000) + 1 || 3,
      percentage: ((userProfile.xp % 1000) / 1000) * 100 || 65
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-jillr-neonPurple" />
            XP & Level Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-jillr-darkBlue/20 rounded-lg p-4 flex flex-col items-center justify-center">
              <span className="text-sm text-muted-foreground">Current Level</span>
              <span className="text-3xl font-bold text-jillr-neonPurple">{statsData.levelProgress.current}</span>
              <div className="w-full mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Level {statsData.levelProgress.current}</span>
                  <span>Level {statsData.levelProgress.current + 1}</span>
                </div>
                <Progress value={statsData.levelProgress.percentage} className="h-2" />
                <p className="text-xs text-center mt-1 text-muted-foreground">
                  {1000 - (statsData.totalXP % 1000)} XP needed for next level
                </p>
              </div>
            </div>
            
            <div className="bg-jillr-darkBlue/20 rounded-lg p-4">
              <span className="text-sm text-muted-foreground">Total XP</span>
              <div className="flex items-center mt-1">
                <Star className="h-5 w-5 text-jillr-neonPurple mr-2" />
                <span className="text-2xl font-bold">{statsData.totalXP.toLocaleString()}</span>
              </div>
              <div className="mt-2">
                <span className="text-xs text-muted-foreground">Last 30 days:</span>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-jillr-neonGreen mr-1" />
                  <span className="text-sm font-medium">{statsData.lastMonthXP.toLocaleString()} XP</span>
                </div>
              </div>
            </div>
            
            <div className="bg-jillr-darkBlue/20 rounded-lg p-4">
              <span className="text-sm text-muted-foreground">Challenges Completed</span>
              <div className="flex items-center mt-1">
                <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-2xl font-bold">{statsData.completedChallenges}</span>
              </div>
              <div className="mt-2">
                <span className="text-xs text-muted-foreground">Avg. Engagement:</span>
                <div className="flex items-center">
                  <BarChart2 className="h-4 w-4 text-jillr-neonPink mr-1" />
                  <span className="text-sm font-medium">{statsData.averageEngagement.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-jillr-neonBlue" />
            Achievements & Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statsData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center p-3 bg-jillr-darkBlue/10 rounded-lg">
                <div className="mr-3 p-2 bg-jillr-darkBlue/20 rounded-full">
                  {achievement.icon}
                </div>
                <div>
                  <h4 className="font-medium">{achievement.name}</h4>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-jillr-neonGreen" />
            Top Performing Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {statsData.topChallenges.map((challenge, index) => (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="font-bold text-lg text-muted-foreground mr-2">#{index + 1}</span>
                    <span className="font-medium">{challenge.name}</span>
                  </div>
                  <div className="flex items-center">
                    <BarChart2 className="h-4 w-4 text-jillr-neonPurple mr-1" />
                    <span>{challenge.engagement.toLocaleString()}</span>
                  </div>
                </div>
                {index < statsData.topChallenges.length - 1 && <Separator className="my-3" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsSection;
