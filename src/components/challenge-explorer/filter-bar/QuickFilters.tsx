
import React from 'react';
import { Camera, Footprints, Glasses, MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { QuickFiltersProps } from './types';

const QuickFilters: React.FC<QuickFiltersProps> = ({ 
  categoryFilter, 
  setCategoryFilter, 
  timeFilter, 
  setTimeFilter,
  locationFilter,
  setLocationFilter
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      <Badge 
        variant={categoryFilter === 'all' ? 'default' : 'outline'}
        className="cursor-pointer whitespace-nowrap"
        onClick={() => setCategoryFilter('all')}
      >
        All Challenges
      </Badge>
      <Badge 
        variant={categoryFilter === 'video' ? 'default' : 'outline'}
        className="cursor-pointer whitespace-nowrap"
        onClick={() => setCategoryFilter('video')}
      >
        <Camera className="mr-1 h-3 w-3" /> Video
      </Badge>
      <Badge 
        variant={categoryFilter === 'fitness' ? 'default' : 'outline'}
        className="cursor-pointer whitespace-nowrap"
        onClick={() => setCategoryFilter('fitness')}
      >
        <Footprints className="mr-1 h-3 w-3" /> Fitness
      </Badge>
      <Badge 
        variant={categoryFilter === 'ar' ? 'default' : 'outline'}
        className="cursor-pointer whitespace-nowrap"
        onClick={() => setCategoryFilter('ar')}
      >
        <Glasses className="mr-1 h-3 w-3" /> AR
      </Badge>
      <Badge 
        variant={timeFilter === 'now' ? 'default' : 'outline'}
        className="cursor-pointer whitespace-nowrap"
        onClick={() => setTimeFilter('now')}
      >
        <Clock className="mr-1 h-3 w-3" /> Live Now
      </Badge>
      <Badge 
        variant={locationFilter === 'current' ? 'default' : 'outline'}
        className="cursor-pointer whitespace-nowrap"
        onClick={() => setLocationFilter('current')}
      >
        <MapPin className="mr-1 h-3 w-3" /> Near Me
      </Badge>
    </div>
  );
};

export default QuickFilters;
