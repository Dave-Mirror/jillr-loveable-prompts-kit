
import React, { useState } from 'react';
import { mockUsers, badgeSystem } from '@/data/leaderboardMockData';
import PageContainer from '@/components/navigation/PageContainer';
import { useLeaderboardData } from '@/hooks/useLeaderboardData';
import LeaderboardHeader from '@/components/leaderboard/LeaderboardHeader';
import LeaderboardTabs from '@/components/leaderboard/LeaderboardTabs';
import { Trophy, Medal, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState('all-time');

  const {
    activeTab,
    setActiveTab,
    sortBy,
    setSortBy,
    users,
    isLoading,
    cities,
    challengeTypes,
    teams
  } = useLeaderboardData(mockUsers, badgeSystem);

  return (
    <PageContainer previousPage="/explore" nextPage="/wallet" className="bg-background">
      <div className="w-full max-w-[1600px] mx-auto pb-24 px-2 md:px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Decorative elements - enlarged and repositioned */}
          <motion.div 
            className="absolute -top-6 left-0 md:left-12 text-jillr-neonPurple/10 transform rotate-12 scale-125 z-0"
            animate={{ rotate: [10, 14, 10], y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
          >
            <Trophy size={100} strokeWidth={1.5} />
          </motion.div>
          <motion.div 
            className="absolute -top-4 right-0 md:right-16 text-jillr-neonGreen/10 transform -rotate-12 scale-125 z-0"
            animate={{ rotate: [-12, -8, -12], y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <Medal size={80} strokeWidth={1.5} />
          </motion.div>
          <motion.div 
            className="absolute top-20 left-1/2 -translate-x-1/2 text-jillr-neonPink/10 scale-150 z-0"
            animate={{ scale: [1.4, 1.5, 1.4], opacity: [0.1, 0.15, 0.1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Crown size={90} strokeWidth={1.5} />
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent pointer-events-none h-52 z-10"></div>
          
          {/* Main content */}
          <div className="relative z-20">
            <LeaderboardHeader 
              sortBy={sortBy} 
              setSortBy={setSortBy} 
              timeFrame={timeFrame}
              setTimeFrame={setTimeFrame}
            />
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6"
            >
              <div className="relative border border-jillr-neonPurple/30 bg-jillr-darkAccent/30 backdrop-blur-md overflow-hidden rounded-2xl shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-jillr-neonPurple/5 to-jillr-neonPink/5 pointer-events-none"></div>
                <LeaderboardTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  users={users}
                  isLoading={isLoading}
                  cityFilters={cities}
                  challengeFilters={challengeTypes}
                  teamFilters={teams}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default Leaderboard;
