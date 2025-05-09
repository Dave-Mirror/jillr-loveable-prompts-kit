
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
      className="mb-8 p-5 bg-jillr-darkAccent/30 backdrop-blur-md border border-jillr-border/20 rounded-xl shadow-lg"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
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
              className="h-9 px-3 text-xs hover:bg-jillr-darkLight"
            >
              <FilterX className="h-3 w-3 mr-1" /> Reset
            </Button>
          )}
          
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'grid' | 'dropdown')} className="bg-jillr-darkLight/50 p-1 rounded-lg">
            <ToggleGroupItem value="grid" size="sm" className="h-7 px-3 py-1 text-xs rounded-md data-[state=on]:bg-jillr-darkAccent data-[state=on]:shadow-sm">
              <ChevronDown className="h-3 w-3" />
              <span className="ml-1">Grid</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="dropdown" size="sm" className="h-7 px-3 py-1 text-xs rounded-md data-[state=on]:bg-jillr-darkAccent data-[state=on]:shadow-sm">
              <ChevronUp className="h-3 w-3" />
              <span className="ml-1">Dropdown</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="flex flex-wrap gap-2 mt-3">
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
                  cursor-pointer transition-all duration-200 hover:scale-105 px-3 py-1.5 text-sm
                  ${selectedFilter === filter 
                    ? "bg-jillr-neonPurple text-white shadow-sm" 
                    : "bg-jillr-darkLight/50 hover:bg-jillr-darkLight/80 border-jillr-border/30"}
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
              className="cursor-pointer bg-jillr-neonPink/10 border-jillr-neonPink/30 text-jillr-neonPink hover:bg-jillr-neonPink/20 transition-all hover:scale-105 px-3 py-1.5 text-sm"
            >
              {createLabel}
            </Badge>
          )}
        </div>
      ) : (
        <div className="mt-3">
          <Select value={selectedFilter || ""} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-full sm:w-[260px] bg-jillr-darkLight/50 border-jillr-border/30">
              <SelectValue placeholder={`Wähle ${title}...`} />
            </SelectTrigger>
            <SelectContent className="z-50 bg-jillr-darkAccent/95 backdrop-blur-md border-jillr-border/30">
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
