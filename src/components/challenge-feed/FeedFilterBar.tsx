
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Video, Camera, Badge, MapPin, 
  TrendingUp, Clock, Zap, Map, 
  Flag, Users, Shield 
} from 'lucide-react';

interface FeedFilterBarProps {
  filterType: string;
  setFilterType: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

const FeedFilterBar: React.FC<FeedFilterBarProps> = ({ 
  filterType, 
  setFilterType, 
  sortBy, 
  setSortBy 
}) => {
  return (
    <div className="mx-auto px-4 py-4 sticky top-0 bg-jillr-dark z-10 border-b border-jillr-border/50">
      <div className="max-w-md mx-auto">
        <Tabs 
          defaultValue={filterType} 
          value={filterType} 
          onValueChange={setFilterType}
          className="w-full mb-4"
        >
          <TabsList className="w-full overflow-x-auto flex whitespace-nowrap h-auto py-1 px-1 gap-1">
            <TabsTrigger value="all" className="flex items-center gap-1 rounded-md">
              <Zap className="h-4 w-4" />
              <span>Alle</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-1 rounded-md">
              <Video className="h-4 w-4" />
              <span>Video</span>
            </TabsTrigger>
            <TabsTrigger value="photo" className="flex items-center gap-1 rounded-md">
              <Camera className="h-4 w-4" />
              <span>Photo</span>
            </TabsTrigger>
            <TabsTrigger value="ar" className="flex items-center gap-1 rounded-md">
              <Badge className="h-4 w-4" />
              <span>AR</span>
            </TabsTrigger>
            <TabsTrigger value="geofencing" className="flex items-center gap-1 rounded-md">
              <MapPin className="h-4 w-4" />
              <span>Geo</span>
            </TabsTrigger>
            <TabsTrigger value="city_clash" className="flex items-center gap-1 rounded-md">
              <Map className="h-4 w-4" />
              <span>City Clash</span>
            </TabsTrigger>
            <TabsTrigger value="team_battle" className="flex items-center gap-1 rounded-md">
              <Shield className="h-4 w-4" />
              <span>Team Battle</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex justify-center">
          <Tabs 
            defaultValue={sortBy} 
            value={sortBy} 
            onValueChange={setSortBy}
          >
            <TabsList className="bg-jillr-darkLight">
              <TabsTrigger value="latest" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Neueste</span>
              </TabsTrigger>
              <TabsTrigger value="popular" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                <span>Beliebt</span>
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex items-center gap-1">
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
