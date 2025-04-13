
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

interface BoostedChallengeItem {
  id: string;
  title: string;
  xpMultiplier: number;
}

interface BoostedChallengesAlertProps {
  boostedChallenges: BoostedChallengeItem[];
}

const BoostedChallengesAlert: React.FC<BoostedChallengesAlertProps> = ({ boostedChallenges }) => {
  if (!boostedChallenges || boostedChallenges.length === 0) {
    return null;
  }
  
  return (
    <Alert className="mb-6 bg-jillr-neonPurple/10 border-jillr-neonPurple">
      <TrendingUp className="h-4 w-4 text-jillr-neonPurple" />
      <AlertDescription className="flex flex-col">
        <span className="font-medium">Doppelte XP-Challenges verfügbar!</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {boostedChallenges.map(challenge => (
            <Badge key={challenge.id} variant="outline" className="bg-jillr-neonPurple/20">
              {challenge.title} ({challenge.xpMultiplier}x XP)
            </Badge>
          ))}
        </div>
        <Button size="sm" variant="outline" className="mt-2 w-fit" asChild>
          <Link to="/explore">Jetzt teilnehmen</Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default BoostedChallengesAlert;
