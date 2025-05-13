
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, MapPin, Camera, Video, Map, Scan, Target, Users, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LiveMapProvider } from '@/contexts/LiveMapContext';
import { Badge } from '@/components/ui/badge';

// Importiere die Komponenten, die wir integrieren möchten
import MapLayout from '@/components/map-experience/MapLayout';
import MapView from '@/components/map-experience/MapView';
import EventCalendar from '@/components/livemap/calendar/EventCalendar';
import ARScanner from '@/components/livemap/scanner/ARScanner';
import MapFilters from '@/components/map-experience/MapFilters';
import UGCFeed from '@/components/map-experience/UGCFeed';
import CityClashOverlay from '@/components/map-experience/CityClashOverlay';

// Map-Modi (Ansichten)
type MapMode = 'all' | 'challenges' | 'eastereggs' | 'ugc' | 'cityclash';

const MapExperience = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showUGCFeed, setShowUGCFeed] = useState(false);
  const [mapMode, setMapMode] = useState<MapMode>('all');
  
  // Handler für die Suche
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    toast({
      title: "Suche...",
      description: `Suche nach "${searchQuery}" auf der Karte`,
    });
  };

  // Handler für den aktuellen Standort
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Standort gefunden",
            description: "Dein aktueller Standort wurde auf der Karte gesetzt",
          });
        },
        (error) => {
          toast({
            title: "Standort-Fehler",
            description: "Konnte nicht auf deinen Standort zugreifen. Bitte überprüfe die Berechtigungen.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Standort nicht unterstützt",
        description: "Geolokalisierung wird von deinem Browser nicht unterstützt",
        variant: "destructive",
      });
    }
  };

  // Handler für den Scan-Abschluss
  const handleScanComplete = (result: string) => {
    toast({
      title: "Easter Egg gefunden!",
      description: "Du hast ein verstecktes Easter Egg entdeckt!",
    });
  };

  // Handler für den Wechsel des Map-Modus
  const handleModeChange = (mode: MapMode) => {
    setMapMode(mode);
    
    // UGC Feed für Video/Foto Challenges automatisch anzeigen
    if (mode === 'ugc') {
      setShowUGCFeed(true);
    } else {
      setShowUGCFeed(false);
    }
    
    toast({
      title: "Modus gewechselt",
      description: `Karte zeigt jetzt: ${getModeLabel(mode)}`,
    });
  };
  
  // Hilfsfunktion für Map-Modus-Labels
  const getModeLabel = (mode: MapMode): string => {
    switch(mode) {
      case 'all': return 'Alle Aktivitäten';
      case 'challenges': return 'Challenges';
      case 'eastereggs': return 'Easter Eggs';
      case 'ugc': return 'Foto & Video Content';
      case 'cityclash': return 'City Clash';
      default: return 'Kartenansicht';
    }
  };

  return (
    <LiveMapProvider>
      <div className="container max-w-7xl mx-auto px-4 pt-4 pb-20">
        <div className="flex flex-col space-y-4">
          {/* Header mit Titel und Modus-Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h1 className="text-2xl font-bold neon-text">Jillr Map</h1>
            
            <div className="flex flex-wrap gap-2 mt-2 w-full">
              <Badge 
                variant={mapMode === 'all' ? "default" : "outline"}
                className="cursor-pointer flex items-center gap-1 px-3 py-1"
                onClick={() => handleModeChange('all')}
              >
                <Map className="h-4 w-4" /> Alle
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
                <Gift className="h-4 w-4" /> Easter Eggs
              </Badge>
              
              <Badge 
                variant={mapMode === 'ugc' ? "default" : "outline"}
                className="cursor-pointer flex items-center gap-1 px-3 py-1"
                onClick={() => handleModeChange('ugc')}
              >
                <Camera className="h-4 w-4" /> Foto & Video
              </Badge>
              
              <Badge 
                variant={mapMode === 'cityclash' ? "default" : "outline"}
                className="cursor-pointer flex items-center gap-1 px-3 py-1"
                onClick={() => handleModeChange('cityclash')}
              >
                <Users className="h-4 w-4" /> City Clash
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <form onSubmit={handleSearch} className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Suche nach Challenges, Orten, Marken..."
                className="w-full py-2 pl-10 pr-4 bg-jillr-dark border border-jillr-border rounded-lg focus:outline-none focus:ring-2 focus:ring-jillr-neonPurple focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleLocationClick}
                className="h-10 w-10"
              >
                <MapPin className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setShowScanner(true)}
                className="h-10 w-10"
              >
                <Scan className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="h-10 w-10"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Haupt-Kartenansicht */}
          <div className="w-full h-[70vh] relative rounded-lg glassmorphism overflow-hidden">
            {/* Die Karte selbst */}
            <MapView 
              mode={mapMode}
              showUGCOverlay={showUGCFeed}
              showCityClashOverlay={mapMode === 'cityclash'}
            />
            
            {/* UGC Feed Overlay (wenn aktiviert) */}
            {showUGCFeed && (
              <div className="absolute bottom-0 left-0 right-0 h-1/3">
                <UGCFeed />
              </div>
            )}
            
            {/* City Clash Overlay (wenn im City Clash Modus) */}
            {mapMode === 'cityclash' && <CityClashOverlay />}
          </div>
        </div>
        
        {/* Filter-Seitenleiste */}
        <MapFilters 
          open={showFilters} 
          onOpenChange={setShowFilters}
          mapMode={mapMode}
        />
        
        {/* AR Scanner für Easter Eggs */}
        <ARScanner 
          open={showScanner} 
          onOpenChange={setShowScanner}
          onScanComplete={handleScanComplete}
          title="Scan Easter Egg"
          description="Richte deine Kamera auf den QR-Code oder AR-Marker, um versteckte Easter Eggs, Challenges oder exklusive Drops zu entdecken!"
        />
      </div>
    </LiveMapProvider>
  );
};

export default MapExperience;
