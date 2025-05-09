
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SlidersHorizontal, X } from 'lucide-react';
import MapElementsFilter from './filters/MapElementsFilter';
import RewardsFilter from './filters/RewardsFilter';
import EasterEggTypesFilter from './filters/EasterEggTypesFilter';
import LocationFilter from './filters/LocationFilter';
import { MapFilters } from '@/types/livemap';

const LiveMapFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('elements');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  // Create full filters state
  const [filters, setFilters] = useState<MapFilters>({
    mapElements: ['easteregg', 'drop', 'challenge', 'teamevent'],
    easterEggTypes: [],
    radius: 5,
    locationFilters: ['nearby'],
    rewardFilters: []
  });

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setFilters({
      mapElements: ['easteregg', 'drop', 'challenge', 'teamevent'],
      easterEggTypes: [],
      radius: 5,
      locationFilters: ['nearby'],
      rewardFilters: []
    });
  };

  const handleFilterChange = (category: string, value: string) => {
    setFilters(prev => {
      const currentValues = prev[category as keyof MapFilters] as string[];
      
      // Toggle the value in the array
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [category]: newValues
      };
    });
    
    // Update selected filters for badge display
    toggleFilter(value);
  };

  const handleRadiusChange = (value: number[]) => {
    if (value.length > 0) {
      setFilters(prev => ({
        ...prev,
        radius: value[0]
      }));
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">LiveMap</h2>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
            >
              <SlidersHorizontal size={16} />
              <span>Filter</span>
              {selectedFilters.length > 0 && (
                <Badge variant="secondary" className="ml-1 bg-jillr-neonPurple text-white">
                  {selectedFilters.length}
                </Badge>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>LiveMap Filter</span>
                {selectedFilters.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Alle zurücksetzen
                  </Button>
                )}
              </DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="elements" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="elements">Elemente</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="easter-eggs">Easter Eggs</TabsTrigger>
                <TabsTrigger value="location">Standort</TabsTrigger>
              </TabsList>
              
              <TabsContent value="elements">
                <MapElementsFilter 
                  filters={filters}
                  onChange={handleFilterChange}
                />
              </TabsContent>
              
              <TabsContent value="rewards">
                <RewardsFilter
                  filters={filters}
                  onChange={handleFilterChange}
                />
              </TabsContent>
              
              <TabsContent value="easter-eggs">
                <EasterEggTypesFilter 
                  filters={filters}
                  onChange={handleFilterChange}
                />
              </TabsContent>
              
              <TabsContent value="location">
                <LocationFilter 
                  filters={filters}
                  onChange={handleFilterChange}
                  onRadiusChange={handleRadiusChange}
                />
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-between mt-4">
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                <X size={16} className="mr-2" />
                Close
              </Button>
              <Button onClick={() => setIsOpen(false)}>Apply Filters</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedFilters.map(filter => (
            <Badge 
              key={filter} 
              variant="outline"
              className="flex items-center gap-1 bg-jillr-darkBlue px-2 py-1"
            >
              <span>{filter}</span>
              <X 
                size={14} 
                className="cursor-pointer ml-1" 
                onClick={() => toggleFilter(filter)}
              />
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-xs text-muted-foreground hover:text-white"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default LiveMapFilters;
