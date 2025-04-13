
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CategoryFiltersProps {
  title: string;
  filters: string[];
  createLabel?: string;
}

const CategoryFilters = ({ title, filters, createLabel }: CategoryFiltersProps) => {
  return (
    <div className="mb-6 p-4 bg-muted rounded-lg">
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <Badge key={index} variant="outline" className="cursor-pointer">
            {filter}
          </Badge>
        ))}
        {createLabel && (
          <Badge variant="outline" className="cursor-pointer">
            {createLabel}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default CategoryFilters;
