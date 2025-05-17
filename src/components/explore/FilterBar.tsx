
import React from 'react';
import { ChevronDown, Filter, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IndustryType, ChallengeType } from '@/utils/challenge/rewards/types';

// Import any dependencies needed but not the non-existent typeIcons
// If typeIcons is supposed to be used, it needs to be defined or imported from somewhere else

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
  return (
    <div className="flex flex-wrap gap-2 items-center justify-between bg-jillr-dark/50 backdrop-blur-sm border border-jillr-border p-3 rounded-lg">
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex items-center gap-1">
          <Filter className="h-4 w-4 text-jillr-neonPurple" />
          <span className="text-sm font-medium">Filter:</span>
        </div>
        
        <Select value={industry} onValueChange={(val) => setIndustry(val as IndustryType | 'all')}>
          <SelectTrigger className="w-auto min-w-32 h-8 text-xs">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {availableIndustries.map((ind) => (
              <SelectItem key={ind} value={ind}>
                {ind.charAt(0).toUpperCase() + ind.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={challengeType} onValueChange={(val) => setChallengeType(val as ChallengeType | 'all')}>
          <SelectTrigger className="w-auto min-w-32 h-8 text-xs">
            <SelectValue placeholder="Challenge Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {availableChallengeTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <SlidersHorizontal className="h-4 w-4 text-jillr-neonPurple" />
          <span className="text-sm font-medium">Sort:</span>
        </div>
        
        <Select value={sortBy} onValueChange={(val) => setSortBy(val as 'latest' | 'rewards' | 'endDate')}>
          <SelectTrigger className="w-auto min-w-32 h-8 text-xs">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="rewards">Highest Rewards</SelectItem>
            <SelectItem value="endDate">Ending Soon</SelectItem>
          </SelectContent>
        </Select>
        
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs"
            onClick={resetFilters}
          >
            <X className="h-3.5 w-3.5 mr-1" />
            Clear ({activeFiltersCount})
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
