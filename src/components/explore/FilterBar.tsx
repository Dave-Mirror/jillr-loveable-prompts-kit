
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Filter, X } from 'lucide-react';
import FilterDropdown from '@/components/ui/filter-dropdown';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { IndustryType, ChallengeType } from '@/utils/challenge/rewards/types';
import { Separator } from '@/components/ui/separator';
import { typeIcons } from './ExploreFilters';

interface FilterBarProps {
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

const FilterBar: React.FC<FilterBarProps> = ({
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
  const [showFilters, setShowFilters] = useState(false);

  // Options für Sortier-Dropdown
  const sortOptions = [
    { value: 'latest', label: 'Neueste' },
    { value: 'rewards', label: 'Höchste Belohnungen' },
    { value: 'endDate', label: 'Endet bald' }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-jillr-neonPurple text-white ml-1">
                {activeFiltersCount}
              </Badge>
            )}
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
          
          <Separator orientation="vertical" className="h-6" />
          
          <FilterDropdown
            options={sortOptions}
            activeValue={sortBy}
            onSelect={(value) => setSortBy(value as 'latest' | 'rewards' | 'endDate')}
            label="Sortieren"
            buttonVariant="outline"
            className="text-sm"
          />
        </div>
        
        {activeFiltersCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="text-sm text-gray-400 hover:text-white"
          >
            <X className="h-3.5 w-3.5 mr-1.5" />
            Filter zurücksetzen
          </Button>
        )}
      </div>
      
      {/* Erweiterter Filter-Bereich */}
      {showFilters && (
        <Card className="p-4 border border-jillr-border bg-jillr-darkAccent/50">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Challenge-Typ Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Challenge-Typ</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  key="all-types"
                  variant={challengeType === 'all' ? "default" : "outline"}
                  className={`cursor-pointer ${
                    challengeType === 'all' 
                      ? 'bg-jillr-neonBlue' 
                      : 'bg-transparent border-jillr-neonBlue/30 hover:border-jillr-neonBlue/60'
                  }`}
                  onClick={() => setChallengeType('all')}
                >
                  Alle Typen
                </Badge>
                
                {availableChallengeTypes.map(type => (
                  <Badge
                    key={type}
                    variant={challengeType === type ? "default" : "outline"}
                    className={`cursor-pointer ${
                      challengeType === type 
                        ? 'bg-jillr-neonBlue' 
                        : 'bg-transparent border-jillr-neonBlue/30 hover:border-jillr-neonBlue/60'
                    }`}
                    onClick={() => setChallengeType(type as ChallengeType)}
                  >
                    {typeIcons[type] || '🎯'} {type}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Branchen-Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Branchen</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  key="all-industries"
                  variant={industry === 'all' ? "default" : "outline"}
                  className={`cursor-pointer ${
                    industry === 'all' 
                      ? 'bg-jillr-neonPurple' 
                      : 'bg-transparent border-jillr-neonPurple/30 hover:border-jillr-neonPurple/60'
                  }`}
                  onClick={() => setIndustry('all')}
                >
                  Alle Branchen
                </Badge>
                
                {availableIndustries.map(ind => (
                  <Badge
                    key={ind}
                    variant={industry === ind ? "default" : "outline"}
                    className={`cursor-pointer ${
                      industry === ind 
                        ? 'bg-jillr-neonPurple' 
                        : 'bg-transparent border-jillr-neonPurple/30 hover:border-jillr-neonPurple/60'
                    }`}
                    onClick={() => setIndustry(ind as IndustryType)}
                  >
                    {ind}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
      
      {/* Aktive Filter-Anzeige */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {industry !== 'all' && (
            <Badge variant="secondary" className="bg-jillr-neonPurple/20 text-white">
              Branche: {industry}
              <X 
                className="ml-1 h-3.5 w-3.5 cursor-pointer" 
                onClick={() => setIndustry('all')} 
              />
            </Badge>
          )}
          
          {challengeType !== 'all' && (
            <Badge variant="secondary" className="bg-jillr-neonBlue/20 text-white">
              Typ: {challengeType}
              <X 
                className="ml-1 h-3.5 w-3.5 cursor-pointer" 
                onClick={() => setChallengeType('all')} 
              />
            </Badge>
          )}
          
          {sortBy !== 'latest' && (
            <Badge variant="secondary" className="bg-gray-700/40 text-white">
              Sortierung: {sortBy === 'rewards' ? 'Höchste Belohnungen' : 'Endet bald'}
              <X 
                className="ml-1 h-3.5 w-3.5 cursor-pointer" 
                onClick={() => setSortBy('latest')} 
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
