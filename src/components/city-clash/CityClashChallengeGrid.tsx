
import React from 'react';
import { CityChallenge } from '@/hooks/useCityClashData';
import CityClashCard from './CityClashCard';

interface CityClashChallengeGridProps {
  challenges: CityChallenge[];
}

const CityClashChallengeGrid: React.FC<CityClashChallengeGridProps> = ({ challenges }) => {
  if (challenges.length === 0) {
    return (
      <div className="text-center py-12 bg-jillr-dark/50 border border-jillr-border rounded-lg">
        <p className="text-lg text-gray-400">Keine City Clash Challenges gefunden</p>
        <p className="text-sm text-gray-500 mt-2">Versuche es später noch einmal oder wechsle zu einem anderen Bereich.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {challenges.map((challenge) => (
        <CityClashCard key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
};

export default CityClashChallengeGrid;
