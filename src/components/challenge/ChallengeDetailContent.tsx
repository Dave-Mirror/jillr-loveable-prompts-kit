
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChallengeDetails } from '@/components/challenge/ChallengeDetails';
import { CommunitySubmissions } from '@/components/challenge/CommunitySubmissions';
import CoachTipSection from '@/components/challenge/CoachTipSection';
import { Challenge, Submission } from '@/components/challenge/types';

interface ChallengeDetailContentProps {
  challenge: Challenge;
  verifiedSubmissions: Submission[];
  coachTip: string;
  isLoadingTip: boolean;
  requestCoachTip: () => void;
  inviteFriends: () => void;
}

export const ChallengeDetailContent: React.FC<ChallengeDetailContentProps> = ({
  challenge,
  verifiedSubmissions,
  coachTip,
  isLoadingTip,
  requestCoachTip,
  inviteFriends
}) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      <ChallengeDetails challenge={challenge} />
      
      <CommunitySubmissions 
        verifiedSubmissions={verifiedSubmissions}
        inviteFriends={inviteFriends}
      />
      
      <CoachTipSection
        coachTip={coachTip}
        isLoadingTip={isLoadingTip}
        requestCoachTip={requestCoachTip}
      />
    </div>
  );
};
