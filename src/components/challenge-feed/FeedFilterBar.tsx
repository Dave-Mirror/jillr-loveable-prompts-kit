
import React from 'react';
import { Filter } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem
} from "@/components/ui/toggle-group";

interface FeedFilterBarProps {
  filterType: string;
  setFilterType: (type: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const FeedFilterBar: React.FC<FeedFilterBarProps> = ({
  filterType,
  setFilterType,
  sortBy,
  setSortBy
}) => {
  return (
    <div className="w-full px-4 py-2 bg-background/80 backdrop-blur-sm flex items-center justify-between gap-2 sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filter:</span>
      </div>
      
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
        <ToggleGroup 
          type="single" 
          value={filterType} 
          onValueChange={(value) => value && setFilterType(value)}
          className="flex gap-1"
        >
          <ToggleGroupItem value="all" className="text-xs whitespace-nowrap">
            Alle
          </ToggleGroupItem>
          <ToggleGroupItem value="photo" className="text-xs whitespace-nowrap">
            Foto
          </ToggleGroupItem>
          <ToggleGroupItem value="video" className="text-xs whitespace-nowrap">
            Video
          </ToggleGroupItem>
          <ToggleGroupItem value="community" className="text-xs whitespace-nowrap">
            Community
          </ToggleGroupItem>
          <ToggleGroupItem value="sustainability" className="text-xs whitespace-nowrap">
            Nachhaltigkeit
          </ToggleGroupItem>
          <ToggleGroupItem value="fitness" className="text-xs whitespace-nowrap">
            Fitness
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[110px] h-8">
          <SelectValue placeholder="Sortieren" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="latest">Neueste</SelectItem>
          <SelectItem value="popular">Beliebt</SelectItem>
          <SelectItem value="trending">Trending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FeedFilterBar;
