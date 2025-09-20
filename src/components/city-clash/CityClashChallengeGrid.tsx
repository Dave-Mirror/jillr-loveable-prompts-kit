
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CityClashCard from './CityClashCard';
import { CityChallenge } from '@/hooks/useCityClashData';

interface CityClashChallengeGridProps {
  challenges: CityChallenge[];
}

const CityClashChallengeGrid: React.FC<CityClashChallengeGridProps> = ({ challenges }) => {
  const navigate = useNavigate();
  
  const handleChallengeClick = (id: string) => {
    navigate(`/challenge/${id}`);
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {challenges.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-[var(--txt-dim)]">Keine City Clash Challenges gefunden.</p>
            <p className="text-sm text-[var(--txt-dim)] mt-2">Versuche einen anderen Stadtteil auszuwählen.</p>
          </div>
        ) : (
          challenges.map(challenge => (
            <CityClashCard
              key={challenge.id}
              challenge={challenge}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CityClashChallengeGrid;
