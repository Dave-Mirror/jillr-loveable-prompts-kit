
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
      <div className="text-center py-16 my-6">
        <Trophy className="h-20 w-20 text-muted-foreground mx-auto mb-6 opacity-30" />
        <h3 className="text-2xl font-medium mb-4">Keine Nutzer gefunden</h3>
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

  // Create a podium style display with improved sizing
  return (
    <div className="relative py-8 my-6 md:my-10 overflow-visible px-2 sm:px-6">
      {/* Podium background - make it taller */}
      <div className="absolute bottom-0 left-0 right-0 h-72 md:h-80 bg-gradient-to-t from-jillr-neonPurple/5 to-transparent rounded-3xl"></div>
      
      <motion.div 
        className="relative flex justify-center items-end gap-3 xs:gap-6 md:gap-16 lg:gap-20 h-[420px] md:h-[480px] lg:h-[520px] z-10 overflow-visible"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Second Place */}
        {topThree[1] && (
          <motion.div className="flex flex-col items-center" variants={item}>
            <div className="relative">
              <Medal className="absolute -top-8 -right-3 h-10 w-10 md:h-12 md:w-12 text-gray-300" />
              <Avatar className="h-28 w-28 md:h-36 md:w-36 lg:h-44 lg:w-44 border-2 border-gray-300 ring-4 ring-gray-300/20 shadow-lg">
                <AvatarImage src={topThree[1]?.avatarUrl} alt={topThree[1]?.username} />
                <AvatarFallback className="text-xl md:text-2xl">{topThree[1]?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            <div className="bg-jillr-darkAccent/60 backdrop-blur-sm border border-gray-500/20 h-36 md:h-44 w-28 md:w-36 flex items-center justify-center rounded-xl mt-5 relative shadow-lg">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-3xl font-bold text-gray-300">2</div>
              <div className="text-2xl md:text-3xl font-medium text-gray-300 mt-6">{topThree[1]?.level}</div>
              <div className="absolute bottom-3 left-0 right-0 text-center text-xs text-gray-400">Level</div>
            </div>
            <div className="mt-4 text-center">
              <div className="font-medium text-base xs:text-lg md:text-xl max-w-28 md:max-w-36 truncate">{topThree[1]?.username}</div>
              <div className="text-sm md:text-base flex items-center justify-center gap-1 text-gray-300">
                <Zap className="h-3 w-3 md:h-4 md:w-4" /> {topThree[1]?.xp.toLocaleString()}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* First Place - make it bigger */}
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
              <Crown className="absolute -top-12 left-1/2 -translate-x-1/2 h-14 w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 text-yellow-500 animate-pulse-soft" />
              <div className="rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 p-1.5 md:p-2 shadow-xl">
                <Avatar className="h-36 w-36 md:h-44 md:w-44 lg:h-56 lg:w-56 border-2 border-yellow-300 ring-4 ring-yellow-500/30">
                  <AvatarImage src={topThree[0]?.avatarUrl} alt={topThree[0]?.username} />
                  <AvatarFallback className="text-2xl md:text-3xl">{topThree[0]?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="bg-jillr-darkAccent/70 backdrop-blur-md border border-yellow-500/30 h-48 md:h-56 w-32 md:w-40 flex flex-col items-center justify-center rounded-xl mt-5 shadow-xl">
              <Trophy className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 text-yellow-500 mb-2" />
              <div className="text-3xl font-bold text-yellow-400">1</div>
              <div className="text-3xl md:text-4xl font-medium text-yellow-400 mt-2">{topThree[0]?.level}</div>
              <div className="text-sm text-yellow-300/70 mt-1">Level</div>
            </div>
            <div className="mt-4 text-center">
              <div className="font-bold text-xl md:text-2xl max-w-32 md:max-w-40 truncate">{topThree[0]?.username}</div>
              <div className="text-base md:text-lg flex items-center justify-center gap-1 text-yellow-400">
                <Zap className="h-4 w-4 md:h-5 md:w-5" /> {topThree[0]?.xp.toLocaleString()}
              </div>
              <div className="flex flex-wrap gap-2 mt-2 justify-center max-w-40 md:max-w-48">
                {topThree[0]?.badges.slice(0, 2).map((badge, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs md:text-sm py-0.5 px-2.5 bg-yellow-500/10 border-yellow-500/30 text-yellow-400">
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
              <Medal className="absolute -top-8 -right-3 h-9 w-9 md:h-10 md:w-10 text-amber-700" />
              <Avatar className="h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 border-2 border-amber-700 ring-4 ring-amber-700/20 shadow-lg">
                <AvatarImage src={topThree[2]?.avatarUrl} alt={topThree[2]?.username} />
                <AvatarFallback className="text-lg md:text-xl">{topThree[2]?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            <div className="bg-jillr-darkAccent/60 backdrop-blur-sm border border-amber-700/20 h-32 md:h-40 w-26 md:w-32 flex items-center justify-center rounded-xl mt-4 relative shadow-lg">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 text-2xl font-bold text-amber-700">3</div>
              <div className="text-xl md:text-2xl font-medium text-amber-700 mt-4">{topThree[2]?.level}</div>
              <div className="absolute bottom-3 left-0 right-0 text-center text-xs text-amber-700/70">Level</div>
            </div>
            <div className="mt-3 text-center">
              <div className="font-medium text-base xs:text-lg md:text-xl max-w-24 md:max-w-32 truncate">{topThree[2]?.username}</div>
              <div className="text-sm md:text-base flex items-center justify-center gap-1 text-amber-700">
                <Zap className="h-3 w-3 md:h-4 md:w-4" /> {topThree[2]?.xp.toLocaleString()}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TopUsersPodium;
