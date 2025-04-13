
import React, { useState } from 'react';
import { mockUsers, badgeSystem } from '@/data/leaderboardMockData';
import PageContainer from '@/components/navigation/PageContainer';
import LeaderboardHeader from '@/components/leaderboard/LeaderboardHeader';
import LeaderboardTabs from '@/components/leaderboard/LeaderboardTabs';
import { useLeaderboard } from '@/hooks/useLeaderboard';

const Leaderboard = () => {
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
  } = useLeaderboard(mockUsers, badgeSystem);

  return (
    <PageContainer previousPage="/explore" nextPage="/wallet">
      <div className="container mx-auto max-w-6xl py-6">
        <LeaderboardHeader sortBy={sortBy} setSortBy={setSortBy} />
        
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
    </PageContainer>
  );
};

export default Leaderboard;
