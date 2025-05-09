
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SliderPrimitive } from "@radix-ui/react-slider";
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Sparkles, Map, Trophy, Gift, Flag } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import FilterSection from './filters/FilterSection';
import MapElementsFilter from './filters/MapElementsFilter';
import RewardsFilter from './filters/RewardsFilter';
import EasterEggTypesFilter from './filters/EasterEggTypesFilter';
import LocationFilter from './filters/LocationFilter';
import FilterCheckboxItem from './filters/FilterCheckboxItem';

const LiveMapFilters = () => {
  const { toast } = useToast();
  const [filterMode, setFilterMode] = useState<string>('kategorien');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [distanceRange, setDistanceRange] = useState<number>(5); // km
  
  // Filter-Tab-Kategorien
  const filterCategories = {
    'kategorien': [
      { id: 'challenges', label: 'Challenges', icon: <Flag className="h-4 w-4" /> },
      { id: 'rewards', label: 'Belohnungen', icon: <Gift className="h-4 w-4" /> },
      { id: 'events', label: 'Events', icon: <Trophy className="h-4 w-4" /> },
      { id: 'eastereggs', label: 'Easter Eggs', icon: <Sparkles className="h-4 w-4" /> }
    ],
    'umgebung': [
      { id: '1km', label: '1 km', value: 1 },
      { id: '5km', label: '5 km', value: 5 },
      { id: '10km', label: '10 km', value: 10 },
      { id: '50km', label: '50 km', value: 50 }
    ]
  };
  
  const toggleFilter = (id: string) => {
    setSelectedFilters(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };
  
  const applyFilters = () => {
    toast({
      title: "Filter angewendet",
      description: `${selectedFilters.length} Filter ausgewählt${
        distanceRange ? ` • Umkreis: ${distanceRange} km` : ''
      }`,
    });
  };
  
  const resetFilters = () => {
    setSelectedFilters([]);
    setDistanceRange(5);
    toast({
      title: "Filter zurückgesetzt",
      description: "Alle Filter wurden zurückgesetzt",
    });
  };

  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Karte filtern</h2>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2 text-xs text-jillr-neonPurple">
          Zurücksetzen
        </Button>
      </div>
      
      <Tabs value={filterMode} onValueChange={setFilterMode} className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="kategorien" className="text-xs">Nach Kategorien</TabsTrigger>
          <TabsTrigger value="umgebung" className="text-xs">Nach Umgebung</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {filterMode === 'kategorien' ? (
        <ScrollArea className="h-[calc(100vh-280px)] pr-4">
          <div className="space-y-6">
            {/* Quick Filter Chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {filterCategories.kategorien.map(category => (
                <Badge
                  key={category.id}
                  variant="outline"
                  className={`rounded-full px-3 py-1 cursor-pointer flex items-center gap-1.5 ${
                    selectedFilters.includes(category.id)
                      ? 'bg-jillr-neonPurple text-white border-jillr-neonPurple'
                      : 'bg-white/5 text-white/70 border-white/20 hover:border-white/40'
                  }`}
                  onClick={() => toggleFilter(category.id)}
                >
                  {category.icon}
                  {category.label}
                  {selectedFilters.includes(category.id) && <Check className="h-3 w-3" />}
                </Badge>
              ))}
            </div>
            
            {/* Main Filter Sections */}
            <FilterSection title="Kartenelemente">
              <MapElementsFilter 
                selectedFilters={selectedFilters} 
                toggleFilter={toggleFilter} 
              />
            </FilterSection>
            
            <Separator className="bg-white/10" />
            
            <FilterSection title="Belohnungen">
              <RewardsFilter 
                selectedFilters={selectedFilters} 
                toggleFilter={toggleFilter} 
              />
            </FilterSection>
            
            <Separator className="bg-white/10" />
            
            <FilterSection title="Easter Eggs">
              <EasterEggTypesFilter 
                selectedFilters={selectedFilters} 
                toggleFilter={toggleFilter} 
              />
            </FilterSection>
            
            <div className="h-12"></div> {/* Extra space at bottom for scrolling */}
          </div>
        </ScrollArea>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium flex justify-between">
              <span>Umkreis: {distanceRange} km</span>
            </label>
            <div className="pt-4 px-2">
              <SliderPrimitive.Root
                className="relative flex items-center w-full h-5 select-none touch-none"
                defaultValue={[distanceRange]}
                value={[distanceRange]}
                onValueChange={(value) => setDistanceRange(value[0])}
                max={50}
                min={0}
                step={1}
                aria-label="Distance Range"
              >
                <SliderPrimitive.Track
                  className="relative bg-white/20 grow rounded-full h-1"
                >
                  <SliderPrimitive.Range className="absolute bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPink h-full rounded-full" />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb
                  className="block w-5 h-5 rounded-full bg-jillr-neonPurple focus:outline-none focus:ring-2 focus:ring-jillr-neonPurple focus:ring-offset-2 ring-offset-background"
                />
              </SliderPrimitive.Root>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filterCategories.umgebung.map(range => (
              <Badge
                key={range.id}
                variant="outline"
                className={`rounded-full px-3 py-1 cursor-pointer ${
                  distanceRange === range.value
                    ? 'bg-jillr-neonPurple text-white border-jillr-neonPurple'
                    : 'bg-white/5 text-white/70 border-white/20 hover:border-white/40'
                }`}
                onClick={() => setDistanceRange(range.value)}
              >
                {range.label}
              </Badge>
            ))}
          </div>
          
          <Separator className="bg-white/10" />
          
          <LocationFilter />
          
          <div className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Nur verfügbare anzeigen</span>
              <Switch id="available-only" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Nur neue anzeigen</span>
              <Switch id="new-only" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Nur geöffnete anzeigen</span>
              <Switch id="open-only" />
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6 sticky bottom-0 bg-jillr-darkBlue py-4 border-t border-white/10">
        <Button 
          className="w-full bg-jillr-neonPurple hover:bg-jillr-neonPurple/90"
          onClick={applyFilters}
        >
          Filter anwenden
        </Button>
      </div>
    </div>
  );
};

export default LiveMapFilters;
