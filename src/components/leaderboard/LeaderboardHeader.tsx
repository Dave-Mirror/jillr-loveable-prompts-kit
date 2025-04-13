
import React from 'react';
import { ChevronDown, Coins, Filter, Video, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LeaderboardHeaderProps {
  sortBy: string;
  setSortBy: (value: string) => void;
}

const LeaderboardHeader = ({ sortBy, setSortBy }: LeaderboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground">See who's at the top of the jillr community</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Sort By: {sortBy === 'xp' ? 'XP' : sortBy === 'coins' ? 'Coins' : 'Challenges'}
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setSortBy('xp')}>
            <Zap className="h-4 w-4 mr-2" /> XP Points
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortBy('coins')}>
            <Coins className="h-4 w-4 mr-2" /> Coins
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSortBy('challenges')}>
            <Video className="h-4 w-4 mr-2" /> Challenge Count
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LeaderboardHeader;
