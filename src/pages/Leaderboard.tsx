
import React from 'react';
import LeaderboardHeader from '@/components/leaderboard/LeaderboardHeader';
import LeaderboardTabs from '@/components/leaderboard/LeaderboardTabs';
import BadgeSystem from '@/components/leaderboard/BadgeSystem';
import { useLeaderboardData } from '@/hooks/useLeaderboardData';
import { mockUsers, badgeSystem } from '@/data/leaderboardMockData';

const LeaderboardPage = () => {
  const {
    activeTab,
    setActiveTab,
    sortBy,
    setSortBy,
    users,
    isLoading,
    badgeSystem: badges
  } = useLeaderboardData(mockUsers, badgeSystem);

  const cityFilters = ['Berlin', 'New York', 'London', 'Tokyo', 'Paris', '+ Add Your City'];
  const challengeFilters = ['Dance', 'Comedy', 'Lifestyle', 'Fitness', 'Tutorial', 'Food'];
  const teamFilters = ['Dance Crew', 'Comedy Club', 'Fitness Heroes', '+ Create Team'];

  return (
    <div className="container py-8">
      <LeaderboardHeader sortBy={sortBy} setSortBy={setSortBy} />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          <LeaderboardTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            users={users}
            isLoading={isLoading}
            cityFilters={cityFilters}
            challengeFilters={challengeFilters}
            teamFilters={teamFilters}
          />
        </div>
        
        <div className="md:col-span-1">
          <BadgeSystem badges={badges} />
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
