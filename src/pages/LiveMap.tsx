
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LiveMapView from '@/components/livemap/LiveMapView';
import EventCalendar from '@/components/livemap/EventCalendar';
import { Filter, Search, MapPin, Bell, Calendar, Scan, LampDesk } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LiveMapFilters from '@/components/livemap/LiveMapFilters';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import NotificationCenter from '@/components/livemap/NotificationCenter';
import { LiveMapProvider } from '@/contexts/LiveMapContext';
import ARScanner from '@/components/livemap/ARScanner';

const LiveMap = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [activeTab, setActiveTab] = useState('map');
  
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
          
          <div className="glassmorphism p-3 rounded-lg flex items-center space-x-2">
            <form onSubmit={handleSearch} className="flex-grow flex items-center space-x-2">
              <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder="Search challenges, brands, or locations..."
                className="flex-grow bg-transparent border-none focus:outline-none placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="secondary" size="sm">Search</Button>
            </form>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setShowScanner(true)}
                title="Scan AR/QR"
              >
                <Scan className="h-5 w-5" />
              </Button>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" title="Filter Map">
                    <Filter className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <LiveMapFilters />
                </SheetContent>
              </Sheet>
              
              <Button variant="outline" size="icon" onClick={handleLocationClick} title="My Location">
                <MapPin className="h-5 w-5" />
              </Button>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" title="Notifications">
                    <Bell className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <NotificationCenter />
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="map" className="mt-0">
              <LiveMapView />
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              <EventCalendar />
            </TabsContent>
          </Tabs>
        </div>
        
        <ARScanner 
          open={showScanner} 
          onOpenChange={setShowScanner}
          onScanComplete={handleScanComplete}
          title="Scan Easter Egg"
          description="Point your camera at the QR code or AR marker to discover hidden Easter eggs, challenges, or exclusive drops!"
        />
      </div>
    </LiveMapProvider>
  );
};

export default LiveMap;
