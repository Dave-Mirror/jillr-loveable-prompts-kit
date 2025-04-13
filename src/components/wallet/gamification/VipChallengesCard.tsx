
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Lock, Rocket, Trophy } from 'lucide-react';
import { getVipChallenges } from './vipChallenges';

interface VipChallengesCardProps {
  level: number;
}

const VipChallengesCard: React.FC<VipChallengesCardProps> = ({ level }) => {
  const vipChallenges = getVipChallenges();

  return (
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
  );
};

export default VipChallengesCard;
