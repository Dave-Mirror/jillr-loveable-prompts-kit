
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Zap, Award, Star } from 'lucide-react';
import RankChangeIndicator from './RankChangeIndicator';
import { motion } from 'framer-motion';

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
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {users.map((user, index) => (
        <motion.div 
          key={user.id} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.2 }}
          whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
          className="flex items-center gap-3 p-3 rounded-lg border border-jillr-border/30 bg-jillr-darkAccent/50 backdrop-blur-sm hover:bg-jillr-darkLight transition-colors"
        >
          <div className="flex items-center gap-1 min-w-[36px]">
            <div className="text-lg font-bold text-center">{index + startRank}</div>
            {user.rankChange !== undefined && (
              <RankChangeIndicator change={user.rankChange} />
            )}
          </div>
          
          <div className="relative">
            <Avatar className="h-10 w-10 ring-1 ring-jillr-border/50">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-jillr-dark text-xs px-1 rounded-md border border-jillr-border/50">
              {user.level}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{user.username}</div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              {tabValue === 'city' && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {user.city}
                </div>
              )}
              {tabValue === 'challenge-type' && (
                <span className="truncate">{user.challengeType}</span>
              )}
              {tabValue === 'team' && (
                <div className="flex items-center gap-1 truncate">
                  <Users className="h-3 w-3 flex-shrink-0" /> <span className="truncate">{user.team}</span>
                </div>
              )}
              {tabValue === 'global' && (
                <div className="flex items-center gap-1 truncate">
                  <MapPin className="h-3 w-3 flex-shrink-0" /> <span className="truncate">{user.city}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 ml-auto">
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-400 flex items-center">
                <Zap className="h-3 w-3 mr-1 text-jillr-neonGreen" /> XP
              </div>
              <div className="font-medium">{user.xp.toLocaleString()}</div>
            </div>
            
            {tabValue === 'global' && (
              <div className="hidden sm:flex flex-col items-center">
                <div className="text-xs text-gray-400">Coins</div>
                <div className="font-medium">{user.coins.toLocaleString()}</div>
              </div>
            )}
            
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-400">Challenges</div>
              <div className="font-medium">{user.challenges}</div>
            </div>
          </div>
          
          <div className="hidden md:block">
            {user.badges.length > 0 && (
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="bg-jillr-darkLight border-jillr-border/50 text-xs flex items-center gap-1">
                  <Award className="h-3 w-3 text-jillr-neonPurple" /> {user.badges[0]}
                </Badge>
                {user.badges.length > 1 && (
                  <span className="text-xs text-muted-foreground">+{user.badges.length - 1}</span>
                )}
              </div>
            )}
          </div>
        </motion.div>
      ))}
      
      {users.length === 0 && (
        <div className="text-center py-10">
          <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-20" />
          <p className="text-muted-foreground">Keine weiteren Nutzer gefunden</p>
        </div>
      )}
    </motion.div>
  );
};

export default UserRankList;
