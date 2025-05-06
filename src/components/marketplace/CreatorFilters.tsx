
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, Filter, Search, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';

interface FiltersProps {
  filters: {
    niche: string[];
    region: string[];
    engagement: number[];
    matchScore: number;
    searchTerm?: string;
  };
  onFilterChange: (filters: any) => void;
}

// Predefined options
const niches = [
  'Beauty', 'Fashion', 'Gaming', 'Fitness', 'Food',
  'Travel', 'Lifestyle', 'Tech', 'DIY', 'Comedy'
];

const regions = [
  'Deutschland', 'Österreich', 'Schweiz', 'DACH', 
  'Europa', 'Nordamerika', 'Global'
];

const CreatorFilters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || '');

  // Handle search input
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ searchTerm });
  };

  // Handle match score slider change
  const handleMatchScoreChange = (value: number[]) => {
    onFilterChange({ matchScore: value[0] });
  };

  // Handle engagement range slider change
  const handleEngagementChange = (value: number[]) => {
    onFilterChange({ engagement: value });
  };

  // Toggle niche selection
  const toggleNiche = (niche: string) => {
    const updatedNiches = filters.niche.includes(niche)
      ? filters.niche.filter(n => n !== niche)
      : [...filters.niche, niche];
    
    onFilterChange({ niche: updatedNiches });
  };

  // Toggle region selection
  const toggleRegion = (region: string) => {
    const updatedRegions = filters.region.includes(region)
      ? filters.region.filter(r => r !== region)
      : [...filters.region, region];
    
    onFilterChange({ region: updatedRegions });
  };

  // Clear all filters
  const clearAllFilters = () => {
    onFilterChange({
      niche: [],
      region: [],
      engagement: [0, 100],
      matchScore: 50,
      searchTerm: ''
    });
    setSearchTerm('');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Creator suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-jillr-darkBlue/30 border-jillr-neonPurple/30 focus:border-jillr-neonPurple"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  onFilterChange({ searchTerm: '' });
                }}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </form>
        </div>
        
        {/* Mobile Filter Button */}
        <div className="md:hidden">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full border-jillr-neonPurple/30 bg-jillr-darkBlue/30"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </div>
        
        {/* Desktop Filter Pills */}
        <div className="hidden md:flex gap-2">
          {/* Niche Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-jillr-neonPurple/30 bg-jillr-darkBlue/30">
                Nische
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0 bg-jillr-darkBlue border-jillr-neonPurple/30">
              <Command>
                <CommandInput placeholder="Nische suchen..." />
                <CommandEmpty>Keine passende Nische gefunden</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-60">
                    {niches.map((niche) => (
                      <CommandItem
                        key={niche}
                        onSelect={() => toggleNiche(niche)}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div className={`h-4 w-4 rounded-sm border flex items-center justify-center ${
                            filters.niche.includes(niche) ? 'bg-jillr-neonPurple border-jillr-neonPurple' : 'border-white/20'
                          }`}>
                            {filters.niche.includes(niche) && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span>{niche}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          
          {/* Region Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-jillr-neonPurple/30 bg-jillr-darkBlue/30">
                Region
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0 bg-jillr-darkBlue border-jillr-neonPurple/30">
              <Command>
                <CommandInput placeholder="Region suchen..." />
                <CommandEmpty>Keine passende Region gefunden</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-60">
                    {regions.map((region) => (
                      <CommandItem
                        key={region}
                        onSelect={() => toggleRegion(region)}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div className={`h-4 w-4 rounded-sm border flex items-center justify-center ${
                            filters.region.includes(region) ? 'bg-jillr-neonPurple border-jillr-neonPurple' : 'border-white/20'
                          }`}>
                            {filters.region.includes(region) && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span>{region}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          
          {/* Match Score */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-jillr-neonPurple/30 bg-jillr-darkBlue/30">
                Match Score
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4 bg-jillr-darkBlue border-jillr-neonPurple/30">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Mindest-Match-Score (%)</h4>
                <Slider 
                  defaultValue={[filters.matchScore]} 
                  max={100} 
                  step={5}
                  value={[filters.matchScore]}
                  onValueChange={handleMatchScoreChange}
                  className="mb-1" 
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{filters.matchScore}%</span>
                  <span>100%</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Engagement Rate */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-jillr-neonPurple/30 bg-jillr-darkBlue/30">
                Engagement
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4 bg-jillr-darkBlue border-jillr-neonPurple/30">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Engagement-Rate (%)</h4>
                <Slider 
                  defaultValue={filters.engagement} 
                  max={100} 
                  step={1}
                  value={filters.engagement}
                  onValueChange={handleEngagementChange}
                  className="mb-1" 
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{filters.engagement[0]}%</span>
                  <span>{filters.engagement[1]}%</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Reset Button - only show if we have active filters */}
          {(filters.niche.length > 0 || 
            filters.region.length > 0 || 
            filters.engagement[0] > 0 || 
            filters.engagement[1] < 100 ||
            filters.matchScore > 50 ||
            filters.searchTerm) && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-400 hover:text-white"
            >
              <X className="mr-1 h-4 w-4" />
              Filter zurücksetzen
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile Filter Panel */}
      {isOpen && (
        <Card className="p-4 md:hidden border-jillr-neonPurple/30 bg-jillr-darkBlue/30">
          <div className="space-y-4">
            {/* Niche Tags */}
            <div>
              <h4 className="text-sm font-medium mb-2">Nischen</h4>
              <ScrollArea className="whitespace-nowrap pb-2">
                <div className="flex gap-2">
                  {niches.map(niche => (
                    <Badge
                      key={niche}
                      variant={filters.niche.includes(niche) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        filters.niche.includes(niche) 
                          ? 'bg-jillr-neonPurple' 
                          : 'bg-transparent border-jillr-neonPurple/30'
                      }`}
                      onClick={() => toggleNiche(niche)}
                    >
                      {niche}
                    </Badge>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            {/* Region Tags */}
            <div>
              <h4 className="text-sm font-medium mb-2">Region</h4>
              <ScrollArea className="whitespace-nowrap pb-2">
                <div className="flex gap-2">
                  {regions.map(region => (
                    <Badge
                      key={region}
                      variant={filters.region.includes(region) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        filters.region.includes(region) 
                          ? 'bg-jillr-neonPurple' 
                          : 'bg-transparent border-jillr-neonPurple/30'
                      }`}
                      onClick={() => toggleRegion(region)}
                    >
                      {region}
                    </Badge>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            {/* Match Score Slider */}
            <div>
              <h4 className="text-sm font-medium mb-2">Match Score: {filters.matchScore}%+</h4>
              <Slider 
                defaultValue={[filters.matchScore]} 
                max={100} 
                step={5}
                value={[filters.matchScore]}
                onValueChange={handleMatchScoreChange}
              />
            </div>
            
            {/* Engagement Rate Slider */}
            <div>
              <h4 className="text-sm font-medium mb-2">
                Engagement Rate: {filters.engagement[0]}% - {filters.engagement[1]}%
              </h4>
              <Slider 
                defaultValue={filters.engagement} 
                max={100} 
                step={1}
                value={filters.engagement}
                onValueChange={handleEngagementChange}
              />
            </div>
            
            {/* Apply Button */}
            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" onClick={clearAllFilters}>
                Zurücksetzen
              </Button>
              <Button onClick={() => setIsOpen(false)}>
                Anwenden
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      {/* Active Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {filters.niche.map(niche => (
          <Badge key={niche} variant="secondary" className="bg-jillr-neonPurple/20 text-white">
            {niche}
            <X 
              className="ml-1 h-3 w-3 cursor-pointer" 
              onClick={() => toggleNiche(niche)} 
            />
          </Badge>
        ))}
        
        {filters.region.map(region => (
          <Badge key={region} variant="secondary" className="bg-jillr-neonPurple/20 text-white">
            {region}
            <X 
              className="ml-1 h-3 w-3 cursor-pointer" 
              onClick={() => toggleRegion(region)} 
            />
          </Badge>
        ))}
        
        {(filters.matchScore > 50) && (
          <Badge variant="secondary" className="bg-jillr-neonPurple/20 text-white">
            Match Score: {filters.matchScore}%+
            <X 
              className="ml-1 h-3 w-3 cursor-pointer" 
              onClick={() => onFilterChange({ matchScore: 50 })} 
            />
          </Badge>
        )}
        
        {(filters.engagement[0] > 0 || filters.engagement[1] < 100) && (
          <Badge variant="secondary" className="bg-jillr-neonPurple/20 text-white">
            Engagement: {filters.engagement[0]}%-{filters.engagement[1]}%
            <X 
              className="ml-1 h-3 w-3 cursor-pointer" 
              onClick={() => onFilterChange({ engagement: [0, 100] })} 
            />
          </Badge>
        )}
        
        {searchTerm && (
          <Badge variant="secondary" className="bg-jillr-neonPurple/20 text-white">
            Suche: {searchTerm}
            <X 
              className="ml-1 h-3 w-3 cursor-pointer" 
              onClick={() => {
                setSearchTerm('');
                onFilterChange({ searchTerm: '' });
              }} 
            />
          </Badge>
        )}
      </div>
    </div>
  );
};

export default CreatorFilters;
