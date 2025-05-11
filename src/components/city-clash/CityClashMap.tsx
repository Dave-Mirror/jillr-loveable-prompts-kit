
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Map, Locate, Filter } from 'lucide-react';
import { CityDistrict, CityChallenge } from '@/hooks/useCityClashData';
import { useTheme } from 'next-themes';

interface CityClashMapProps {
  districts: CityDistrict[];
  challenges: CityChallenge[];
}

const CityClashMap: React.FC<CityClashMapProps> = ({ districts, challenges }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Map className="h-5 w-5 text-jillr-neonPurple" />
          City Map
        </h2>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Locate className="h-4 w-4" /> Mein Standort
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>
      </div>
      
      {/* Placeholder for the actual map integration */}
      <div className="h-96 rounded-lg border border-jillr-border bg-jillr-dark/50 flex items-center justify-center mb-6 relative">
        <div className="text-center">
          <Map className="h-16 w-16 text-jillr-neonPurple/30 mx-auto mb-4" />
          <p>City Clash Map wird geladen...</p>
          <p className="text-xs text-gray-400 mt-2">Diese Funktion ist in der Beta-Version noch nicht vollständig verfügbar.</p>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-40 h-40 rounded-full border-4 border-jillr-neonPurple/20 animate-pulse"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {districts.map((district) => (
          <Card key={district.id} className="bg-jillr-dark border border-jillr-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                {district.name}
                <Badge variant={district.controlledBy ? "default" : "outline"} className={district.controlledBy ? "bg-jillr-neonPurple" : ""}>
                  {district.controlledBy ? `Kontrolliert von ${district.controlledByName}` : "Unkontrolliert"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                <div className="text-center">
                  <div className="text-jillr-neonPurple font-bold">{district.challenges}</div>
                  <div className="text-xs text-gray-400">Challenges</div>
                </div>
                <div className="text-center">
                  <div className="text-jillr-neonGreen font-bold">{district.points}</div>
                  <div className="text-xs text-gray-400">Punkte</div>
                </div>
                <div className="text-center">
                  <div className="text-jillr-neonPink font-bold">
                    {challenges.filter(c => c.districtId === district.id).length}
                  </div>
                  <div className="text-xs text-gray-400">Aktive Battles</div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" size="sm">Details</Button>
                <Button size="sm" className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80">
                  Distrikt erobern
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CityClashMap;
