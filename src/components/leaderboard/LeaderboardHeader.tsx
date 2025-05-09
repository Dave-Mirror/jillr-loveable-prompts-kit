
import React from 'react';
import { ChevronDown, Coins, Filter, Trophy, Video, Zap, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-4 pb-2">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            <Trophy className="h-8 w-8 text-jillr-neonPurple animate-pulse-soft" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPink">
              Leaderboard
            </span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm md:text-base max-w-md">
            Vergleiche deine Leistungen mit anderen jillrs und erobere die Spitze der Community
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Nach Nutzern suchen..." 
              className="pl-9 bg-jillr-darkAccent border-jillr-border w-full sm:w-[200px]" 
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-jillr-darkAccent border-jillr-border hover:bg-jillr-darkLight">
                <Filter className="h-4 w-4" />
                <span className="hidden xs:inline">Sort:</span> {sortBy === 'xp' ? 'XP Punkte' : sortBy === 'coins' ? 'Coins' : 'Challenges'}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-jillr-darkAccent border-jillr-border">
              <DropdownMenuLabel>Sortieren nach</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-jillr-border/50" />
              <DropdownMenuItem onClick={() => setSortBy('xp')} className="hover:bg-jillr-darkLight">
                <Zap className="h-4 w-4 mr-2 text-jillr-neonGreen" /> XP Punkte
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('coins')} className="hover:bg-jillr-darkLight">
                <Coins className="h-4 w-4 mr-2 text-jillr-neonPink" /> Coins
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('challenges')} className="hover:bg-jillr-darkLight">
                <Video className="h-4 w-4 mr-2 text-jillr-neonBlue" /> Challenge Anzahl
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardHeader;
