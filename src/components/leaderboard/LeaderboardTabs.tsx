
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Globe, MapPin, Users, Video } from 'lucide-react';
import LeaderboardTabContent from './LeaderboardTabContent';

interface LeaderboardTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  users: any[];
  isLoading: boolean;
  cityFilters: string[];
  challengeFilters: string[];
  teamFilters: string[];
}

const LeaderboardTabs: React.FC<LeaderboardTabsProps> = ({
  activeTab,
  setActiveTab,
  users,
  isLoading,
  cityFilters,
  challengeFilters,
  teamFilters
}) => {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="text-xl mb-4">User Rankings</CardTitle>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="global" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Global</span>
            </TabsTrigger>
            <TabsTrigger value="city" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">City</span>
            </TabsTrigger>
            <TabsTrigger value="challenge-type" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Challenge Type</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Team</span>
            </TabsTrigger>
          </TabsList>

          <CardContent className="pt-6">
            <LeaderboardTabContent 
              tabValue="global"
              users={users}
              isLoading={isLoading}
            />
            
            <LeaderboardTabContent 
              tabValue="city"
              users={users}
              isLoading={isLoading}
              filterTitle="Featured Cities"
              filters={cityFilters}
            />
            
            <LeaderboardTabContent 
              tabValue="challenge-type"
              users={users}
              isLoading={isLoading}
              filterTitle="Challenge Categories"
              filters={challengeFilters}
            />
            
            <LeaderboardTabContent 
              tabValue="team"
              users={users}
              isLoading={isLoading}
              filterTitle="Teams"
              filters={teamFilters}
              createLabel="+ Create Team"
            />
          </CardContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
};

export default LeaderboardTabs;
