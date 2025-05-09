
import React, { useState } from 'react';
import { mockUsers, badgeSystem } from '@/data/leaderboardMockData';
import PageContainer from '@/components/navigation/PageContainer';
import { useLeaderboardData } from '@/hooks/useLeaderboardData';
import LeaderboardHeader from '@/components/leaderboard/LeaderboardHeader';
import LeaderboardTabs from '@/components/leaderboard/LeaderboardTabs';
import { Card } from '@/components/ui/card';
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
    <PageContainer previousPage="/explore" nextPage="/wallet">
      <div className="container mx-auto max-w-7xl pb-16">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Decorative elements */}
          <motion.div 
            className="absolute -top-6 left-4 md:left-12 text-jillr-neonPurple/20 transform rotate-12"
            animate={{ rotate: [10, 14, 10], y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
          >
            <Trophy size={64} strokeWidth={1.5} />
          </motion.div>
          <motion.div 
            className="absolute -top-4 right-4 md:right-16 text-jillr-neonGreen/20 transform -rotate-12"
            animate={{ rotate: [-12, -8, -12], y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <Medal size={48} strokeWidth={1.5} />
          </motion.div>
          <motion.div 
            className="absolute top-12 left-1/2 -translate-x-1/2 text-jillr-neonPink/20"
            animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Crown size={56} strokeWidth={1.5} />
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent pointer-events-none h-40"></div>
          
          {/* Main content */}
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
            className="px-2 sm:px-4"
          >
            <Card className="relative border border-jillr-neonPurple/30 bg-jillr-darkAccent/50 overflow-hidden mt-4">
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
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default Leaderboard;
