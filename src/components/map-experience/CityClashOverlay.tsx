
import React, { useState } from 'react';
import { Trophy, Flag, Users, Flame } from 'lucide-react';

// Mock City Clash Daten für Distrikte
const mockDistricts = [
  { id: 'district-1', name: 'Innenstadt', controlledBy: 'Team Alpha', points: 1250 },
  { id: 'district-2', name: 'Westside', controlledBy: 'Team Beta', points: 980 },
  { id: 'district-3', name: 'Nordpark', controlledBy: null, points: 450 },
  { id: 'district-4', name: 'Südviertel', controlledBy: 'Dein Team', points: 650 }
];

const CityClashOverlay: React.FC = () => {
  const [activeDistrict, setActiveDistrict] = useState<string | null>(null);
  
  return (
    <div className="absolute top-2 right-2 bg-jillr-dark/90 border border-jillr-neonPurple/30 rounded-lg p-3 w-60 text-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold flex items-center gap-1">
          <Trophy className="h-4 w-4 text-jillr-neonPurple" /> 
          City Clash Status
        </h3>
        <span className="text-xs bg-jillr-neonPurple/20 text-jillr-neonPurple px-1.5 py-0.5 rounded">Beta</span>
      </div>
      
      <div className="space-y-2 mb-3">
        {mockDistricts.map(district => (
          <div 
            key={district.id}
            className={`p-2 rounded border ${
              district.controlledBy === 'Dein Team' 
                ? 'bg-jillr-neonPurple/20 border-jillr-neonPurple' 
                : 'border-jillr-border hover:bg-jillr-dark/50'
            } cursor-pointer transition-colors`}
            onClick={() => setActiveDistrict(district.id === activeDistrict ? null : district.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-semibold">{district.name}</span>
                <div className="text-[10px] text-gray-400 flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {district.controlledBy || 'Nicht kontrolliert'}
                </div>
              </div>
              <div className="flex items-center">
                <Flame className="h-3 w-3 text-jillr-neonPink mr-1" />
                <span className="text-xs">{district.points}</span>
              </div>
            </div>
            
            {activeDistrict === district.id && (
              <div className="mt-2 flex justify-end">
                <button className="text-xs bg-jillr-neonPurple text-white px-2 py-1 rounded flex items-center gap-1">
                  <Flag className="h-3 w-3" /> Erobern
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <button className="w-full bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPink text-white text-xs py-1 rounded">
        City Clash Beitreten
      </button>
    </div>
  );
};

export default CityClashOverlay;
