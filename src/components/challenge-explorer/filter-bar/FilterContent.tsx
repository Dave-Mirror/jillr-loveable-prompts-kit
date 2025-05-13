
import React from 'react';
import CategoryFilter from './CategoryFilter';
import BrandFilter from './BrandFilter';
import LocationFilter from './LocationFilter';
import TimeFilter from './TimeFilter';
import { FilterBarProps } from './types';

const FilterContent: React.FC<FilterBarProps> = ({ 
  categoryFilter, 
  setCategoryFilter, 
  brandFilter, 
  setBrandFilter,
  locationFilter,
  setLocationFilter,
  timeFilter,
  setTimeFilter
}) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-sm text-white">All Filters</h4>
      
      <CategoryFilter 
        categoryFilter={categoryFilter} 
        setCategoryFilter={setCategoryFilter} 
      />
      
      <BrandFilter 
        brandFilter={brandFilter} 
        setBrandFilter={setBrandFilter} 
      />
      
      <LocationFilter 
        locationFilter={locationFilter} 
        setLocationFilter={setLocationFilter} 
      />
      
      <TimeFilter 
        timeFilter={timeFilter} 
        setTimeFilter={setTimeFilter} 
      />
    </div>
  );
};

export default FilterContent;
