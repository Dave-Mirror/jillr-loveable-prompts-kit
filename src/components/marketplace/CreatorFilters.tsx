
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface FiltersProps {
  filters: {
    niche: string[];
    region: string[];
    engagement: number[];
    matchScore: number;
  };
  onFilterChange: (newFilters: any) => void;
}

// Niche categories available for filtering
const NICHES = [
  "Beauty", "Fashion", "Fitness", "Gaming", "Lifestyle", 
  "Tech", "Travel", "Food", "Business", "Education"
];

// Regions available for filtering
const REGIONS = [
  "Europa", "Nordamerika", "Südamerika", "Asien", 
  "Afrika", "Australien", "Deutschland", "Österreich", "Schweiz"
];

const CreatorFilters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleNicheToggle = (niche: string) => {
    const updated = filters.niche.includes(niche)
      ? filters.niche.filter(n => n !== niche)
      : [...filters.niche, niche];
    
    onFilterChange({ niche: updated });
  };
  
  const handleRegionToggle = (region: string) => {
    const updated = filters.region.includes(region)
      ? filters.region.filter(r => r !== region)
      : [...filters.region, region];
    
    onFilterChange({ region: updated });
  };
  
  const handleEngagementChange = (value: number[]) => {
    onFilterChange({ engagement: value });
  };
  
  const handleMatchScoreChange = (value: number[]) => {
    onFilterChange({ matchScore: value[0] });
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass search term to parent
    onFilterChange({ searchTerm });
  };
  
  const handleClearFilters = () => {
    onFilterChange({
      niche: [],
      region: [],
      engagement: [0, 100],
      matchScore: 50,
      searchTerm: ""
    });
    setSearchTerm("");
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Nach Creator-Namen oder Keywords suchen..."
          className="w-full rounded-md pl-10 pr-4 py-2 bg-background border border-input focus:outline-none focus:ring-1 focus:ring-jillr-neonPurple"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      
      <div className="flex flex-wrap gap-2">
        {/* Niche Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="mr-2 h-4 w-4" />
              Nische
              {filters.niche.length > 0 && (
                <Badge className="ml-2 bg-jillr-neonPurple text-white" variant="secondary">
                  {filters.niche.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Nische auswählen</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {NICHES.map((niche) => (
              <DropdownMenuItem 
                key={niche}
                onClick={() => handleNicheToggle(niche)}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={filters.niche.includes(niche)}
                  onChange={() => {}}
                  className="h-4 w-4"
                />
                {niche}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Region Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="mr-2 h-4 w-4" />
              Region
              {filters.region.length > 0 && (
                <Badge className="ml-2 bg-jillr-neonPurple text-white" variant="secondary">
                  {filters.region.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Region auswählen</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {REGIONS.map((region) => (
              <DropdownMenuItem 
                key={region}
                onClick={() => handleRegionToggle(region)}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={filters.region.includes(region)}
                  onChange={() => {}}
                  className="h-4 w-4"
                />
                {region}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Engagement Rate Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="mr-2 h-4 w-4" />
              Engagement
              {(filters.engagement[0] > 0 || filters.engagement[1] < 100) && (
                <Badge className="ml-2 bg-jillr-neonPurple text-white" variant="secondary">
                  {filters.engagement[0]}%-{filters.engagement[1]}%
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 p-4">
            <DropdownMenuLabel className="mb-4">Engagement Rate</DropdownMenuLabel>
            <div className="px-1">
              <Slider
                defaultValue={filters.engagement}
                min={0}
                max={100}
                step={1}
                onValueChange={handleEngagementChange}
                className="my-6"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{filters.engagement[0]}%</span>
                <span>{filters.engagement[1]}%</span>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Match Score Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="mr-2 h-4 w-4" />
              KI Match
              {filters.matchScore !== 50 && (
                <Badge className="ml-2 bg-jillr-neonPurple text-white" variant="secondary">
                  {filters.matchScore}%+
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 p-4">
            <DropdownMenuLabel className="mb-4">KI Match Score</DropdownMenuLabel>
            <div className="px-1">
              <Slider
                defaultValue={[filters.matchScore]}
                min={0}
                max={100}
                step={5}
                onValueChange={handleMatchScoreChange}
                className="my-6"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Minimum: {filters.matchScore}%</span>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Clear Filters */}
        {(filters.niche.length > 0 || 
          filters.region.length > 0 || 
          filters.engagement[0] > 0 || 
          filters.engagement[1] < 100 ||
          filters.matchScore !== 50 ||
          searchTerm) && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearFilters}
            className="h-9"
          >
            Filter zurücksetzen
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreatorFilters;
