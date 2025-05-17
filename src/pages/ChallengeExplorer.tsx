
import React, { useState, useEffect } from 'react';
import { MapPin, Filter, Camera, Search, User, Users, Award, Clock, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { LiveMapProvider } from '@/contexts/LiveMapContext';

// Import the components we'll create
import ExplorerMap from '@/components/challenge-explorer/ExplorerMap';
import FilterBar from '@/components/challenge-explorer/filter-bar'; // Updated import path
import ChallengeSidepanel from '@/components/challenge-explorer/ChallengeSidepanel';
import UgcFeed from '@/components/challenge-explorer/UgcFeed';
import FloatingControls from '@/components/challenge-explorer/FloatingControls';
import AvatarHub from '@/components/challenge-explorer/AvatarHub';
import LeaderboardOverlay from '@/components/challenge-explorer/LeaderboardOverlay';

// Map filter types
export type ChallengeCategory = 'all' | 'video' | 'photo' | 'fitness' | 'ar' | 'social' | 'geofencing' | 'easter-egg';
export type BrandFilter = 'all' | string;
export type LocationFilter = 'current' | 'city' | 'global';
export type TimeFilter = 'now' | 'today' | 'week' | 'all';
export type MapMode = 'standard' | 'ar' | 'night' | 'satellite' | 'leaderboard';
export type MapModeType = 'standard' | 'satellite' | 'night' | 'ar';

const ChallengeExplorer = () => {
  const { toast } = useToast();
  
  // State for filters
  const [categoryFilter, setCategoryFilter] = useState<ChallengeCategory>('all');
  const [brandFilter, setBrandFilter] = useState<BrandFilter>('all');
  const [locationFilter, setLocationFilter] = useState<LocationFilter>('city');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [mapMode, setMapMode] = useState<MapMode>('standard');
  
  // State for sidebar and selected challenge
  const [showSidepanel, setShowSidepanel] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Handle marker click on map
  const handleMarkerClick = (challenge: any) => {
    setSelectedChallenge(challenge);
    setShowSidepanel(true);
  };

  // Handle location tracking
  const handleTrackLocation = () => {
    navigator.geolocation.getCurrentPosition(
      () => {
        toast({
          title: "Location updated",
          description: "The map is now centered on your location",
        });
      },
      () => {
        toast({
          title: "Location error",
          description: "Could not access your location",
          variant: "destructive"
        });
      }
    );
  };

  // Toggle leaderboard view
  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
    if (!showLeaderboard) {
      setMapMode('leaderboard');
    } else {
      setMapMode('standard');
    }
  };

  // Create wrapper functions to fix type issues
  const handleCategoryFilterChange = (value: ChallengeCategory) => {
    setCategoryFilter(value);
  };

  const handleMapModeChange = (mode: MapModeType) => {
    setMapMode(mode);
  };

  return (
    <LiveMapProvider>
      <div className="relative h-screen w-full overflow-hidden bg-jillr-dark">
        {/* Map Component */}
        <div className="absolute inset-0 z-0">
          <ExplorerMap 
            mode={mapMode}
            categoryFilter={categoryFilter}
            brandFilter={brandFilter}
            locationFilter={locationFilter}
            timeFilter={timeFilter}
            onMarkerClick={handleMarkerClick}
          />
        </div>

        {/* Avatar Hub (top left) */}
        <div className="absolute top-4 left-4 z-20">
          <AvatarHub />
        </div>

        {/* Filter Bar (top sticky) */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 w-auto max-w-4xl px-4">
          <FilterBar 
            categoryFilter={categoryFilter}
            setCategoryFilter={handleCategoryFilterChange}
            brandFilter={brandFilter}
            setBrandFilter={setBrandFilter}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
          />
        </div>

        {/* Challenge Sidepanel */}
        <ChallengeSidepanel 
          open={showSidepanel} 
          onClose={() => setShowSidepanel(false)}
          challenge={selectedChallenge}
        />

        {/* UGC Feed (bottom) */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <UgcFeed 
            categoryFilter={categoryFilter}
            brandFilter={brandFilter}
          />
        </div>

        {/* Floating Controls (bottom right) */}
        <div className="absolute bottom-24 right-4 z-20">
          <FloatingControls 
            onLocationClick={handleTrackLocation}
            onLeaderboardClick={toggleLeaderboard}
            onMapModeChange={handleMapModeChange}
            currentMode={mapMode as MapModeType}
          />
        </div>

        {/* Leaderboard Overlay (conditionally shown) */}
        {showLeaderboard && (
          <LeaderboardOverlay 
            onClose={() => toggleLeaderboard()}
            categoryFilter={categoryFilter}
            locationFilter={locationFilter}
          />
        )}
      </div>
    </LiveMapProvider>
  );
};

export default ChallengeExplorer;
