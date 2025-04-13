
import React from 'react';
import FilterSection from './FilterSection';
import FilterCheckboxItem from './FilterCheckboxItem';
import { MapFilters } from '@/types/livemap';

interface EasterEggTypesFilterProps {
  filters: MapFilters;
  onChange: (category: string, value: string) => void;
}

const EasterEggTypesFilter: React.FC<EasterEggTypesFilterProps> = ({ filters, onChange }) => {
  return (
    <FilterSection title="Easter Egg Types">
      <div className="space-y-3">
        <FilterCheckboxItem 
          id="ar-object" 
          label="AR Objects"
          checked={filters.easterEggTypes?.includes('ar')}
          onChange={() => onChange('easterEggTypes', 'ar')}
        />
        
        <FilterCheckboxItem 
          id="qr-code" 
          label="QR Codes"
          checked={filters.easterEggTypes?.includes('qr')}
          onChange={() => onChange('easterEggTypes', 'qr')}
        />
        
        <FilterCheckboxItem 
          id="geofencing" 
          label="Geofencing Zones"
          checked={filters.easterEggTypes?.includes('geofencing')}
          onChange={() => onChange('easterEggTypes', 'geofencing')}
        />
        
        <FilterCheckboxItem 
          id="nfc-tag" 
          label="NFC Tags"
          checked={filters.easterEggTypes?.includes('nfc')}
          onChange={() => onChange('easterEggTypes', 'nfc')}
        />
      </div>
    </FilterSection>
  );
};

export default EasterEggTypesFilter;
