
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="sticky top-0 z-20 bg-jillr-darkAccent/95 backdrop-blur-md border-b border-jillr-border/30 shadow-md">
        <TabsList className="grid grid-cols-4 bg-transparent p-0 h-auto w-full">
          <TabsTrigger 
            value="global" 
            className="data-[state=active]:bg-jillr-neonPurple/20 data-[state=active]:text-jillr-neonPurple py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-jillr-neonPurple flex flex-row items-center justify-center gap-2"
          >
            <Globe className="h-5 w-5" />
            <span className="hidden sm:inline text-base">Global</span>
          </TabsTrigger>
          <TabsTrigger 
            value="city" 
            className="data-[state=active]:bg-jillr-neonGreen/20 data-[state=active]:text-jillr-neonGreen py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-jillr-neonGreen flex flex-row items-center justify-center gap-2"
          >
            <MapPin className="h-5 w-5" />
            <span className="hidden sm:inline text-base">Cities</span>
          </TabsTrigger>
          <TabsTrigger 
            value="challenge-type" 
            className="data-[state=active]:bg-jillr-neonBlue/20 data-[state=active]:text-jillr-neonBlue py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-jillr-neonBlue flex flex-row items-center justify-center gap-2"
          >
            <Video className="h-5 w-5" />
            <span className="hidden sm:inline text-base">Challenges</span>
          </TabsTrigger>
          <TabsTrigger 
            value="team" 
            className="data-[state=active]:bg-jillr-neonPink/20 data-[state=active]:text-jillr-neonPink py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-jillr-neonPink flex flex-row items-center justify-center gap-2"
          >
            <Users className="h-5 w-5" />
            <span className="hidden sm:inline text-base">Teams</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="p-4">
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
          filterTitle="Challenge Kategorien"
          filters={challengeFilters}
        />
        
        <LeaderboardTabContent 
          tabValue="team"
          users={users}
          isLoading={isLoading}
          filterTitle="Teams"
          filters={teamFilters}
          createLabel="+ Team erstellen"
        />
      </div>
    </Tabs>
  );
};

export default LeaderboardTabs;
