
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface CategoryFiltersProps {
  title: string;
  filters: string[];
  createLabel?: string;
}

const CategoryFilters = ({ title, filters, createLabel }: CategoryFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  // Show only 5 filters initially, show all when expanded
  const visibleFilters = isExpanded ? filters : filters.slice(0, 5);
  const hasMoreFilters = filters.length > 5;

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
      <div className="flex items-center justify-between mb-3">
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
          
          {hasMoreFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="h-8 px-2 text-xs hover:bg-jillr-darkLight"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" /> Weniger
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" /> Mehr
                </>
              )}
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {visibleFilters.map((filter, index) => (
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
                  cursor-pointer transition-all hover:scale-105
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
        </AnimatePresence>
        
        {createLabel && (
          <Badge 
            variant="outline" 
            className="cursor-pointer bg-jillr-neonPink/10 border-jillr-neonPink/30 text-jillr-neonPink hover:bg-jillr-neonPink/20 transition-all hover:scale-105"
          >
            {createLabel}
          </Badge>
        )}
      </div>
    </motion.div>
  );
};

export default CategoryFilters;
