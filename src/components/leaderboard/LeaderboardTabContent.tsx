
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import TopUsersPodium from './TopUsersPodium';
import UserRankList from './UserRankList';
import CategoryFilters from './CategoryFilters';
import LoadingSpinner from './LoadingSpinner';
import { Separator } from '@/components/ui/separator';
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
    <TabsContent 
      value={tabValue} 
      className="mt-0 focus-visible:outline-none focus-visible:ring-0 focus:outline-none space-y-6"
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filterTitle && filters && (
            <CategoryFilters
              title={filterTitle}
              filters={filters}
              createLabel={createLabel}
            />
          )}
          
          {/* Podium mit Top 3 Benutzern */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <TopUsersPodium users={users} />
          </motion.div>
          
          {/* Liste der weiteren Benutzer */}
          {users.length > 3 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Separator className="my-4 bg-jillr-border/30" />
              
              <div className="bg-jillr-darkAccent/30 p-4 rounded-lg border border-jillr-border/20">
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
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </TabsContent>
  );
};

export default LeaderboardTabContent;
