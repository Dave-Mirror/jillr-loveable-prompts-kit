
import React from 'react';
import { Camera, Video, Footprints, Glasses, MapPin, Filter, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CategoryFilterProps } from './types';

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categoryFilter, setCategoryFilter }) => {
  return (
    <div className="space-y-2">
      <h5 className="text-xs text-white/70">Kategorien</h5>
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={categoryFilter === 'all' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setCategoryFilter('all')}
        >
          All
        </Badge>
        <Badge 
          variant={categoryFilter === 'video' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setCategoryFilter('video')}
        >
          <Video className="mr-1 h-3 w-3" /> Video
        </Badge>
        <Badge 
          variant={categoryFilter === 'photo' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setCategoryFilter('photo')}
        >
          <Camera className="mr-1 h-3 w-3" /> Foto
        </Badge>
        <Badge 
          variant={categoryFilter === 'fitness' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setCategoryFilter('fitness')}
        >
          <Footprints className="mr-1 h-3 w-3" /> Fitness
        </Badge>
        <Badge 
          variant={categoryFilter === 'ar' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setCategoryFilter('ar')}
        >
          <Glasses className="mr-1 h-3 w-3" /> AR
        </Badge>
        <Badge 
          variant={categoryFilter === 'geofencing' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setCategoryFilter('geofencing')}
        >
          <MapPin className="mr-1 h-3 w-3" /> Geofencing
        </Badge>
        <Badge 
          variant={categoryFilter === 'easter-egg' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setCategoryFilter('easter-egg')}
        >
          <Filter className="mr-1 h-3 w-3" /> Easter Egg
        </Badge>
        <Badge 
          variant={categoryFilter === 'social' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setCategoryFilter('social')}
        >
          <Users className="mr-1 h-3 w-3" /> Social
        </Badge>
      </div>
    </div>
  );
};

export default CategoryFilter;
