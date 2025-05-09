
import React from 'react';
import { ChevronDown, Coins, Filter, Trophy, Video, Zap, Search, Clock } from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LeaderboardHeaderProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  timeFrame?: string;
  setTimeFrame?: (value: string) => void;
}

const LeaderboardHeader = ({ sortBy, setSortBy, timeFrame = 'all-time', setTimeFrame }: LeaderboardHeaderProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-6 pb-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold flex items-center gap-3 mb-3">
            <Trophy className="h-10 w-10 text-jillr-neonPurple animate-pulse-soft" />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-jillr-neonPurple to-jillr-neonPink">
              Leaderboard
            </span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm md:text-base max-w-md">
            Vergleiche deine Leistungen mit anderen jillrs und erobere die Spitze der Community
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-3">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Nach Nutzern suchen..." 
              className="pl-10 pr-4 w-full bg-jillr-darkAccent/60 border-jillr-border/30" 
            />
          </div>

          {setTimeFrame && (
            <Select
              value={timeFrame}
              onValueChange={(value) => setTimeFrame(value)}
            >
              <SelectTrigger className="bg-jillr-darkAccent/60 border-jillr-border/30 w-full">
                <Clock className="h-4 w-4 mr-2" />
                <span className="hidden xs:inline">Zeitraum:</span>
                <span>
                  {timeFrame === 'all-time' ? 'Gesamt' : 
                   timeFrame === 'weekly' ? 'Diese Woche' : 
                   'Dieser Monat'}
                </span>
              </SelectTrigger>
              <SelectContent position="popper" className="bg-jillr-darkAccent/95 backdrop-blur-md border-jillr-border/30">
                <SelectItem value="all-time">Gesamt</SelectItem>
                <SelectItem value="weekly">Diese Woche</SelectItem>
                <SelectItem value="monthly">Dieser Monat</SelectItem>
              </SelectContent>
            </Select>
          )}

          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value)}
          >
            <SelectTrigger className="bg-jillr-darkAccent/60 border-jillr-border/30 w-full">
              <Filter className="h-4 w-4 mr-2" />
              <span className="hidden xs:inline">Sort:</span>
              <span>
                {sortBy === 'xp' ? 'XP Punkte' : 
                 sortBy === 'coins' ? 'Coins' : 
                 'Challenges'}
              </span>
            </SelectTrigger>
            <SelectContent position="popper" className="bg-jillr-darkAccent/95 backdrop-blur-md border-jillr-border/30 z-50">
              <SelectItem value="xp" className="flex items-center">
                <Zap className="h-4 w-4 mr-2 text-jillr-neonGreen" />
                <span>XP Punkte</span>
              </SelectItem>
              <SelectItem value="coins" className="flex items-center">
                <Coins className="h-4 w-4 mr-2 text-jillr-neonPink" />
                <span>Coins</span>
              </SelectItem>
              <SelectItem value="challenges" className="flex items-center">
                <Video className="h-4 w-4 mr-2 text-jillr-neonBlue" />
                <span>Challenge Anzahl</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardHeader;
