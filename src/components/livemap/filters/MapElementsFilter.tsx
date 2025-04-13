
import React from 'react';
import FilterSection from './FilterSection';
import FilterCheckboxItem from './FilterCheckboxItem';
import { Gift, Package, Target, Users } from 'lucide-react';
import { MapFilters } from '@/types/livemap';

interface MapElementsFilterProps {
  filters: MapFilters;
  onChange: (category: string, value: string) => void;
}

const MapElementsFilter: React.FC<MapElementsFilterProps> = ({ filters, onChange }) => {
  return (
    <FilterSection title="Map Elements">
      <div className="space-y-3">
        <FilterCheckboxItem 
          id="easter-eggs" 
          label="Easter Eggs"
          checked={filters.mapElements?.includes('easteregg')}
          onChange={() => onChange('mapElements', 'easteregg')}
          icon={<Gift className="h-4 w-4 text-yellow-500" />}
        />
        
        <FilterCheckboxItem 
          id="product-drops" 
          label="Product Drops"
          checked={filters.mapElements?.includes('drop')}
          onChange={() => onChange('mapElements', 'drop')}
          icon={<Package className="h-4 w-4 text-blue-500" />}
        />
        
        <FilterCheckboxItem 
          id="challenges" 
          label="Challenges"
          checked={filters.mapElements?.includes('challenge')}
          onChange={() => onChange('mapElements', 'challenge')}
          icon={<Target className="h-4 w-4 text-red-500" />}
        />
        
        <FilterCheckboxItem 
          id="team-events" 
          label="Team Events"
          checked={filters.mapElements?.includes('teamevent')}
          onChange={() => onChange('mapElements', 'teamevent')}
          icon={<Users className="h-4 w-4 text-purple-500" />}
        />
      </div>
    </FilterSection>
  );
};

export default MapElementsFilter;
