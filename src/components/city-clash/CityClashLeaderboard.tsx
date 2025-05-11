
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Users, MapPin, Medal } from 'lucide-react';
import { LeaderboardEntry, CityTeam } from '@/hooks/useCityClashData';

interface CityClashLeaderboardProps {
  leaderboard: LeaderboardEntry[];
  teams: CityTeam[];
}

const getRankBadge = (rank: number) => {
  switch (rank) {
    case 1:
      return <Badge className="bg-yellow-500/90">🏆 1</Badge>;
    case 2:
      return <Badge className="bg-gray-400/90">🥈 2</Badge>;
    case 3:
      return <Badge className="bg-amber-700/90">🥉 3</Badge>;
    default:
      return <Badge variant="outline">{rank}</Badge>;
  }
};

const CityClashLeaderboard: React.FC<CityClashLeaderboardProps> = ({ leaderboard, teams }) => {
  const [activeTab, setActiveTab] = useState('players');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-5 w-5 text-yellow-400" />
        <h2 className="text-xl font-semibold">City Clash Leaderboard</h2>
      </div>
      
      <Tabs defaultValue="players" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="players" className="data-[state=active]:bg-jillr-neonPurple/20">
            <Users className="h-4 w-4 mr-2" /> Spieler
          </TabsTrigger>
          <TabsTrigger value="teams" className="data-[state=active]:bg-jillr-neonPurple/20">
            <MapPin className="h-4 w-4 mr-2" /> Teams
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="players">
          <Card className="bg-jillr-dark border border-jillr-border">
            <CardContent className="p-0">
              <div className="divide-y divide-gray-800">
                {leaderboard.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 text-center">
                        {getRankBadge(entry.rank)}
                      </div>
                      
                      <Avatar className="h-10 w-10 border border-gray-700">
                        <AvatarImage src={entry.avatar} alt={entry.name} />
                        <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="font-medium">{entry.name}</div>
                        {entry.teamName && (
                          <div className="text-xs text-gray-400">Team: {entry.teamName}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="font-bold text-jillr-neonPurple">{entry.points} Punkte</div>
                      <div className="text-xs text-gray-400">{entry.controlledDistricts} Distrikte</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teams">
          <Card className="bg-jillr-dark border border-jillr-border">
            <CardContent className="p-0">
              <div className="divide-y divide-gray-800">
                {teams.sort((a, b) => b.points - a.points).map((team, index) => (
                  <div key={team.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 text-center">
                        {getRankBadge(index + 1)}
                      </div>
                      
                      <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: team.color }}>
                        {team.logo ? (
                          <img src={team.logo} alt={team.name} className="h-8 w-8 rounded-full" />
                        ) : (
                          <span className="text-white font-bold">{team.name.charAt(0)}</span>
                        )}
                      </div>
                      
                      <div>
                        <div className="font-medium">{team.name}</div>
                        <div className="text-xs text-gray-400">{team.members} Mitglieder</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="font-bold text-jillr-neonPurple">{team.points} Punkte</div>
                      <div className="text-xs text-gray-400">{team.controlledDistricts} Distrikte</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="text-center mt-8 p-4 border border-jillr-neonPurple/30 rounded-lg bg-jillr-neonPurple/10">
        <Medal className="h-10 w-10 text-jillr-neonPurple mx-auto mb-2" />
        <h3 className="text-lg font-semibold mb-1">Saisonale Rewards</h3>
        <p className="text-sm text-gray-400 mb-2">
          Die City Clash Saison endet in 14 Tagen. Sichere dir deinen Platz auf dem Leaderboard!
        </p>
        <div className="text-xs text-gray-300">
          1. Platz: 5000 XP + Limited Edition City Clash Trophy NFT<br />
          2. Platz: 2500 XP + Exklusive Sneaker Drop<br />
          3. Platz: 1000 XP + VIP Club Access für 3 Monate
        </div>
      </div>
    </div>
  );
};

export default CityClashLeaderboard;
