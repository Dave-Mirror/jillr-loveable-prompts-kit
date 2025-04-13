
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Award, Crown, Lock, ShieldCheck, Trophy } from 'lucide-react';
import { findCurrentTier, findNextTier, calculateProgressToNextTier, Tier } from './tiers';

interface VipStatusCardProps {
  level: number;
}

const VipStatusCard: React.FC<VipStatusCardProps> = ({ level }) => {
  const currentTier = findCurrentTier(level);
  const nextTier = findNextTier(currentTier);
  const nextTierProgress = calculateProgressToNextTier(level, currentTier, nextTier);

  return (
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
  );
};

export default VipStatusCard;
