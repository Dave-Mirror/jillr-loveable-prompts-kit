
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BrandFilterProps, mockBrands } from './types';

const BrandFilter: React.FC<BrandFilterProps> = ({ brandFilter, setBrandFilter }) => {
  return (
    <div className="space-y-2">
      <h5 className="text-xs text-white/70">Brands</h5>
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={brandFilter === 'all' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setBrandFilter('all')}
        >
          All Brands
        </Badge>
        {mockBrands.map(brand => (
          <Badge 
            key={brand.id}
            variant={brandFilter === brand.name ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setBrandFilter(brand.name)}
          >
            {brand.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
