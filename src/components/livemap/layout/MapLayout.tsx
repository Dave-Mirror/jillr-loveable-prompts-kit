
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter, Search, MapPin, Bell, Scan } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LiveMapFilters from '../LiveMapFilters';
import NotificationCenter from '../notifications/NotificationCenter';
import { useIsMobile } from '@/hooks/use-mobile';

interface MapLayoutProps {
  children: React.ReactNode;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  handleLocationClick: () => void;
  handleScanClick: () => void;
}

const MapLayout: React.FC<MapLayoutProps> = ({
  children,
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleLocationClick,
  handleScanClick
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col space-y-4">
      <div className="glassmorphism p-2 md:p-3 rounded-lg">
        <form onSubmit={handleSearch} className={`flex items-center ${isMobile ? 'flex-col gap-2' : 'space-x-2'}`}>
          <div className="flex items-center gap-2 flex-grow w-full">
            <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Search challenges, brands, or locations..."
              className="flex-grow bg-transparent border-none focus:outline-none placeholder:text-muted-foreground w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className={`flex items-center gap-2 ${isMobile ? 'w-full justify-between' : ''}`}>
            {!isMobile && <Button type="submit" variant="secondary" size="sm">Search</Button>}
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleScanClick}
              title="Scan AR/QR"
              className="text-jillr-neonPurple"
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
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleLocationClick} 
              title="My Location"
              className="text-jillr-neonBlue"
            >
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
            
            {isMobile && <Button type="submit" variant="secondary" size="sm" className="ml-auto">Search</Button>}
          </div>
        </form>
      </div>
      
      {children}
    </div>
  );
};

export default MapLayout;
