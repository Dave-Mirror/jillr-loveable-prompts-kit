
import React from 'react';
import FilterBar from './FilterBar';
import { IndustryType, ChallengeType } from '@/utils/challenge/rewards/types';

interface ExploreFiltersProps {
  industry: IndustryType | 'all';
  challengeType: ChallengeType | 'all';
  sortBy: 'latest' | 'rewards' | 'endDate';
  setIndustry: (industry: IndustryType | 'all') => void;
  setChallengeType: (type: ChallengeType | 'all') => void;
  setSortBy: (sortBy: 'latest' | 'rewards' | 'endDate') => void;
  availableIndustries: string[];
  availableChallengeTypes: string[];
  activeFiltersCount: number;
  resetFilters: () => void;
}

const ExploreFilters: React.FC<ExploreFiltersProps> = ({
  industry,
  challengeType,
  sortBy,
  setIndustry,
  setChallengeType,
  setSortBy,
  availableIndustries,
  availableChallengeTypes,
  activeFiltersCount,
  resetFilters
}) => {
  return (
    <FilterBar
      industry={industry}
      challengeType={challengeType}
      sortBy={sortBy}
      setIndustry={setIndustry}
      setChallengeType={setChallengeType}
      setSortBy={setSortBy}
      availableIndustries={availableIndustries}
      availableChallengeTypes={availableChallengeTypes}
      activeFiltersCount={activeFiltersCount}
      resetFilters={resetFilters}
    />
  );
};

export default ExploreFilters;
