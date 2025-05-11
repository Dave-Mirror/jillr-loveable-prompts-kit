
import React from 'react';
import { Flag, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JoinChallengeButtonProps {
  challengeId: string;
  challengeTitle: string;
  onJoinChallenge: (challengeId: string, challengeTitle: string) => void;
}

const JoinChallengeButton: React.FC<JoinChallengeButtonProps> = ({ 
  challengeId, 
  challengeTitle, 
  onJoinChallenge 
}) => {
  // Check if this is a city clash challenge based on ID or title
  const isCityClashChallenge = 
    challengeId.startsWith('challenge-city-') || 
    challengeTitle.toLowerCase().includes('city clash') ||
    challengeTitle.toLowerCase().includes('team battle');
    
  return (
    <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
      <Button 
        onClick={() => onJoinChallenge(challengeId, challengeTitle)}
        className={`px-6 py-2 rounded-full text-white font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all pointer-events-auto ${
          isCityClashChallenge 
            ? "bg-gradient-to-r from-jillr-neonPurple to-jillr-neonBlue"
            : "bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPink"
        }`}
      >
        {isCityClashChallenge ? (
          <>
            <Map className="h-5 w-5" />
            City Clash beitreten
          </>
        ) : (
          <>
            <Flag className="h-5 w-5" />
            Challenge teilnehmen
          </>
        )}
      </Button>
    </div>
  );
};

export default JoinChallengeButton;
