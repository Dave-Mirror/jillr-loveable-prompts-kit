
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Trophy, Moon, Sun, MoonStar, Filter } from 'lucide-react';

export type MapModeType = 'standard' | 'satellite' | 'night' | 'ar';

interface FloatingControlsProps {
  onLocationClick: () => void;
  onLeaderboardClick: () => void;
  onMapModeChange: (mode: MapModeType) => void;
  currentMode: MapModeType | string; // Updated to accept string to handle both MapModeType and MapMode
}

const FloatingControls: React.FC<FloatingControlsProps> = ({
  onLocationClick,
  onLeaderboardClick,
  onMapModeChange,
  currentMode
}) => {
  // Helper to check if the current mode is night
  const isNightMode = currentMode === 'night';

  return (
    <div className="flex flex-col space-y-2">
      <Button 
        variant="outline" 
        size="icon" 
        className="h-10 w-10 rounded-full bg-jillr-dark/90 border-jillr-border shadow-lg backdrop-blur-sm"
        onClick={onLocationClick}
      >
        <MapPin className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        className="h-10 w-10 rounded-full bg-jillr-dark/90 border-jillr-border shadow-lg backdrop-blur-sm"
        onClick={onLeaderboardClick}
      >
        <Trophy className="h-5 w-5" />
      </Button>

      <Button 
        variant="outline" 
        size="icon" 
        className={`h-10 w-10 rounded-full bg-jillr-dark/90 border-jillr-border shadow-lg backdrop-blur-sm ${
          isNightMode ? 'bg-jillr-neonPurple/20 border-jillr-neonPurple' : ''
        }`}
        onClick={() => onMapModeChange(isNightMode ? 'standard' : 'night')}
      >
        {isNightMode ? (
          <MoonStar className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>

      <Button 
        variant="outline" 
        size="icon" 
        className="h-10 w-10 rounded-full bg-jillr-dark/90 border-jillr-border shadow-lg backdrop-blur-sm"
        onClick={() => {}}
      >
        <Filter className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default FloatingControls;
