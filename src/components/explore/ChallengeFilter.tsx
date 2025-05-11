
import React from 'react';
import { IndustryType, ChallengeType } from '@/utils/challenge/rewards/types';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface ChallengeFilterProps {
  industry: IndustryType | 'all';
  challengeType: ChallengeType | 'all';
  sortBy: 'latest' | 'rewards' | 'endDate';
  setIndustry: (industry: IndustryType | 'all') => void;
  setChallengeType: (type: ChallengeType | 'all') => void;
  setSortBy: (sortBy: 'latest' | 'rewards' | 'endDate') => void;
  availableIndustries: string[];
  availableChallengeTypes: string[];
}

const ChallengeFilter: React.FC<ChallengeFilterProps> = ({
  industry,
  challengeType,
  sortBy,
  setIndustry,
  setChallengeType,
  setSortBy,
  availableIndustries,
  availableChallengeTypes
}) => {
  const handleReset = () => {
    setIndustry('all');
    setChallengeType('all');
    setSortBy('latest');
  };

  return (
    <div className="bg-jillr-darkAccent/50 p-4 rounded-lg border border-jillr-border">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4">
          {/* Branchenfilter */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Branche</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setIndustry('all')}
                className={`px-3 py-1 rounded-full text-xs ${
                  industry === 'all' 
                    ? 'bg-jillr-neonPurple text-white' 
                    : 'bg-jillr-darkLight hover:bg-jillr-dark/60'
                }`}
              >
                Alle
              </button>
              {availableIndustries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setIndustry(ind as IndustryType)}
                  className={`px-3 py-1 rounded-full text-xs ${
                    industry === ind 
                      ? 'bg-jillr-neonPurple text-white' 
                      : 'bg-jillr-darkLight hover:bg-jillr-dark/60'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          {/* Challenge-Typ-Filter */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Challenge-Typ</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setChallengeType('all')}
                className={`px-3 py-1 rounded-full text-xs ${
                  challengeType === 'all' 
                    ? 'bg-jillr-neonBlue text-white' 
                    : 'bg-jillr-darkLight hover:bg-jillr-dark/60'
                }`}
              >
                Alle
              </button>
              {availableChallengeTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setChallengeType(type as ChallengeType)}
                  className={`px-3 py-1 rounded-full text-xs ${
                    challengeType === type 
                      ? 'bg-jillr-neonBlue text-white' 
                      : 'bg-jillr-darkLight hover:bg-jillr-dark/60'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sortierung und Reset */}
        <div className="flex gap-4 items-end">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Sortieren nach</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'rewards' | 'endDate')}
              className="px-3 py-1.5 rounded-md text-xs bg-jillr-darkLight border border-jillr-border w-40"
            >
              <option value="latest">Neueste</option>
              <option value="rewards">Höchste Belohnungen</option>
              <option value="endDate">Endet bald</option>
            </select>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReset}
            className="h-8"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" /> Zurücksetzen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeFilter;
