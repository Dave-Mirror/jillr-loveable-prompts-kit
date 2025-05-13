
import React from 'react';
import { X, Medal, Trophy, Users, Map } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from '@/components/ui/progress';
import { ChallengeCategory, LocationFilter } from '@/pages/ChallengeExplorer';

interface LeaderboardOverlayProps {
  onClose: () => void;
  categoryFilter: ChallengeCategory;
  locationFilter: LocationFilter;
}

// Mock leaderboard data
const mockLeaderboard = [
  {
    id: 'user1',
    name: 'XPMaster',
    avatar: '/assets/avatars/user1.jpg',
    xp: 12450,
    level: 42,
    position: { lat: 48.1370, lng: 11.5730 }
  },
  {
    id: 'user2',
    name: 'ChallengeKing',
    avatar: '/assets/avatars/user2.jpg',
    xp: 10850,
    level: 38,
    position: { lat: 48.1390, lng: 11.5750 }
  },
  {
    id: 'user3',
    name: 'JillrQueen',
    avatar: '/assets/avatars/user3.jpg',
    xp: 9760,
    level: 35,
    position: { lat: 48.1350, lng: 11.5770 }
  },
  {
    id: 'user4',
    name: 'VideoGuru',
    avatar: '/assets/avatars/user4.jpg',
    xp: 8320,
    level: 31,
    position: { lat: 48.1380, lng: 11.5760 }
  },
  {
    id: 'user5',
    name: 'FitnessFreak',
    avatar: '/assets/avatars/user5.jpg',
    xp: 7980,
    level: 29,
    position: { lat: 48.1340, lng: 11.5740 }
  }
];

// Mock team data
const mockTeams = [
  {
    id: 'team1',
    name: 'Munich Masters',
    avatar: '/assets/teams/team1.jpg',
    xp: 45720,
    members: 12,
    position: { lat: 48.1370, lng: 11.5730 }
  },
  {
    id: 'team2',
    name: 'Challenge Chasers',
    avatar: '/assets/teams/team2.jpg',
    xp: 38450,
    members: 8,
    position: { lat: 48.1350, lng: 11.5720 }
  },
  {
    id: 'team3',
    name: 'Jillr Titans',
    avatar: '/assets/teams/team3.jpg',
    xp: 33210,
    members: 10,
    position: { lat: 48.1390, lng: 11.5760 }
  }
];

const LeaderboardOverlay: React.FC<LeaderboardOverlayProps> = ({
  onClose,
  categoryFilter,
  locationFilter
}) => {
  return (
    <div className="fixed inset-0 bg-jillr-dark/80 backdrop-blur-md z-20 flex items-center justify-center p-4">
      <div className="bg-jillr-dark border border-jillr-border rounded-xl shadow-neon max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-jillr-border flex justify-between items-center">
          <h2 className="text-lg font-bold text-white flex items-center">
            <Trophy className="h-5 w-5 text-jillr-neonPurple mr-2" />
            Leaderboard
            {categoryFilter !== 'all' && (
              <span className="text-sm ml-2 text-white/70">
                • {categoryFilter} challenges
              </span>
            )}
            {locationFilter !== 'global' && (
              <span className="text-sm ml-2 text-white/70">
                • {locationFilter === 'current' ? 'Near Me' : 'City'}
              </span>
            )}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Tabs defaultValue="individual" className="flex-1 flex flex-col">
          <div className="px-4 pt-2">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="individual">
                <Medal className="h-4 w-4 mr-2" />
                Individual
              </TabsTrigger>
              <TabsTrigger value="team">
                <Users className="h-4 w-4 mr-2" />
                Teams
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="individual" className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Top 3 podium */}
              <div className="flex items-end justify-center gap-2 h-36 mb-6">
                {/* 2nd place */}
                <div className="flex flex-col items-center">
                  <Avatar className="h-16 w-16 border-2 border-white">
                    <AvatarImage src={mockLeaderboard[1]?.avatar} />
                    <AvatarFallback>2</AvatarFallback>
                  </Avatar>
                  <div className="bg-gradient-to-t from-white to-gray-300 h-20 w-16 flex flex-col items-center justify-end rounded-t-lg pb-1">
                    <span className="text-sm font-bold text-jillr-dark">{mockLeaderboard[1]?.name}</span>
                    <span className="text-xs font-medium text-jillr-dark/70">{mockLeaderboard[1]?.xp} XP</span>
                  </div>
                </div>

                {/* 1st place */}
                <div className="flex flex-col items-center">
                  <Avatar className="h-20 w-20 border-3 border-yellow-400">
                    <AvatarImage src={mockLeaderboard[0]?.avatar} />
                    <AvatarFallback>1</AvatarFallback>
                  </Avatar>
                  <div className="bg-gradient-to-t from-yellow-500 to-yellow-300 h-28 w-20 flex flex-col items-center justify-end rounded-t-lg pb-1">
                    <span className="text-lg font-bold text-jillr-dark">{mockLeaderboard[0]?.name}</span>
                    <span className="text-sm font-medium text-jillr-dark/70">{mockLeaderboard[0]?.xp} XP</span>
                  </div>
                </div>

                {/* 3rd place */}
                <div className="flex flex-col items-center">
                  <Avatar className="h-14 w-14 border-2 border-orange-700">
                    <AvatarImage src={mockLeaderboard[2]?.avatar} />
                    <AvatarFallback>3</AvatarFallback>
                  </Avatar>
                  <div className="bg-gradient-to-t from-orange-700 to-orange-500 h-16 w-14 flex flex-col items-center justify-end rounded-t-lg pb-1">
                    <span className="text-xs font-bold text-white">{mockLeaderboard[2]?.name}</span>
                    <span className="text-xs font-medium text-white/70">{mockLeaderboard[2]?.xp} XP</span>
                  </div>
                </div>
              </div>

              {/* Leaderboard list */}
              <div className="space-y-2">
                {mockLeaderboard.map((user, index) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-3 bg-jillr-darkAccent/30 hover:bg-jillr-darkAccent/50 rounded-lg transition-colors"
                  >
                    <div className="text-sm font-bold text-white w-4">
                      {index + 1}.
                    </div>
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-jillr-neonPurple/20">
                        {user.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-white">{user.name}</span>
                        <span className="text-xs font-bold text-jillr-neonPurple">{user.xp} XP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <Progress value={80} className="h-1" />
                        </div>
                        <span className="text-xs text-white/70">Lv.{user.level}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Map className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="team" className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Team rankings */}
              <div className="space-y-2">
                {mockTeams.map((team, index) => (
                  <div
                    key={team.id}
                    className="flex items-center gap-3 p-3 bg-jillr-darkAccent/30 hover:bg-jillr-darkAccent/50 rounded-lg transition-colors"
                  >
                    <div className="text-sm font-bold text-white w-4">
                      {index + 1}.
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={team.avatar} />
                      <AvatarFallback className="bg-jillr-neonPurple/20">
                        {team.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-white">{team.name}</span>
                        <span className="text-xs font-bold text-jillr-neonPurple">{team.xp} XP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <Progress value={(index + 1) * 20} className="h-1" />
                        </div>
                        <span className="text-xs text-white/70">{team.members} Members</span>
                      </div>
                    </div>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Map className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="p-4 border-t border-jillr-border">
          <Button variant="outline" className="w-full" onClick={onClose}>
            Close Leaderboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardOverlay;
