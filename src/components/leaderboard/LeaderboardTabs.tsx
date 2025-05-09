
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
      <div className="sticky top-0 z-20 bg-jillr-darkAccent/95 backdrop-blur-xl border-b border-jillr-border/20 shadow-md">
        <TabsList className="flex justify-between bg-transparent p-0 h-auto w-full">
          <TabsTrigger 
            value="global" 
            className="flex-1 py-5 rounded-none border-b-2 border-transparent data-[state=active]:border-jillr-neonPurple data-[state=active]:bg-jillr-neonPurple/10 data-[state=active]:text-jillr-neonPurple transition-all duration-200 flex flex-row items-center justify-center gap-2"
          >
            <Globe className="h-5 w-5" />
            <span className="hidden sm:inline text-base font-medium">Global</span>
          </TabsTrigger>
          <TabsTrigger 
            value="city" 
            className="flex-1 py-5 rounded-none border-b-2 border-transparent data-[state=active]:border-jillr-neonGreen data-[state=active]:bg-jillr-neonGreen/10 data-[state=active]:text-jillr-neonGreen transition-all duration-200 flex flex-row items-center justify-center gap-2"
          >
            <MapPin className="h-5 w-5" />
            <span className="hidden sm:inline text-base font-medium">Cities</span>
          </TabsTrigger>
          <TabsTrigger 
            value="challenge-type" 
            className="flex-1 py-5 rounded-none border-b-2 border-transparent data-[state=active]:border-jillr-neonBlue data-[state=active]:bg-jillr-neonBlue/10 data-[state=active]:text-jillr-neonBlue transition-all duration-200 flex flex-row items-center justify-center gap-2"
          >
            <Video className="h-5 w-5" />
            <span className="hidden sm:inline text-base font-medium">Challenges</span>
          </TabsTrigger>
          <TabsTrigger 
            value="team" 
            className="flex-1 py-5 rounded-none border-b-2 border-transparent data-[state=active]:border-jillr-neonPink data-[state=active]:bg-jillr-neonPink/10 data-[state=active]:text-jillr-neonPink transition-all duration-200 flex flex-row items-center justify-center gap-2"
          >
            <Users className="h-5 w-5" />
            <span className="hidden sm:inline text-base font-medium">Teams</span>
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
