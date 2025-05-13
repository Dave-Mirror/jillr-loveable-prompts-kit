
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { LocationFilterProps } from './types';

const LocationFilter: React.FC<LocationFilterProps> = ({ locationFilter, setLocationFilter }) => {
  return (
    <div className="space-y-2">
      <h5 className="text-xs text-white/70">Location</h5>
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={locationFilter === 'current' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setLocationFilter('current')}
        >
          Current Location
        </Badge>
        <Badge 
          variant={locationFilter === 'city' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setLocationFilter('city')}
        >
          City Wide
        </Badge>
        <Badge 
          variant={locationFilter === 'global' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setLocationFilter('global')}
        >
          Global
        </Badge>
      </div>
    </div>
  );
};

export default LocationFilter;
