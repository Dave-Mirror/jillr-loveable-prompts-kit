
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Zap } from 'lucide-react';

interface XPCardProps {
  xpTotal: number;
  level: number;
  progress: number;
  nextLevelXP: number;
}

const XPCard: React.FC<XPCardProps> = ({ xpTotal, level, progress, nextLevelXP }) => {
  return (
    <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPurple/20 border-jillr-neonPurple/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="text-jillr-neonPurple" />
          XP Points
        </CardTitle>
        <CardDescription>Dein aktueller Erfahrungsstand</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold mb-2">{xpTotal}</div>
        <div className="mb-2">Level {level}</div>
        <Progress value={progress} className="h-2 mb-2" />
        <div className="text-sm text-gray-400">{xpTotal} / {nextLevelXP} XP zum nächsten Level</div>
      </CardContent>
    </Card>
  );
};

export default XPCard;
