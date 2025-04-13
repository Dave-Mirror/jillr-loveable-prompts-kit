
import React from 'react';
import { useLiveMap } from '@/hooks/useLiveMap';
import { Button } from '@/components/ui/button';
import MapElementsFilter from './filters/MapElementsFilter';
import EasterEggTypesFilter from './filters/EasterEggTypesFilter';
import LocationFilter from './filters/LocationFilter';
import RewardsFilter from './filters/RewardsFilter';

const LiveMapFilters = () => {
  const { filters, setFilters, resetFilters } = useLiveMap();

  const handleCheckboxChange = (category: string, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      
      if (!newFilters[category]) {
        newFilters[category] = [];
      }
      
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(item => item !== value);
      } else {
        newFilters[category] = [...newFilters[category], value];
      }
      
      return newFilters;
    });
  };

  const handleRadiusChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      radius: value[0]
    }));
  };

  return (
    <div className="space-y-6 py-4">
      <MapElementsFilter 
        filters={filters} 
        onChange={handleCheckboxChange} 
      />
      
      <EasterEggTypesFilter 
        filters={filters} 
        onChange={handleCheckboxChange} 
      />
      
      <LocationFilter 
        filters={filters} 
        onChange={handleCheckboxChange} 
        onRadiusChange={handleRadiusChange} 
      />
      
      <RewardsFilter 
        filters={filters} 
        onChange={handleCheckboxChange} 
      />
      
      <div className="pt-4 flex justify-end">
        <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
      </div>
    </div>
  );
};

export default LiveMapFilters;
