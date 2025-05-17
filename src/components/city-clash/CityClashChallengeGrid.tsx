
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChallengeCard from '../ChallengeCard';
import { Challenge } from '@/utils/challenge/rewards/types';

// Define an adapter interface for city challenges
interface CityChallenge {
  id: string;
  title: string;
  description: string;
  type?: string;
  imageUrl?: string;
  xpReward?: number;
  endDate?: string;
  // Additional city-specific fields can be added here
}

interface CityClashChallengeGridProps {
  challenges: CityChallenge[];
}

const CityClashChallengeGrid: React.FC<CityClashChallengeGridProps> = ({ challenges }) => {
  const navigate = useNavigate();
  
  const handleChallengeClick = (id: string) => {
    navigate(`/challenge/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {challenges.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-lg text-muted-foreground">Keine City Clash Challenges gefunden.</p>
          <p className="text-sm text-muted-foreground mt-2">Versuche einen anderen Stadtteil auszuwählen.</p>
        </div>
      ) : (
        challenges.map(challenge => (
          <ChallengeCard
            key={challenge.id}
            challenge={{
              id: challenge.id,
              title: challenge.title,
              description: challenge.description,
              type: challenge.type || 'City Challenge',
              imageUrl: challenge.imageUrl || '/placeholder.svg',
              reward: `${challenge.xpReward || 100} XP`,
              expiresIn: challenge.endDate ? new Date(challenge.endDate).toLocaleDateString() : 'Aktiv',
            }}
            onClick={handleChallengeClick}
          />
        ))
      )}
    </div>
  );
};

export default CityClashChallengeGrid;
