
import React from 'react';
import { Users, Trophy, Map, Flag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CityClashOverlay: React.FC = () => {
  // Mock-Daten für City Clash
  const cityClashData = {
    activeDistricts: 8,
    activeTeams: 4,
    playerRank: 12,
    teamRank: 2,
    unlockedAreas: 23,
    currentTeam: "Dream Team",
    controlledDistricts: 3,
    nearbyEvents: [
      { id: 'event-1', title: 'District Battle', location: 'Zentrum', time: '15:30', participants: 8 },
      { id: 'event-2', title: 'Team Challenge', location: 'Westpark', time: '17:00', participants: 16 }
    ]
  };

  return (
    <div className="absolute top-4 left-4 z-20 max-w-xs">
      <div className="bg-jillr-dark/80 border border-jillr-neonPurple/40 p-3 rounded-lg shadow-lg backdrop-blur-sm">
        <h3 className="text-sm font-bold mb-2 flex items-center gap-1.5">
          <Users className="h-4 w-4 text-jillr-neonPurple" /> City Clash Status
        </h3>
        
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Dein Team:</span>
            <span className="font-semibold">{cityClashData.currentTeam}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Team Rang:</span>
            <span className="font-semibold flex items-center gap-1">
              #{cityClashData.teamRank} 
              {cityClashData.teamRank <= 3 && <Trophy className="h-3 w-3 text-yellow-400" />}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Kontrollierte Distrikte:</span>
            <span className="font-semibold">{cityClashData.controlledDistricts}/{cityClashData.activeDistricts}</span>
          </div>
          
          <div className="border-t border-jillr-border my-2 pt-2">
            <h4 className="font-semibold mb-1.5 flex items-center gap-1.5">
              <Flag className="h-3.5 w-3.5 text-jillr-neonPink" /> Aktive Events
            </h4>
            
            {cityClashData.nearbyEvents.map(event => (
              <div key={event.id} className="bg-jillr-darkLight p-2 rounded mb-1.5">
                <div className="flex justify-between">
                  <span className="font-medium">{event.title}</span>
                  <Badge variant="outline" className="text-[10px] h-4 py-0">
                    {event.time}
                  </Badge>
                </div>
                <div className="flex justify-between text-[11px] text-gray-400 mt-0.5">
                  <span>{event.location}</span>
                  <span>{event.participants} Teilnehmer</span>
                </div>
              </div>
            ))}
            
            <button className="w-full bg-jillr-neonPurple/20 hover:bg-jillr-neonPurple/30 text-jillr-neonPurple text-center py-1.5 rounded-md mt-2 text-xs font-medium transition-colors">
              District Battle starten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityClashOverlay;
