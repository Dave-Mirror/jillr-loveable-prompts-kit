
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter, Search, MapPin, Bell, Scan } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import LiveMapFilters from '../filters/LiveMapFilters';
import NotificationCenter from '../notifications/NotificationCenter';

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
  return (
    <div className="flex flex-col space-y-4">
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
            onClick={handleScanClick}
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
      
      {children}
    </div>
  );
};

export default MapLayout;
