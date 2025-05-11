
import React, { useState } from 'react';
import PageContainer from '@/components/navigation/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Map, Trophy, Zap, Users, Clock, Flame } from 'lucide-react';
import CityClashChallengeGrid from '@/components/city-clash/CityClashChallengeGrid';
import CityClashMap from '@/components/city-clash/CityClashMap';
import CityClashLeaderboard from '@/components/city-clash/CityClashLeaderboard';
import { useCityClashData } from '@/hooks/useCityClashData';

const CityClashPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('challenges');
  const [searchQuery, setSearchQuery] = useState('');
  const { 
    challenges, 
    districts, 
    teams, 
    leaderboard,
    activeChallenges,
    isLoading,
    filterChallenges
  } = useCityClashData();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    filterChallenges(e.target.value);
  };

  return (
    <PageContainer previousPage="/explore" nextPage="/leaderboard">
      <div className="container mx-auto max-w-6xl pb-20 pt-4">
        <header className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPink">
              City Clash
            </h1>
            <Badge variant="outline" className="bg-jillr-neonPurple/20 text-jillr-neonPurple">
              Beta
            </Badge>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Die Stadt ist dein Spielfeld. Erobere Viertel, gewinne Belohnungen und battle dich mit anderen Teams.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Challenges, Distrikte oder Teams suchen..."
                className="pl-9"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="bg-jillr-dark border-jillr-border gap-2">
                <Clock className="h-4 w-4" /> Filter
              </Button>
              <Button className="bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPink hover:opacity-90">
                Team beitreten
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="bg-jillr-neonPurple/10 hover:bg-jillr-neonPurple/20 cursor-pointer">
              Alle
            </Badge>
            <Badge variant="outline" className="bg-jillr-neonPurple/10 hover:bg-jillr-neonPurple/20 cursor-pointer">
              Time Rush
            </Badge>
            <Badge variant="outline" className="bg-jillr-neonPurple/10 hover:bg-jillr-neonPurple/20 cursor-pointer">
              Team Battle
            </Badge>
            <Badge variant="outline" className="bg-jillr-neonPurple/10 hover:bg-jillr-neonPurple/20 cursor-pointer">
              Digital Heist
            </Badge>
            <Badge variant="outline" className="bg-jillr-neonPurple/10 hover:bg-jillr-neonPurple/20 cursor-pointer">
              Mystery Card
            </Badge>
            <Badge variant="outline" className="bg-jillr-neonPurple/10 hover:bg-jillr-neonPurple/20 cursor-pointer">
              Shadow Quest
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center justify-center p-4 bg-jillr-dark/50 rounded-lg border border-jillr-border">
              <div className="bg-jillr-neonPurple/20 p-2 rounded-full mb-2">
                <Map className="h-5 w-5 text-jillr-neonPurple" />
              </div>
              <div className="font-bold">{districts.length} Distrikte</div>
              <div className="text-xs text-gray-400">In deiner Stadt</div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-jillr-dark/50 rounded-lg border border-jillr-border">
              <div className="bg-jillr-neonPink/20 p-2 rounded-full mb-2">
                <Zap className="h-5 w-5 text-jillr-neonPink" />
              </div>
              <div className="font-bold">{challenges.length} Challenges</div>
              <div className="text-xs text-gray-400">Aktiv in deiner Nähe</div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-4 bg-jillr-dark/50 rounded-lg border border-jillr-border">
              <div className="bg-jillr-neonGreen/20 p-2 rounded-full mb-2">
                <Users className="h-5 w-5 text-jillr-neonGreen" />
              </div>
              <div className="font-bold">{teams.length} Teams</div>
              <div className="text-xs text-gray-400">Battlen um Distrikte</div>
            </div>
          </div>
        </header>
        
        <Tabs defaultValue="challenges" onValueChange={setActiveTab} value={activeTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="challenges" className="data-[state=active]:bg-jillr-neonPurple/20">
              Challenges
            </TabsTrigger>
            <TabsTrigger value="map" className="data-[state=active]:bg-jillr-neonPurple/20">
              City Map
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-jillr-neonPurple/20">
              Leaderboard
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="challenges">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Flame className="h-5 w-5 text-jillr-neonPink" />
                Aktive City Clash Challenges
              </h2>
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin h-10 w-10 border-4 border-jillr-neonPurple border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p>Challenges werden geladen...</p>
                </div>
              ) : (
                <CityClashChallengeGrid challenges={activeChallenges} />
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="map">
            <CityClashMap districts={districts} challenges={challenges} />
          </TabsContent>
          
          <TabsContent value="leaderboard">
            <CityClashLeaderboard leaderboard={leaderboard} teams={teams} />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default CityClashPage;
