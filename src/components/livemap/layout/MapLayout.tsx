
import React from 'react';
import { Filter, MapPin, Scan, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FilterDropdown from '@/components/ui/filter-dropdown';

interface MapLayoutProps {
  children: React.ReactNode;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  handleLocationClick: () => void;
  handleScanClick: () => void;
  handleFilterClick?: () => void;
}

const MapLayout: React.FC<MapLayoutProps> = ({
  children,
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleLocationClick,
  handleScanClick,
  handleFilterClick
}) => {
  return (
    <div className="w-full space-y-4">
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
            onClick={handleScanClick}
            className="h-10 w-10"
          >
            <Scan className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleFilterClick}
            className="h-10 w-10"
          >
            <Filter className="h-4 w-4" />
          </Button>
          
          <FilterDropdown
            options={[
              { value: 'all', label: 'Alle' },
              { value: 'easteregg', label: 'Easter Eggs' },
              { value: 'drop', label: 'Drops' },
              { value: 'challenge', label: 'Challenges' }
            ]}
            activeValue="all"
            onSelect={() => {}}
            label="Art"
            className="hidden sm:flex h-10"
          />
        </div>
      </div>
      
      {children}
    </div>
  );
};

export default MapLayout;
