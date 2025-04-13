
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import TopUsersPodium from './TopUsersPodium';
import UserRankList from './UserRankList';
import CategoryFilters from './CategoryFilters';
import LoadingSpinner from './LoadingSpinner';

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

interface LeaderboardTabContentProps {
  tabValue: string;
  users: User[];
  isLoading: boolean;
  filterTitle?: string;
  filters?: string[];
  createLabel?: string;
}

const LeaderboardTabContent = ({ 
  tabValue, 
  users, 
  isLoading, 
  filterTitle, 
  filters, 
  createLabel 
}: LeaderboardTabContentProps) => {
  return (
    <TabsContent value={tabValue} className="mt-0">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {filterTitle && filters && (
            <CategoryFilters
              title={filterTitle}
              filters={filters}
              createLabel={createLabel}
            />
          )}
          
          <TopUsersPodium users={users} />
          
          <UserRankList 
            users={users.slice(3)} 
            tabValue={tabValue} 
            startRank={4} 
          />
        </>
      )}
    </TabsContent>
  );
};

export default LeaderboardTabContent;
