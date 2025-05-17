
import React from 'react';
import ChallengeCard from '../ChallengeCard';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: string;
  hashtags: string[];
  xpReward: number;
  endDate: string;
  imageUrl: string;
}

interface ChallengeGridProps {
  challenges: Challenge[];
}

const ChallengeGrid: React.FC<ChallengeGridProps> = ({ challenges }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {challenges.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-lg text-muted-foreground">Keine Challenges gefunden.</p>
          <p className="text-sm text-muted-foreground mt-2">Versuche, andere Filter auszuwählen.</p>
        </div>
      ) : (
        challenges.map(challenge => (
          <ChallengeCard
            key={challenge.id}
            id={challenge.id}
            title={challenge.title}
            description={challenge.description}
            type={challenge.type}
            hashtags={challenge.hashtags}
            xpReward={challenge.xpReward}
            endDate={challenge.endDate}
            imageUrl={challenge.imageUrl}
          />
        ))
      )}
    </div>
  );
};

export default ChallengeGrid;
