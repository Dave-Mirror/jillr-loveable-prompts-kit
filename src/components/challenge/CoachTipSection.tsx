
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

interface CoachTipSectionProps {
  coachTip: string;
  isLoadingTip: boolean;
  requestCoachTip: () => void;
}

const CoachTipSection: React.FC<CoachTipSectionProps> = ({
  coachTip,
  isLoadingTip,
  requestCoachTip
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-jillr-neonBlue" />
          Coach Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        {coachTip ? (
          <div className="p-4 bg-jillr-darkBlue/30 rounded-lg">
            <p className="text-white/90">{coachTip}</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-4 text-muted-foreground">
              Hol dir Tipps von unserem Challenge-Coach, um diese Challenge zu meistern!
            </p>
            <Button
              onClick={requestCoachTip}
              disabled={isLoadingTip}
              variant="outline"
            >
              {isLoadingTip ? 'Lädt...' : 'Tipp anfordern'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CoachTipSection;
