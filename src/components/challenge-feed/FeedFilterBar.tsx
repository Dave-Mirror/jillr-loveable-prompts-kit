
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Video, Camera, Badge, MapPin, 
  Clock, Zap, Map, Building, Shield, 
  TrendingUp, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FeedFilterBarProps {
  filterType: string;
  setFilterType: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  showFilters: boolean;
  toggleFilters: () => void;
}

const FeedFilterBar: React.FC<FeedFilterBarProps> = ({ 
  filterType, 
  setFilterType, 
  sortBy, 
  setSortBy,
  showFilters,
  toggleFilters
}) => {
  return (
    <div className="w-full py-4">
      <div className="max-w-md mx-auto space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-[var(--txt)]">Challenge Feed</h3>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFilters}
            className="flex items-center gap-1.5"
          >
            <Filter className="h-3.5 w-3.5" />
            {showFilters ? 'Filter verbergen' : 'Filter anzeigen'}
          </Button>
        </div>
        
        {showFilters && (
          <Tabs 
            defaultValue={filterType} 
            value={filterType} 
            onValueChange={setFilterType}
            className="w-full mb-4"
          >
            <TabsList className={cn(
              "w-full overflow-x-auto flex whitespace-nowrap h-auto py-1 px-1 gap-1",
              "glass-card bg-[var(--glass-bg)] backdrop-blur-xl",
              "scrollbar-thin scrollbar-thumb-jillr-neonPurple scrollbar-track-transparent"
            )}>
              <TabsTrigger value="all" className="flex items-center gap-1 rounded-md text-[var(--txt)] hover:text-jillr-neonCyan">
                <Zap className="h-4 w-4" />
                <span>Alle</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-1 rounded-md text-[var(--txt)] hover:text-jillr-neonCyan">
                <Video className="h-4 w-4" />
                <span>Video</span>
              </TabsTrigger>
              <TabsTrigger value="photo" className="flex items-center gap-1 rounded-md text-[var(--txt)] hover:text-jillr-neonCyan">
                <Camera className="h-4 w-4" />
                <span>Photo</span>
              </TabsTrigger>
              <TabsTrigger value="ar" className="flex items-center gap-1 rounded-md text-[var(--txt)] hover:text-jillr-neonCyan">
                <Badge className="h-4 w-4" />
                <span>AR</span>
              </TabsTrigger>
              <TabsTrigger value="geofencing" className="flex items-center gap-1 rounded-md text-[var(--txt)] hover:text-jillr-neonCyan">
                <MapPin className="h-4 w-4" />
                <span>Geo</span>
              </TabsTrigger>
              <TabsTrigger value="city_clash" className="flex items-center gap-1 rounded-md text-[var(--txt)] hover:text-jillr-neonCyan">
                <Map className="h-4 w-4" />
                <span>City Clash</span>
              </TabsTrigger>
              <TabsTrigger value="team_battle" className="flex items-center gap-1 rounded-md text-[var(--txt)] hover:text-jillr-neonCyan">
                <Shield className="h-4 w-4" />
                <span>Team Battle</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        <div className="flex justify-center">
          <Tabs 
            defaultValue={sortBy} 
            value={sortBy} 
            onValueChange={setSortBy}
          >
            <TabsList className="glass-card bg-[var(--glass-bg)] backdrop-blur-xl">
              <TabsTrigger value="latest" className="flex items-center gap-1 text-[var(--txt)] hover:text-jillr-neonCyan">
                <Clock className="h-3 w-3" />
                <span>Neueste</span>
              </TabsTrigger>
              <TabsTrigger value="popular" className="flex items-center gap-1 text-[var(--txt)] hover:text-jillr-neonCyan">
                <Zap className="h-3 w-3" />
                <span>Beliebt</span>
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex items-center gap-1 text-[var(--txt)] hover:text-jillr-neonCyan">
                <TrendingUp className="h-3 w-3" />
                <span>Trending</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FeedFilterBar;
