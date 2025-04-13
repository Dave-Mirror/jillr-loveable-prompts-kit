
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TimerIcon } from 'lucide-react';

const PendingChallengesTab: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center py-8">
          <TimerIcon className="w-12 h-12 text-jillr-neonPurple/50 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No Pending Challenges</h3>
          <p className="text-muted-foreground">
            Challenges awaiting verification or review will appear here.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingChallengesTab;
