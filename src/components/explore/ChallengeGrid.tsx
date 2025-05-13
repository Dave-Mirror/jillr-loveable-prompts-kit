
import React from 'react';
import { ChallengeCard } from '../challenge-card';
import { Challenge } from '@/components/challenge-card/types';

interface ChallengeGridProps {
  challenges: {
    id: string;
    title: string;
    description: string;
    type: string;
    hashtags: string[];
    xpReward: number;
    endDate: string;
    imageUrl: string;
  }[];
}

const ChallengeGrid: React.FC<ChallengeGridProps> = ({ challenges }) => {
  // Konvertiere die Challenge-Daten in das Format, das von ChallengeCard erwartet wird
  const formattedChallenges = challenges.map(challenge => ({
    id: challenge.id,
    title: challenge.title,
    description: challenge.description,
    type: challenge.type,
    reward: `${challenge.xpReward} XP`,
    expiresIn: new Date(challenge.endDate).toLocaleDateString(),
    imageUrl: challenge.imageUrl
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {challenges.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-lg text-muted-foreground">Keine Challenges gefunden.</p>
          <p className="text-sm text-muted-foreground mt-2">Versuche, andere Filter auszuwählen.</p>
        </div>
      ) : (
        formattedChallenges.map(challenge => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
          />
        ))
      )}
    </div>
  );
};

export default ChallengeGrid;
