
import React, { useState } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { FilterBarProps } from './types';
import SearchBar from './SearchBar';
import FilterContent from './FilterContent';
import QuickFilters from './QuickFilters';

const FilterBar: React.FC<FilterBarProps> = (props) => {
  const {
    categoryFilter,
    setCategoryFilter,
    brandFilter,
    setBrandFilter,
    locationFilter,
    setLocationFilter,
    timeFilter,
    setTimeFilter
  } = props;

  // Calculate active filters count
  const activeFiltersCount = 
    (categoryFilter !== 'all' ? 1 : 0) +
    (brandFilter !== 'all' ? 1 : 0) +
    (locationFilter !== 'global' ? 1 : 0) +
    (timeFilter !== 'all' ? 1 : 0);

  // Reset all filters to default values
  const resetFilters = () => {
    setCategoryFilter('all');
    setBrandFilter('all');
    setLocationFilter('global');
    setTimeFilter('all');
  };

  return (
    <div className="w-full backdrop-blur-md bg-jillr-dark/70 rounded-xl p-2 border border-jillr-border shadow-md">
      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-2">
        <SearchBar />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10 border-jillr-border">
              <Filter className="h-4 w-4 text-white" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-jillr-neonPurple text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-jillr-dark border-jillr-border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Filters</span>
              {activeFiltersCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="text-xs text-gray-400 hover:text-white h-7 px-2"
                >
                  <X className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              )}
            </div>
            <FilterContent {...props} />
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Quick Filters */}
      <QuickFilters
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
      />
      
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {categoryFilter !== 'all' && (
            <Badge variant="secondary" className="bg-jillr-neonBlue/20 text-white">
              Category: {categoryFilter}
              <X 
                className="ml-1 h-3.5 w-3.5 cursor-pointer" 
                onClick={() => setCategoryFilter('all')} 
              />
            </Badge>
          )}
          
          {brandFilter !== 'all' && (
            <Badge variant="secondary" className="bg-jillr-neonPurple/20 text-white">
              Brand: {brandFilter}
              <X 
                className="ml-1 h-3.5 w-3.5 cursor-pointer" 
                onClick={() => setBrandFilter('all')} 
              />
            </Badge>
          )}
          
          {locationFilter !== 'global' && (
            <Badge variant="secondary" className="bg-gray-700/40 text-white">
              Location: {locationFilter === 'current' ? 'Near Me' : 'City'}
              <X 
                className="ml-1 h-3.5 w-3.5 cursor-pointer" 
                onClick={() => setLocationFilter('global')} 
              />
            </Badge>
          )}
          
          {timeFilter !== 'all' && (
            <Badge variant="secondary" className="bg-gray-700/40 text-white">
              Time: {timeFilter === 'now' ? 'Live Now' : timeFilter === 'today' ? 'Today' : 'This Week'}
              <X 
                className="ml-1 h-3.5 w-3.5 cursor-pointer" 
                onClick={() => setTimeFilter('all')} 
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
