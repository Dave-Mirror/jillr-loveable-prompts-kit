
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Camera, Compass, Map, MapPin, Target, Egg, Users } from 'lucide-react';
import { LiveMapProvider } from '@/contexts/LiveMapContext';

import MapView from '@/components/map-experience/MapView';
import FilterBar from '@/components/challenge-explorer/filter-bar';
import UGCFeed from '@/components/map-experience/UGCFeed';
import FloatingControls from '@/components/challenge-explorer/FloatingControls';
import CityClashOverlay from '@/components/map-experience/CityClashOverlay';

// Map modes and types
export type MapMode = 'all' | 'challenges' | 'eastereggs' | 'photo-video' | 'cityclash' | 'ar';
export type CategoryFilter = 'all' | 'video' | 'fitness' | 'ar' | 'social' | 'geofencing' | 'easter-egg';
export type BrandFilter = 'all' | string;
export type LocationFilter = 'current' | 'city' | 'global';
export type TimeFilter = 'now' | 'today' | 'week' | 'all';

const UnifiedMapView: React.FC = () => {
  // State management for map and filters
  const [mapMode, setMapMode] = useState<MapMode>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [brandFilter, setBrandFilter] = useState<BrandFilter>('all');
  const [locationFilter, setLocationFilter] = useState<LocationFilter>('city');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [showUGCFeed, setShowUGCFeed] = useState(false);
  
  // Handle mode/category changes
  const handleModeChange = (mode: MapMode) => {
    setMapMode(mode);
    
    // Auto show UGC feed for photo/video content
    setShowUGCFeed(mode === 'photo-video');
    
    // Update category filter based on mode for consistency
    switch(mode) {
      case 'eastereggs':
        setCategoryFilter('easter-egg');
        break;
      case 'photo-video':
        setCategoryFilter('video');
        break;
      case 'ar':
        setCategoryFilter('ar');
        break;
      case 'cityclash':
        // City Clash uses its own filtering
        break;
      default:
        setCategoryFilter('all');
    }
  };

  // Map challenge category to visual indicator
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'all': return <Compass className="h-4 w-4" />;
      case 'video': return <Camera className="h-4 w-4" />;
      case 'ar': return <Target className="h-4 w-4" />;
      case 'easter-egg': return <Egg className="h-4 w-4" />;
      case 'geofencing': return <MapPin className="h-4 w-4" />;
      case 'cityclash': return <Users className="h-4 w-4" />;
      default: return <Map className="h-4 w-4" />;
    }
  };

  return (
    <LiveMapProvider>
      <div className="container max-w-7xl mx-auto px-4 py-4 h-full">
        <div className="mb-4">
          <h1 className="text-2xl font-bold neon-text mb-2">Erkunde deine Welt</h1>
          
          {/* Filter bar for all challenge types */}
          <FilterBar 
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            brandFilter={brandFilter}
            setBrandFilter={setBrandFilter}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
          />
        </div>
        
        {/* Map mode selection */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge 
            variant={mapMode === 'all' ? "default" : "outline"}
            className="cursor-pointer flex items-center gap-1 px-3 py-1"
            onClick={() => handleModeChange('all')}
          >
            <Compass className="h-4 w-4" /> Alle
          </Badge>
          
          <Badge 
            variant={mapMode === 'challenges' ? "default" : "outline"}
            className="cursor-pointer flex items-center gap-1 px-3 py-1"
            onClick={() => handleModeChange('challenges')}
          >
            <Target className="h-4 w-4" /> Challenges
          </Badge>
          
          <Badge 
            variant={mapMode === 'eastereggs' ? "default" : "outline"}
            className="cursor-pointer flex items-center gap-1 px-3 py-1"
            onClick={() => handleModeChange('eastereggs')}
          >
            <Egg className="h-4 w-4" /> Easter Eggs
          </Badge>
          
          <Badge 
            variant={mapMode === 'photo-video' ? "default" : "outline"}
            className="cursor-pointer flex items-center gap-1 px-3 py-1"
            onClick={() => handleModeChange('photo-video')}
          >
            <Camera className="h-4 w-4" /> Foto & Video
          </Badge>
          
          <Badge 
            variant={mapMode === 'ar' ? "default" : "outline"}
            className="cursor-pointer flex items-center gap-1 px-3 py-1"
            onClick={() => handleModeChange('ar')}
          >
            <Target className="h-4 w-4" /> AR
          </Badge>
          
          <Badge 
            variant={mapMode === 'cityclash' ? "default" : "outline"}
            className="cursor-pointer flex items-center gap-1 px-3 py-1"
            onClick={() => handleModeChange('cityclash')}
          >
            <Users className="h-4 w-4" /> City Clash
          </Badge>
        </div>
        
        {/* Main map view with dynamic content */}
        <div className="w-full h-[70vh] relative rounded-lg glassmorphism overflow-hidden">
          <MapView 
            mode={mapMode === 'cityclash' ? 'cityclash' : 
                 mapMode === 'eastereggs' ? 'eastereggs' : 
                 mapMode === 'photo-video' ? 'ugc' : 'all'}
            showUGCOverlay={showUGCFeed}
            showCityClashOverlay={mapMode === 'cityclash'}
          />
          
          {/* Conditional overlays */}
          {showUGCFeed && (
            <div className="absolute bottom-0 left-0 right-0 h-1/3">
              <UGCFeed />
            </div>
          )}
          
          {mapMode === 'cityclash' && <CityClashOverlay />}
        </div>
        
        {/* Floating controls for map interactions */}
        <div className="absolute bottom-24 right-4 z-20">
          <FloatingControls 
            onLocationClick={() => {}} // Add location handling
            onLeaderboardClick={() => {}} // Add leaderboard handling
            onMapModeChange={(mode) => {}} // Add map visual mode handling
            currentMode="standard"
          />
        </div>
      </div>
    </LiveMapProvider>
  );
};

export default UnifiedMapView;
