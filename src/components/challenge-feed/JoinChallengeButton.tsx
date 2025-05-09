
import React from 'react';
import { Flag } from 'lucide-react';
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
  return (
    <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
      <Button 
        onClick={() => onJoinChallenge(challengeId, challengeTitle)}
        className="bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPink px-6 py-2 rounded-full text-white font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all pointer-events-auto"
      >
        <Flag className="h-5 w-5" />
        Challenge teilnehmen
      </Button>
    </div>
  );
};

export default JoinChallengeButton;
