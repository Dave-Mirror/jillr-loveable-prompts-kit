
import React, { useState } from 'react';
import { HelpCircle, ChevronUp, ChevronDown, Gift, Target, Users, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MapLegend: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="absolute bottom-4 left-4 max-w-xs z-10">
      <div className="bg-jillr-dark/90 border border-jillr-border rounded-lg shadow-lg overflow-hidden">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex justify-between items-center w-full p-2 h-auto"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-jillr-neonBlue" />
            <span className="text-sm font-medium">Map Legend</span>
          </div>
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
        
        {expanded && (
          <div className="p-3 grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="flex items-center gap-1">
                <Gift className="h-3 w-3" /> Easter Eggs
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="flex items-center gap-1">
                <Target className="h-3 w-3" /> Drops
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="flex items-center gap-1">
                <Map className="h-3 w-3" /> Challenges
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" /> Team Events
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapLegend;
