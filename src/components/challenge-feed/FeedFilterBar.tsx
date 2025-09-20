
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
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--txt)]">Challenge Feed</h3>
        
        <Button
          variant="outline"
          size="sm"
          onClick={toggleFilters}
          className="flex items-center gap-2 filter-chip"
        >
          <Filter className="h-4 w-4" />
          {showFilters ? 'Filter verbergen' : 'Filter anzeigen'}
        </Button>
      </div>
      
      {showFilters && (
        <div className="space-y-3">
          <Tabs 
            defaultValue={filterType} 
            value={filterType} 
            onValueChange={setFilterType}
            className="w-full"
          >
            <TabsList className={cn(
              "w-full overflow-x-auto flex whitespace-nowrap h-auto py-2 px-2 gap-2",
              "glass-card bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)]",
              "scrollbar-thin scrollbar-thumb-jillr-neonPurple scrollbar-track-transparent"
            )}>
              <TabsTrigger value="all" className="filter-chip data-[state=active]:active flex items-center gap-1.5 rounded-full">
                <Zap className="h-4 w-4" />
                <span>Alle</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="filter-chip data-[state=active]:active flex items-center gap-1.5 rounded-full">
                <Video className="h-4 w-4" />
                <span>Video</span>
              </TabsTrigger>
              <TabsTrigger value="photo" className="filter-chip data-[state=active]:active flex items-center gap-1.5 rounded-full">
                <Camera className="h-4 w-4" />
                <span>Photo</span>
              </TabsTrigger>
              <TabsTrigger value="ar" className="filter-chip data-[state=active]:active flex items-center gap-1.5 rounded-full">
                <Badge className="h-4 w-4" />
                <span>AR</span>
              </TabsTrigger>
              <TabsTrigger value="geo" className="filter-chip data-[state=active]:active flex items-center gap-1.5 rounded-full">
                <MapPin className="h-4 w-4" />
                <span>Geo</span>
              </TabsTrigger>
              <TabsTrigger value="city-clash" className="filter-chip data-[state=active]:active flex items-center gap-1.5 rounded-full">
                <Map className="h-4 w-4" />
                <span>City Clash</span>
              </TabsTrigger>
              <TabsTrigger value="sustainability" className="filter-chip data-[state=active]:active flex items-center gap-1.5 rounded-full">
                <Shield className="h-4 w-4" />
                <span>Sustainability</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}

      <div className="flex justify-center">
        <Tabs 
          defaultValue={sortBy} 
          value={sortBy} 
          onValueChange={setSortBy}
        >
          <TabsList className="glass-card bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] h-auto py-2 px-2 gap-2">
            <TabsTrigger value="latest" className="filter-chip data-[state=active]:active flex items-center gap-1.5 rounded-full">
              <Clock className="h-3.5 w-3.5" />
              <span>Neueste</span>
            </TabsTrigger>
            <TabsTrigger value="popular" className="filter-chip data-[state=active]:active flex items-center gap-1.5 rounded-full">
              <Zap className="h-3.5 w-3.5" />
              <span>Beliebt</span>
            </TabsTrigger>
            <TabsTrigger value="trending" className="filter-chip data-[state=active]:active flex items-center gap-1.5 rounded-full">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Trending</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default FeedFilterBar;
