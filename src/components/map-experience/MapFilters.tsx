
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import MapElementsFilter from '@/components/livemap/filters/MapElementsFilter';
import EasterEggTypesFilter from '@/components/livemap/filters/EasterEggTypesFilter';
import LocationFilter from '@/components/livemap/filters/LocationFilter';
import RewardsFilter from '@/components/livemap/filters/RewardsFilter';
import { useLiveMap } from '@/hooks/useLiveMap';

type MapMode = 'all' | 'challenges' | 'eastereggs' | 'ugc' | 'cityclash';

interface MapFiltersProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mapMode: MapMode;
}

const MapFilters: React.FC<MapFiltersProps> = ({ open, onOpenChange, mapMode }) => {
  const { filters, setFilters, resetFilters } = useLiveMap();
  
  // Handler für Filter-Updates
  const handleFilterChange = (category: string, value: string) => {
    setFilters(prev => {
      // Handle mapElements filter
      if (category === 'mapElements') {
        const currentElements = [...prev.mapElements];
        if (currentElements.includes(value as any)) {
          return {
            ...prev,
            mapElements: currentElements.filter(item => item !== value)
          };
        } else {
          return {
            ...prev,
            mapElements: [...currentElements, value as any]
          };
        }
      }
      
      // Handle easterEggTypes filter
      if (category === 'easterEggTypes') {
        const currentTypes = [...prev.easterEggTypes];
        if (currentTypes.includes(value)) {
          return {
            ...prev,
            easterEggTypes: currentTypes.filter(item => item !== value)
          };
        } else {
          return {
            ...prev,
            easterEggTypes: [...currentTypes, value]
          };
        }
      }
      
      // Handle locationFilters filter
      if (category === 'locationFilters') {
        const currentLocations = [...prev.locationFilters];
        if (currentLocations.includes(value)) {
          return {
            ...prev,
            locationFilters: currentLocations.filter(item => item !== value)
          };
        } else {
          return {
            ...prev,
            locationFilters: [...currentLocations, value]
          };
        }
      }
      
      // Handle rewardFilters filter
      if (category === 'rewardFilters') {
        const currentRewards = [...prev.rewardFilters];
        if (currentRewards.includes(value)) {
          return {
            ...prev,
            rewardFilters: currentRewards.filter(item => item !== value)
          };
        } else {
          return {
            ...prev,
            rewardFilters: [...currentRewards, value]
          };
        }
      }
      
      return prev;
    });
  };
  
  // Handler für Radius-Updates
  const handleRadiusChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      radius: value[0]
    }));
  };

  // Zeige unterschiedliche Filter basierend auf dem ausgewählten Map-Modus
  const renderFilterSections = () => {
    switch(mapMode) {
      case 'challenges':
        return (
          <>
            <MapElementsFilter filters={filters} onChange={handleFilterChange} />
            <LocationFilter 
              filters={filters} 
              onChange={handleFilterChange}
              onRadiusChange={handleRadiusChange}
            />
            <RewardsFilter filters={filters} onChange={handleFilterChange} />
          </>
        );
      case 'eastereggs':
        return (
          <>
            <EasterEggTypesFilter filters={filters} onChange={handleFilterChange} />
            <LocationFilter 
              filters={filters} 
              onChange={handleFilterChange}
              onRadiusChange={handleRadiusChange}
            />
            <RewardsFilter filters={filters} onChange={handleFilterChange} />
          </>
        );
      case 'cityclash':
        return (
          <>
            <LocationFilter 
              filters={filters} 
              onChange={handleFilterChange}
              onRadiusChange={handleRadiusChange}
            />
            <RewardsFilter filters={filters} onChange={handleFilterChange} />
          </>
        );
      case 'ugc':
        return (
          <>
            <MapElementsFilter filters={filters} onChange={handleFilterChange} />
            <LocationFilter 
              filters={filters} 
              onChange={handleFilterChange}
              onRadiusChange={handleRadiusChange}
            />
            <RewardsFilter filters={filters} onChange={handleFilterChange} />
          </>
        );
      default:
        return (
          <>
            <MapElementsFilter filters={filters} onChange={handleFilterChange} />
            <EasterEggTypesFilter filters={filters} onChange={handleFilterChange} />
            <LocationFilter 
              filters={filters} 
              onChange={handleFilterChange}
              onRadiusChange={handleRadiusChange}
            />
            <RewardsFilter filters={filters} onChange={handleFilterChange} />
          </>
        );
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[320px] sm:w-[400px] bg-jillr-dark border-jillr-border">
        <SheetHeader className="border-b border-jillr-border pb-4">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-white">
              {mapMode === 'all' ? 'Filter' : `${mapMode.charAt(0).toUpperCase() + mapMode.slice(1)} Filter`}
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        
        <div className="py-6 space-y-6 max-h-[calc(100vh-10rem)] overflow-y-auto">
          {renderFilterSections()}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 border-t border-jillr-border p-4 bg-jillr-dark">
          <Button 
            onClick={resetFilters} 
            variant="outline" 
            className="w-full"
          >
            Filter zurücksetzen
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MapFilters;
