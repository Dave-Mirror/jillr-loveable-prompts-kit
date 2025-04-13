
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Award, Crown, Lock, Star, Trophy, TrendingUp, 
  Zap, ShieldCheck, Gift, Rocket, Check // Add Check to the import
} from 'lucide-react';
import { UserReward } from '@/utils/challenge/rewards/types';

interface GameficationTabProps {
  level: number;
  xp: number;
  userRewards: UserReward[];
}

const GameficationTab: React.FC<GameficationTabProps> = ({ level, xp, userRewards }) => {
  // VIP tiers based on level
  const tiers = [
    { name: "Starter", level: 1, color: "text-gray-400", bgColor: "bg-gray-400/20", benefits: ["Grundlegende Challenges", "Standard Belohnungen"] },
    { name: "Bronze", level: 3, color: "text-amber-700", bgColor: "bg-amber-700/20", benefits: ["10% Bonus XP", "Früher Zugang zu neuen Challenges"] },
    { name: "Silber", level: 5, color: "text-slate-400", bgColor: "bg-slate-400/20", benefits: ["20% Bonus XP", "Exklusive digitale Belohnungen", "Premium Challenges"] },
    { name: "Gold", level: 8, color: "text-yellow-500", bgColor: "bg-yellow-500/20", benefits: ["35% Bonus XP", "Monatliche Überraschungsbelohnungen", "VIP Challenges"] },
    { name: "Platin", level: 12, color: "text-blue-300", bgColor: "bg-blue-300/20", benefits: ["50% Bonus XP", "Früher Zugang zu exklusiven Events", "Produkttests"] },
    { name: "Diamond", level: 15, color: "text-cyan-300", bgColor: "bg-cyan-300/20", benefits: ["75% Bonus XP", "Persönlicher Concierge Service", "Geldprämien für Challenge-Gewinne"] },
  ];

  // Find current tier
  const currentTier = tiers.reduce((prev, current) => (level >= current.level ? current : prev), tiers[0]);
  
  // Find next tier
  const nextTierIndex = tiers.findIndex(tier => tier.name === currentTier.name) + 1;
  const nextTier = nextTierIndex < tiers.length ? tiers[nextTierIndex] : null;
  
  // Calculate progress to next tier
  const nextTierProgress = nextTier 
    ? Math.min(100, ((level - currentTier.level) / (nextTier.level - currentTier.level)) * 100)
    : 100;

  // Special challenges that unlock at different levels
  const vipChallenges = [
    { 
      name: "Fashion Creator Challenge", 
      description: "Erstelle ein Fashion-Video mit unserem Produkt", 
      requiredLevel: 3, 
      reward: "500 Coins + Exklusives Produkt", 
      icon: <Zap className="h-5 w-5 text-jillr-neonPink" /> 
    },
    { 
      name: "VIP Product Launch", 
      description: "Sei Teil unseres nächsten großen Produkt-Launches", 
      requiredLevel: 5, 
      reward: "1000 Coins + Zugang zur Pre-Launch Party", 
      icon: <Rocket className="h-5 w-5 text-jillr-neonPurple" /> 
    },
    { 
      name: "Star Creator Programm", 
      description: "Werde offizieller Markenbotschafter für 3 Monate", 
      requiredLevel: 8, 
      reward: "2500 Coins + monatliche Produkte", 
      icon: <Star className="h-5 w-5 text-yellow-500" /> 
    },
    { 
      name: "Platinum Exclusive", 
      description: "Exklusiver Zugang zu unserem VIP-Event", 
      requiredLevel: 12, 
      reward: "5000 Coins + VIP Ticket", 
      icon: <Crown className="h-5 w-5 text-jillr-neonBlue" /> 
    }
  ];

  // Achievements based on challenge completions and rewards
  const achievements = [
    { 
      name: "Erster Erfolg", 
      description: "Schließe deine erste Challenge ab", 
      completed: userRewards.length > 0,
      icon: <Trophy className="h-5 w-5 text-jillr-neonGreen" /> 
    },
    { 
      name: "Sammelwut", 
      description: "Sammle 5 verschiedene Belohnungen", 
      completed: userRewards.length >= 5,
      icon: <Gift className="h-5 w-5 text-jillr-neonPink" /> 
    },
    { 
      name: "XP Master", 
      description: "Erreiche 5000 XP", 
      completed: xp >= 5000,
      icon: <Zap className="h-5 w-5 text-jillr-neonPurple" /> 
    },
    { 
      name: "Elite Creator", 
      description: "Erreiche Level 10", 
      completed: level >= 10,
      icon: <Crown className="h-5 w-5 text-yellow-500" /> 
    }
  ];

  return (
    <div className="space-y-8">
      {/* Current Status & Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="text-jillr-neonPurple" />
            Dein VIP Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge className={`${currentTier.bgColor} border-0`}>
                <div className={`flex items-center gap-1 ${currentTier.color}`}>
                  {currentTier.level >= 8 && <Crown size={12} />}
                  {currentTier.name}
                </div>
              </Badge>
              <span className="text-sm text-muted-foreground">Level {level}</span>
            </div>
            
            {nextTier && (
              <div className="text-sm text-muted-foreground">
                Nächster Rang: {nextTier.name} (Level {nextTier.level})
              </div>
            )}
          </div>
          
          {nextTier && (
            <>
              <Progress value={nextTierProgress} className="h-2 mb-2" />
              <div className="text-xs text-muted-foreground mb-6">
                {nextTier.level - level} Level bis zum nächsten Rang
              </div>
            </>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className={`rounded-lg p-4 ${currentTier.bgColor}`}>
              <h3 className={`font-medium mb-2 ${currentTier.color}`}>Deine Vorteile</h3>
              <ul className="space-y-2">
                {currentTier.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <ShieldCheck className="h-4 w-4 text-jillr-neonGreen" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            {nextTier && (
              <div className="rounded-lg p-4 bg-jillr-darkBlue/20 border border-dashed border-muted-foreground/30">
                <h3 className="font-medium mb-2 text-muted-foreground flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Nächste Vorteile
                </h3>
                <ul className="space-y-2">
                  {nextTier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-center">
            <Button asChild>
              <Link to="/leaderboard">
                <Trophy className="mr-2 h-4 w-4" />
                Zum Leaderboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* VIP Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="text-jillr-neonBlue" />
            VIP Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vipChallenges.map((challenge, index) => (
              <div 
                key={index} 
                className={`rounded-lg p-4 border ${
                  level >= challenge.requiredLevel 
                    ? 'bg-jillr-darkBlue/20 border-jillr-neonBlue/30' 
                    : 'bg-jillr-darkBlue/10 border-muted-foreground/10'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium flex items-center gap-2">
                    {challenge.icon}
                    {challenge.name}
                  </h3>
                  {level < challenge.requiredLevel && (
                    <Badge variant="outline" className="bg-jillr-darkBlue/20">
                      <Lock className="h-3 w-3 mr-1" />
                      Level {challenge.requiredLevel}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{challenge.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs flex items-center gap-1">
                    <Trophy className="h-3 w-3 text-jillr-neonGreen" />
                    {challenge.reward}
                  </div>
                  {level >= challenge.requiredLevel && (
                    <Button size="sm" variant="outline" asChild>
                      <Link to="/explore">Teilnehmen</Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="text-jillr-neonGreen" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
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
                  {achievement.icon}
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
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Boost section */}
      <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPurple/10">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <TrendingUp className="text-jillr-neonPurple" />
                Boost dein Level!
              </h3>
              <p className="text-muted-foreground mb-4 md:mb-0">
                Nimm an mehreren Challenges teil, um schneller XP zu sammeln und exklusive Vorteile freizuschalten.
              </p>
            </div>
            <Button size="lg" className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80" asChild>
              <Link to="/explore">
                <Rocket className="mr-2 h-4 w-4" />
                Zu den Top Challenges
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameficationTab;
