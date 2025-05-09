
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

interface CategoryFiltersProps {
  title: string;
  filters: string[];
  createLabel?: string;
}

const CategoryFilters = ({ title, filters, createLabel }: CategoryFiltersProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'dropdown'>(filters.length > 5 ? 'dropdown' : 'grid');

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(selectedFilter === filter ? null : filter);
  };

  const handleReset = () => {
    setSelectedFilter(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 p-4 bg-jillr-darkAccent/50 backdrop-blur-sm border border-jillr-border/30 rounded-lg"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <h3 className="font-medium text-sm md:text-base flex items-center">
          {title}
          {selectedFilter && (
            <Badge variant="outline" className="ml-2 bg-jillr-neonPurple/20 border-jillr-neonPurple/30">
              {selectedFilter}
            </Badge>
          )}
        </h3>
        
        <div className="flex items-center gap-2">
          {selectedFilter && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleReset} 
              className="h-8 px-2 text-xs hover:bg-jillr-darkLight"
            >
              <FilterX className="h-3 w-3 mr-1" /> Reset
            </Button>
          )}
          
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'grid' | 'dropdown')}>
            <ToggleGroupItem value="grid" size="sm" className="h-8 px-2 text-xs">
              <ChevronDown className="h-3 w-3" />
              <span className="ml-1">Grid</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="dropdown" size="sm" className="h-8 px-2 text-xs">
              <ChevronUp className="h-3 w-3" />
              <span className="ml-1">Dropdown</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="flex flex-wrap gap-2 mt-2">
          {filters.map((filter, index) => (
            <motion.div
              key={filter}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
            >
              <Badge 
                variant={selectedFilter === filter ? "default" : "outline"} 
                className={`
                  cursor-pointer transition-all hover:scale-105 px-3 py-1.5
                  ${selectedFilter === filter 
                    ? "bg-jillr-neonPurple text-white" 
                    : "bg-jillr-darkLight hover:bg-jillr-darkLight/80 border-jillr-border"}
                `}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </Badge>
            </motion.div>
          ))}
          
          {createLabel && (
            <Badge 
              variant="outline" 
              className="cursor-pointer bg-jillr-neonPink/10 border-jillr-neonPink/30 text-jillr-neonPink hover:bg-jillr-neonPink/20 transition-all hover:scale-105 px-3 py-1.5"
            >
              {createLabel}
            </Badge>
          )}
        </div>
      ) : (
        <div className="mt-2">
          <Select value={selectedFilter || ""} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-full sm:w-[240px] bg-jillr-darkLight border-jillr-border">
              <SelectValue placeholder={`Wähle ${title}...`} />
            </SelectTrigger>
            <SelectContent className="z-50 bg-jillr-darkAccent border-jillr-border">
              {filters.map((filter) => (
                <SelectItem key={filter} value={filter} className="hover:bg-jillr-darkLight focus:bg-jillr-darkLight">
                  {filter}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {createLabel && (
            <Button
              variant="ghost" 
              size="sm" 
              className="mt-2 text-jillr-neonPink hover:bg-jillr-neonPink/10 hover:text-jillr-neonPink"
            >
              {createLabel}
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default CategoryFilters;
