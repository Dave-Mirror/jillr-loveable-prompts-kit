
import React, { useState } from 'react';
import { MapPin, Trophy, Map, Moon, Glasses, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MapMode } from '@/pages/ChallengeExplorer';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface FloatingControlsProps {
  onLocationClick: () => void;
  onLeaderboardClick: () => void;
  onMapModeChange: (mode: MapMode) => void;
  currentMode: MapMode;
}

const FloatingControls: React.FC<FloatingControlsProps> = ({
  onLocationClick,
  onLeaderboardClick,
  onMapModeChange,
  currentMode
}) => {
  const [showExpanded, setShowExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {/* Map Mode Toggle buttons */}
      {showExpanded && (
        <div className="grid gap-2">
          <Button 
            variant={currentMode === 'standard' ? 'default' : 'outline'} 
            size="icon"
            onClick={() => onMapModeChange('standard')}
            className="h-10 w-10 rounded-full shadow-neon bg-opacity-80"
          >
            <Map className="h-5 w-5" />
          </Button>
          
          <Button 
            variant={currentMode === 'night' ? 'default' : 'outline'} 
            size="icon"
            onClick={() => onMapModeChange('night')}
            className="h-10 w-10 rounded-full shadow-neon bg-opacity-80"
          >
            <Moon className="h-5 w-5" />
          </Button>
          
          <Button 
            variant={currentMode === 'ar' ? 'default' : 'outline'} 
            size="icon"
            onClick={() => onMapModeChange('ar')}
            className="h-10 w-10 rounded-full shadow-neon bg-opacity-80"
          >
            <Glasses className="h-5 w-5" />
          </Button>
          
          <Button 
            variant={currentMode === 'leaderboard' ? 'default' : 'outline'} 
            size="icon"
            onClick={onLeaderboardClick}
            className="h-10 w-10 rounded-full shadow-neon bg-opacity-80"
          >
            <Trophy className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={onLocationClick}
            className="h-10 w-10 rounded-full shadow-neon bg-opacity-80"
          >
            <MapPin className="h-5 w-5" />
          </Button>
        </div>
      )}
      
      {/* Main toggle button */}
      <Button 
        variant={showExpanded ? "secondary" : "default"} 
        size="icon"
        onClick={() => setShowExpanded(!showExpanded)}
        className="h-12 w-12 rounded-full shadow-neonStrong"
      >
        {showExpanded ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </Button>
    </div>
  );
};

export default FloatingControls;
