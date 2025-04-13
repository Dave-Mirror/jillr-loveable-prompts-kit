
import React from 'react';
import FilterSection from './FilterSection';
import FilterCheckboxItem from './FilterCheckboxItem';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { MapPin, Flame } from 'lucide-react';
import { MapFilters } from '@/types/livemap';

interface LocationFilterProps {
  filters: MapFilters;
  onChange: (category: string, value: string) => void;
  onRadiusChange: (value: number[]) => void;
}

const LocationFilter: React.FC<LocationFilterProps> = ({ 
  filters, 
  onChange, 
  onRadiusChange 
}) => {
  return (
    <FilterSection title="Location">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <Label>Distance radius: {filters.radius} km</Label>
          </div>
          <Slider 
            defaultValue={[5]} 
            max={20} 
            step={1}
            value={[filters.radius || 5]}
            onValueChange={onRadiusChange}
          />
        </div>
        
        <div className="space-y-3">
          <FilterCheckboxItem 
            id="nearby" 
            label="In my area"
            checked={filters.locationFilters?.includes('nearby')}
            onChange={() => onChange('locationFilters', 'nearby')}
            icon={<MapPin className="h-4 w-4" />}
          />
          
          <FilterCheckboxItem 
            id="popular" 
            label="Popular locations"
            checked={filters.locationFilters?.includes('popular')}
            onChange={() => onChange('locationFilters', 'popular')}
            icon={<Flame className="h-4 w-4" />}
          />
        </div>
      </div>
    </FilterSection>
  );
};

export default LocationFilter;
