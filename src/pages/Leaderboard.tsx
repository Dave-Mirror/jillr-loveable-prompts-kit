import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, MapPin, Users, Video } from 'lucide-react';
import LeaderboardHeader from '@/components/leaderboard/LeaderboardHeader';
import LeaderboardTabContent from '@/components/leaderboard/LeaderboardTabContent';
import BadgeSystem from '@/components/leaderboard/BadgeSystem';
import { useLeaderboard } from '@/hooks/useLeaderboard';

// Mock data for leaderboard users
const mockUsers = [
  {
    id: '1',
    username: 'dancerstar123',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    xp: 12500,
    coins: 3200,
    challenges: 48,
    city: 'Berlin',
    team: 'Dance Crew',
    challengeType: 'Dance',
    level: 42,
    badges: ['Top 3%', 'Challenge Master', 'Early Adopter'],
  },
  {
    id: '2',
    username: 'fashion_guru',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    xp: 10800,
    coins: 2100,
    challenges: 36,
    city: 'Paris',
    team: 'Fashion Squad',
    challengeType: 'Lifestyle',
    level: 36,
    badges: ['Top 10%', 'Style Icon'],
  },
  {
    id: '3',
    username: 'comedy_king',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    xp: 9600,
    coins: 1800,
    challenges: 42,
    city: 'New York',
    team: 'Comedy Club',
    challengeType: 'Comedy',
    level: 32,
    badges: ['Top 10%', 'Laugh Master'],
  },
  {
    id: '4',
    username: 'fitness_pro',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    xp: 8900,
    coins: 2500,
    challenges: 31,
    city: 'Los Angeles',
    team: 'Fitness Heroes',
    challengeType: 'Fitness',
    level: 30,
    badges: ['Top 15%', 'Workout King'],
  },
  {
    id: '5',
    username: 'travel_with_me',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    xp: 7500,
    coins: 1450,
    challenges: 26,
    city: 'Barcelona',
    team: 'Travel Squad',
    challengeType: 'Lifestyle',
    level: 25,
    badges: ['Top 20%', 'Explorer'],
  },
  {
    id: '6',
    username: 'music_lover',
    avatarUrl: 'https://i.pravatar.cc/150?img=6',
    xp: 7200,
    coins: 1300,
    challenges: 28,
    city: 'London',
    team: 'Music Club',
    challengeType: 'Music',
    level: 24,
    badges: ['Top 20%', 'Melody Master'],
  },
  {
    id: '7',
    username: 'cooking_with_joy',
    avatarUrl: 'https://i.pravatar.cc/150?img=7',
    xp: 6800,
    coins: 890,
    challenges: 22,
    city: 'Rome',
    team: 'Foodies',
    challengeType: 'Food',
    level: 23,
    badges: ['Top 30%', 'Chef Star'],
  },
  {
    id: '8',
    username: 'tech_guru',
    avatarUrl: 'https://i.pravatar.cc/150?img=8',
    xp: 6200,
    coins: 1500,
    challenges: 20,
    city: 'San Francisco',
    team: 'Tech Squad',
    challengeType: 'Tutorial',
    level: 21,
    badges: ['Top 30%', 'Code Master'],
  },
  {
    id: '9',
    username: 'art_lover',
    avatarUrl: 'https://i.pravatar.cc/150?img=9',
    xp: 5800,
    coins: 760,
    challenges: 19,
    city: 'Vienna',
    team: 'Art Club',
    challengeType: 'Art',
    level: 19,
    badges: ['Top 40%', 'Creative Mind'],
  },
  {
    id: '10',
    username: 'pet_whisperer',
    avatarUrl: 'https://i.pravatar.cc/150?img=10',
    xp: 5400,
    coins: 650,
    challenges: 18,
    city: 'Sydney',
    team: 'Pet Lovers',
    challengeType: 'Lifestyle',
    level: 18,
    badges: ['Top 40%', 'Animal Friend'],
  },
];

// Mock badge data
const badgeSystem = [
  { name: 'Top 3%', xp_required: 10000, icon_url: '🏆' },
  { name: 'Top 10%', xp_required: 8000, icon_url: '🥇' },
  { name: 'Top 20%', xp_required: 6000, icon_url: '🥈' },
  { name: 'Top 30%', xp_required: 4000, icon_url: '🥉' },
  { name: 'Top 40%', xp_required: 2000, icon_url: '🎖️' },
  { name: 'Challenge Master', xp_required: 0, challenges_required: 40, icon_url: '⭐' },
  { name: 'Style Icon', xp_required: 0, challenge_type: 'Lifestyle', challenges_required: 20, icon_url: '👔' },
  { name: 'Laugh Master', xp_required: 0, challenge_type: 'Comedy', challenges_required: 20, icon_url: '😂' },
  { name: 'Workout King', xp_required: 0, challenge_type: 'Fitness', challenges_required: 20, icon_url: '💪' },
  { name: 'Explorer', xp_required: 0, challenge_type: 'Travel', challenges_required: 15, icon_url: '🧭' },
  { name: 'Melody Master', xp_required: 0, challenge_type: 'Music', challenges_required: 15, icon_url: '🎵' },
  { name: 'Chef Star', xp_required: 0, challenge_type: 'Food', challenges_required: 15, icon_url: '👨‍🍳' },
  { name: 'Code Master', xp_required: 0, challenge_type: 'Tutorial', challenges_required: 15, icon_url: '💻' },
  { name: 'Creative Mind', xp_required: 0, challenge_type: 'Art', challenges_required: 15, icon_url: '🎨' },
  { name: 'Animal Friend', xp_required: 0, challenge_type: 'Pets', challenges_required: 15, icon_url: '🐾' },
  { name: 'Early Adopter', xp_required: 0, special: 'early_user', icon_url: '🔥' },
];

const LeaderboardPage = () => {
  const {
    activeTab,
    setActiveTab,
    sortBy,
    setSortBy,
    users,
    isLoading,
    badgeSystem: badges
  } = useLeaderboard(mockUsers, badgeSystem);

  const cityFilters = ['Berlin', 'New York', 'London', 'Tokyo', 'Paris', '+ Add Your City'];
  const challengeFilters = ['Dance', 'Comedy', 'Lifestyle', 'Fitness', 'Tutorial', 'Food'];
  const teamFilters = ['Dance Crew', 'Comedy Club', 'Fitness Heroes', '+ Create Team'];

  return (
    <div className="container py-8">
      <LeaderboardHeader sortBy={sortBy} setSortBy={setSortBy} />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
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
        </div>
        
        <div className="md:col-span-1">
          <BadgeSystem badges={badges} />
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
