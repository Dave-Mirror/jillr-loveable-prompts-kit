
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

import { LiveMapProvider } from '@/contexts/LiveMapContext';
import MapLayout from '@/components/livemap/layout/MapLayout';
import LiveMapView from '@/components/livemap/map/LiveMapView';
import EventCalendar from '@/components/livemap/calendar/EventCalendar';
import ARScanner from '@/components/livemap/scanner/ARScanner';
import LiveMapFilters from '@/components/livemap/LiveMapFilters';
import { useLiveMap } from '@/hooks/useLiveMap';

const LiveMap = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('map');
  const { filters, setFilters, resetFilters } = useLiveMap();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    toast({
      title: "Searching...",
      description: `Finding "${searchQuery}" on the map`,
    });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Location Found",
            description: "Your current location has been set on the map",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Could not access your location. Please check permissions.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
    }
  };

  const handleScanComplete = (result: string) => {
    toast({
      title: "Easter Egg Found!",
      description: "You've discovered a hidden Easter egg!",
    });
    console.log("Scan result:", result);
  };

  const handleFilterChange = (category: string, value: string) => {
    setFilters(prev => {
      const currentArray = prev[category as keyof typeof prev] as string[];
      if (currentArray.includes(value)) {
        return {
          ...prev,
          [category]: currentArray.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [category]: [...currentArray, value]
        };
      }
    });
  };

  const handleRadiusChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      radius: value[0]
    }));
  };

  return (
    <LiveMapProvider>
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h1 className="text-2xl font-bold neon-text">Jillr Live Map</h1>
            
            <Tabs defaultValue="map" className="w-full max-w-md" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="calendar">Event Calendar</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <MapLayout
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            handleLocationClick={handleLocationClick}
            handleScanClick={() => setShowScanner(true)}
            handleFilterClick={() => setShowFilters(true)}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="map" className="mt-0">
                <LiveMapView />
              </TabsContent>
              <TabsContent value="calendar" className="mt-0">
                <EventCalendar />
              </TabsContent>
            </Tabs>
          </MapLayout>
        </div>
        
        <ARScanner 
          open={showScanner} 
          onOpenChange={setShowScanner}
          onScanComplete={handleScanComplete}
          title="Scan Easter Egg"
          description="Point your camera at the QR code or AR marker to discover hidden Easter eggs, challenges, or exclusive drops!"
        />

        <LiveMapFilters 
          open={showFilters} 
          onOpenChange={setShowFilters}
          filters={filters}
          onFilterChange={handleFilterChange}
          onRadiusChange={handleRadiusChange}
          onResetFilters={resetFilters}
        />
      </div>
    </LiveMapProvider>
  );
};

export default LiveMap;
