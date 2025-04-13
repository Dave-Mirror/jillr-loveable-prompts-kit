
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Zap } from 'lucide-react';
import RankChangeIndicator from './RankChangeIndicator';

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
  rankChange?: number;
};

interface UserRankListProps {
  users: User[];
  tabValue: string;
  startRank: number;
}

const UserRankList = ({ users, tabValue, startRank = 4 }: UserRankListProps) => {
  return (
    <div className="space-y-4">
      {users.map((user, index) => (
        <div key={user.id} className="flex items-center gap-4 p-3 rounded-lg border border-border">
          <div className="flex items-center gap-1 w-10">
            <div className="text-xl font-bold text-center">{index + startRank}</div>
            {user.rankChange !== undefined && (
              <RankChangeIndicator change={user.rankChange} />
            )}
          </div>
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium">{user.username}</div>
            {tabValue === 'city' && (
              <div className="text-xs flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {user.city}
              </div>
            )}
            {tabValue === 'challenge-type' && (
              <div className="text-xs text-muted-foreground">{user.challengeType}</div>
            )}
            {tabValue === 'team' && (
              <div className="text-xs flex items-center gap-1">
                <Users className="h-3 w-3" /> {user.team}
              </div>
            )}
            {tabValue === 'global' && (
              <div className="text-xs text-muted-foreground">{user.city}</div>
            )}
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="text-xs text-muted-foreground">XP</div>
              <div className="font-medium">{user.xp.toLocaleString()}</div>
            </div>
            
            {tabValue === 'global' && (
              <div className="flex flex-col items-center">
                <div className="text-xs text-muted-foreground">Coins</div>
                <div className="font-medium">{user.coins.toLocaleString()}</div>
              </div>
            )}
            
            <div className="flex flex-col items-center">
              <div className="text-xs text-muted-foreground">Challenges</div>
              <div className="font-medium">{user.challenges}</div>
            </div>
            
            {tabValue === 'global' && (
              <div className="hidden md:flex items-center gap-1">
                {user.badges.slice(0, 1).map((badge, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {badge}
                  </Badge>
                ))}
                {user.badges.length > 1 && (
                  <span className="text-xs text-muted-foreground">+{user.badges.length - 1}</span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserRankList;
