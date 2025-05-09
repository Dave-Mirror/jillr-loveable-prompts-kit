
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import TopUsersPodium from './TopUsersPodium';
import UserRankList from './UserRankList';
import CategoryFilters from './CategoryFilters';
import LoadingSpinner from './LoadingSpinner';
import { Separator } from '@/components/ui/separator';

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
    <TabsContent value={tabValue} className="mt-0 focus-visible:outline-none focus-visible:ring-0 focus:outline-none">
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
          
          {users.length > 3 && (
            <>
              <Separator className="my-4 bg-jillr-border/30" />
              
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <span className="bg-jillr-neonPurple/20 text-jillr-neonPurple px-2 py-1 rounded-md mr-2">
                  {users.length - 3}
                </span> 
                Weitere Teilnehmer
              </h3>
              
              <UserRankList 
                users={users.slice(3)} 
                tabValue={tabValue} 
                startRank={4} 
              />
            </>
          )}
        </>
      )}
    </TabsContent>
  );
};

export default LeaderboardTabContent;
