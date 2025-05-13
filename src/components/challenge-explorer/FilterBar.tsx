
import React, { useState } from 'react';
import { Camera, Footprints, Glasses, MapPin, Clock, Filter, ChevronDown, Search } from 'lucide-react';
import { ChallengeCategory, BrandFilter, LocationFilter, TimeFilter } from '@/pages/ChallengeExplorer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

interface FilterBarProps {
  categoryFilter: ChallengeCategory;
  setCategoryFilter: (filter: ChallengeCategory) => void;
  brandFilter: BrandFilter;
  setBrandFilter: (filter: BrandFilter) => void;
  locationFilter: LocationFilter;
  setLocationFilter: (filter: LocationFilter) => void;
  timeFilter: TimeFilter;
  setTimeFilter: (filter: TimeFilter) => void;
}

// Mock brand data
const mockBrands = [
  { id: 'b1', name: 'Nike', logo: '/assets/brands/nike-logo.png' },
  { id: 'b2', name: 'Adidas', logo: '/assets/brands/adidas-logo.png' },
  { id: 'b3', name: 'Starbucks', logo: '/assets/brands/starbucks-logo.png' },
  { id: 'b4', name: 'Sephora', logo: '/assets/brands/sephora-logo.png' },
  { id: 'b5', name: 'Under Armour', logo: '/assets/brands/under-armour-logo.png' }
];

const FilterBar: React.FC<FilterBarProps> = ({
  categoryFilter,
  setCategoryFilter,
  brandFilter,
  setBrandFilter,
  locationFilter,
  setLocationFilter,
  timeFilter,
  setTimeFilter
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  return (
    <div className="w-full backdrop-blur-md bg-jillr-dark/70 rounded-xl p-2 border border-jillr-border shadow-md">
      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-2">
        <form onSubmit={handleSearch} className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
          <Input
            type="text"
            placeholder="Search challenges, brands, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 bg-jillr-darkLight/50 border-jillr-border text-white"
          />
        </form>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10 border-jillr-border">
              <Filter className="h-4 w-4 text-white" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-jillr-dark border-jillr-border">
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-white">All Filters</h4>
              <div className="space-y-2">
                <h5 className="text-xs text-white/70">Categories</h5>
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
                    <Camera className="mr-1 h-3 w-3" /> Video
                  </Badge>
                  <Badge 
                    variant={categoryFilter === 'fitness' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setCategoryFilter('fitness')}
                  >
                    <Shoe className="mr-1 h-3 w-3" /> Fitness
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
                </div>
              </div>
              
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

              <div className="space-y-2">
                <h5 className="text-xs text-white/70">Time</h5>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant={timeFilter === 'now' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setTimeFilter('now')}
                  >
                    Live Now
                  </Badge>
                  <Badge 
                    variant={timeFilter === 'today' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setTimeFilter('today')}
                  >
                    Today
                  </Badge>
                  <Badge 
                    variant={timeFilter === 'week' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setTimeFilter('week')}
                  >
                    This Week
                  </Badge>
                  <Badge 
                    variant={timeFilter === 'all' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setTimeFilter('all')}
                  >
                    All Time
                  </Badge>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Quick Filters */}
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
    </div>
  );
};

export default FilterBar;
