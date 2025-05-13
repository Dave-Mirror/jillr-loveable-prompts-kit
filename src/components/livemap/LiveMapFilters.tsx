
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { MapFilters } from '@/types/livemap';
import MapElementsFilter from './filters/MapElementsFilter';
import EasterEggTypesFilter from './filters/EasterEggTypesFilter';
import LocationFilter from './filters/LocationFilter';
import RewardsFilter from './filters/RewardsFilter';

interface LiveMapFiltersProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: MapFilters;
  onFilterChange: (category: string, value: string) => void;
  onRadiusChange: (value: number[]) => void;
  onResetFilters: () => void;
}

const LiveMapFilters: React.FC<LiveMapFiltersProps> = ({ 
  open, 
  onOpenChange,
  filters,
  onFilterChange,
  onRadiusChange,
  onResetFilters
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[320px] sm:w-[400px] bg-jillr-dark border-jillr-border">
        <SheetHeader className="border-b border-jillr-border pb-4">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-white">Filter Map</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        
        <div className="py-6 space-y-6 max-h-[calc(100vh-10rem)] overflow-y-auto">
          <MapElementsFilter 
            filters={filters} 
            onChange={onFilterChange} 
          />
          
          <EasterEggTypesFilter 
            filters={filters} 
            onChange={onFilterChange} 
          />
          
          <LocationFilter 
            filters={filters} 
            onChange={onFilterChange}
            onRadiusChange={onRadiusChange}
          />
          
          <RewardsFilter 
            filters={filters} 
            onChange={onFilterChange} 
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 border-t border-jillr-border p-4 bg-jillr-dark">
          <Button 
            onClick={onResetFilters} 
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

export default LiveMapFilters;
