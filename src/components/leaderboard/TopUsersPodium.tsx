
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Zap } from 'lucide-react';

type User = {
  id: string;
  username: string;
  avatarUrl: string;
  xp: number;
  coins: number;
  challenges: number;
  city: string;
  team: string;
  challengeType: string;
  level: number;
  badges: string[];
};

interface TopUsersPodiumProps {
  users: User[];
}

const TopUsersPodium = ({ users }: TopUsersPodiumProps) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium">No users found</h3>
        <p className="text-muted-foreground">Try changing your filters</p>
      </div>
    );
  }
  
  // Get top 3 users for the podium display
  const topThree = users.slice(0, 3);
  
  return (
    <div className="mb-8">
      <div className="flex justify-center items-end gap-4 h-44 mb-8">
        {/* Second Place */}
        <div className="flex flex-col items-center">
          <Avatar className="h-16 w-16 border-2 border-jillr-neonGreen">
            <AvatarImage src={topThree[1]?.avatarUrl} />
            <AvatarFallback>{topThree[1]?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="bg-jillr-neonGreen/20 border border-jillr-neonGreen/30 h-28 w-20 flex items-center justify-center rounded-t-lg mt-2">
            <div className="text-xl font-bold">2</div>
          </div>
          <div className="mt-2 text-center">
            <div className="font-medium">{topThree[1]?.username}</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Zap className="h-3 w-3" /> {topThree[1]?.xp.toLocaleString()}
            </div>
          </div>
        </div>
        
        {/* First Place */}
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-gradient-to-b from-jillr-neonPurple to-transparent p-1">
            <Avatar className="h-20 w-20 border-2 border-jillr-neonPurple">
              <AvatarImage src={topThree[0]?.avatarUrl} />
              <AvatarFallback>{topThree[0]?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <div className="bg-jillr-neonPurple/20 border border-jillr-neonPurple/30 h-36 w-24 flex items-center justify-center rounded-t-lg mt-2">
            <Trophy className="h-8 w-8 text-jillr-neonPurple" />
          </div>
          <div className="mt-2 text-center">
            <div className="font-bold">{topThree[0]?.username}</div>
            <div className="text-sm flex items-center justify-center gap-1">
              <Zap className="h-3 w-3 text-jillr-neonPurple" /> {topThree[0]?.xp.toLocaleString()}
            </div>
            <div className="flex gap-1 mt-1 justify-center">
              {topThree[0]?.badges.slice(0, 2).map((badge, idx) => (
                <Badge key={idx} variant="outline" className="text-xs py-0">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        {/* Third Place */}
        <div className="flex flex-col items-center">
          <Avatar className="h-16 w-16 border-2 border-jillr-neonPink">
            <AvatarImage src={topThree[2]?.avatarUrl} />
            <AvatarFallback>{topThree[2]?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="bg-jillr-neonPink/20 border border-jillr-neonPink/30 h-20 w-20 flex items-center justify-center rounded-t-lg mt-2">
            <div className="text-xl font-bold">3</div>
          </div>
          <div className="mt-2 text-center">
            <div className="font-medium">{topThree[2]?.username}</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Zap className="h-3 w-3" /> {topThree[2]?.xp.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUsersPodium;
