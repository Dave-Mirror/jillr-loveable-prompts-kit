
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Crown, Medal, Zap, Star } from 'lucide-react';
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
};

interface TopUsersPodiumProps {
  users: User[];
}

const TopUsersPodium = ({ users }: TopUsersPodiumProps) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-12 my-6">
        <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-30" />
        <h3 className="text-xl font-medium mb-2">Keine Nutzer gefunden</h3>
        <p className="text-muted-foreground">Passe deine Filter an, um Ergebnisse zu sehen</p>
      </div>
    );
  }
  
  // Get top 3 users for the podium display
  const topThree = users.slice(0, 3);
  
  // Define animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  // Create a podium style display
  return (
    <div className="relative py-4 my-2 mb-8 md:mb-16">
      {/* Podium background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-jillr-neonPurple/5 to-transparent rounded-lg"></div>
      
      <motion.div 
        className="relative flex justify-center items-end gap-6 md:gap-10 lg:gap-16 h-[320px] md:h-[360px] z-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Second Place */}
        {topThree[1] && (
          <motion.div className="flex flex-col items-center" variants={item}>
            <div className="relative">
              <Medal className="absolute -top-4 -right-2 h-8 w-8 text-gray-300" />
              <Avatar className="h-20 w-20 md:h-28 md:w-28 border-2 border-gray-300 ring-2 ring-gray-300/20">
                <AvatarImage src={topThree[1]?.avatarUrl} />
                <AvatarFallback>{topThree[1]?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            <div className="bg-jillr-darkAccent border border-gray-500/30 h-36 md:h-44 w-24 md:w-32 flex items-center justify-center rounded-t-lg mt-2 relative">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 text-3xl font-bold text-gray-300">2</div>
              <div className="text-xl md:text-2xl font-medium text-gray-300 mt-6">{topThree[1]?.level}</div>
              <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-400">Level</div>
            </div>
            <div className="mt-2 text-center">
              <div className="font-medium text-base md:text-lg">{topThree[1]?.username}</div>
              <div className="text-sm flex items-center justify-center gap-1 text-gray-300">
                <Zap className="h-3 w-3" /> {topThree[1]?.xp.toLocaleString()}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* First Place */}
        {topThree[0] && (
          <motion.div 
            className="flex flex-col items-center z-20" 
            variants={item}
            animate={{ 
              y: [0, -5, 0],
              transition: { 
                repeat: Infinity, 
                duration: 2,
                repeatType: "reverse"
              }
            }}
          >
            <div className="relative">
              <Crown className="absolute -top-8 left-1/2 -translate-x-1/2 h-10 w-10 text-yellow-500 animate-pulse-soft" />
              <div className="rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 p-1">
                <Avatar className="h-28 w-28 md:h-36 md:w-36 border-2 border-yellow-300 ring-2 ring-yellow-500/30">
                  <AvatarImage src={topThree[0]?.avatarUrl} />
                  <AvatarFallback>{topThree[0]?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="bg-jillr-darkAccent/80 border border-yellow-500/30 h-48 md:h-56 w-28 md:w-36 flex flex-col items-center justify-center rounded-t-lg mt-2">
              <Trophy className="h-12 w-12 text-yellow-500 mb-2" />
              <div className="text-2xl font-bold text-yellow-400">1</div>
              <div className="text-2xl font-medium text-yellow-400 mt-2">{topThree[0]?.level}</div>
              <div className="text-xs text-yellow-300/70 mt-1">Level</div>
            </div>
            <div className="mt-2 text-center">
              <div className="font-bold text-xl">{topThree[0]?.username}</div>
              <div className="text-sm flex items-center justify-center gap-1 text-yellow-400">
                <Zap className="h-3 w-3" /> {topThree[0]?.xp.toLocaleString()}
              </div>
              <div className="flex gap-1 mt-1 justify-center">
                {topThree[0]?.badges.slice(0, 2).map((badge, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs py-0 bg-yellow-500/10 border-yellow-500/30 text-yellow-400">
                    <Star className="h-3 w-3 mr-1" /> {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Third Place */}
        {topThree[2] && (
          <motion.div className="flex flex-col items-center" variants={item}>
            <div className="relative">
              <Medal className="absolute -top-4 -right-2 h-7 w-7 text-amber-700" />
              <Avatar className="h-18 w-18 md:h-24 md:w-24 border-2 border-amber-700 ring-2 ring-amber-700/20">
                <AvatarImage src={topThree[2]?.avatarUrl} />
                <AvatarFallback>{topThree[2]?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            <div className="bg-jillr-darkAccent border border-amber-700/30 h-28 md:h-36 w-22 md:w-28 flex items-center justify-center rounded-t-lg mt-2 relative">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 text-2xl font-bold text-amber-700">3</div>
              <div className="text-lg md:text-xl font-medium text-amber-700 mt-6">{topThree[2]?.level}</div>
              <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-amber-700/70">Level</div>
            </div>
            <div className="mt-2 text-center">
              <div className="font-medium text-base md:text-lg">{topThree[2]?.username}</div>
              <div className="text-sm flex items-center justify-center gap-1 text-amber-700">
                <Zap className="h-3 w-3" /> {topThree[2]?.xp.toLocaleString()}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TopUsersPodium;
