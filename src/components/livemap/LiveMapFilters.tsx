
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SlidersHorizontal, X } from 'lucide-react';
import MapElementsFilter from './filters/MapElementsFilter';
import RewardsFilter from './filters/RewardsFilter';
import EasterEggTypesFilter from './filters/EasterEggTypesFilter';
import LocationFilter from './filters/LocationFilter';

// Define basic filter props to be extended by specific filters
interface BaseFilterProps {
  selectedFilters: string[];
  toggleFilter: (id: string) => void;
}

// Create props for LocationFilter
interface LocationFilterProps {
  filters: {
    radius: number;
    location: string;
  };
  onChange: (key: string, value: string) => void;
  onRadiusChange: (value: number) => void;
}

const LiveMapFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('elements');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  // Location filter state
  const [locationFilters, setLocationFilters] = useState({
    radius: 5,
    location: '',
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
    setLocationFilters({
      radius: 5,
      location: '',
    });
  };

  const handleLocationChange = (key: string, value: string) => {
    setLocationFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRadiusChange = (value: number) => {
    setLocationFilters(prev => ({
      ...prev,
      radius: value,
    }));
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
                  selectedFilters={selectedFilters}
                  toggleFilter={toggleFilter}
                />
              </TabsContent>
              
              <TabsContent value="rewards">
                <RewardsFilter
                  selectedFilters={selectedFilters}
                  toggleFilter={toggleFilter}
                />
              </TabsContent>
              
              <TabsContent value="easter-eggs">
                <EasterEggTypesFilter 
                  selectedFilters={selectedFilters}
                  toggleFilter={toggleFilter}
                />
              </TabsContent>
              
              <TabsContent value="location">
                <LocationFilter 
                  filters={locationFilters}
                  onChange={handleLocationChange}
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
