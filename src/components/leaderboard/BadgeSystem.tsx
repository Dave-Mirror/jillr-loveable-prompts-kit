
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award } from 'lucide-react';

type Badge = {
  name: string;
  xp_required: number;
  challenges_required?: number;
  challenge_type?: string;
  special?: string;
  icon_url: string;
};

interface BadgeSystemProps {
  badges: Badge[];
}

const BadgeSystem = ({ badges }: BadgeSystemProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-jillr-neonPurple" />
          Badge System
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="font-medium">Achievement Badges</h3>
          <div className="space-y-2">
            {badges.slice(0, 8).map((badge, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg border border-border">
                <div className="text-xl">{badge.icon_url}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{badge.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {badge.xp_required > 0 
                      ? `${badge.xp_required.toLocaleString()} XP required` 
                      : badge.challenges_required 
                        ? `${badge.challenges_required} ${badge.challenge_type || ''} challenges`
                        : 'Special achievement'
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" size="sm" className="w-full text-xs">
            View All Badges
          </Button>
          
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <h4 className="text-sm font-medium mb-2">Your next badge</h4>
            <div className="flex items-center gap-3">
              <div className="text-xl">🥈</div>
              <div>
                <div className="text-sm font-medium">Top 20%</div>
                <div className="text-xs text-muted-foreground">4,200 / 6,000 XP</div>
                <div className="w-full bg-background rounded-full h-1.5 mt-1">
                  <div className="bg-jillr-neonPurple h-1.5 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgeSystem;
