import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Award, 
  Globe, 
  MapPin, 
  Trophy, 
  Users, 
  Zap, 
  Coins, 
  Video,
  Filter,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';

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
  const [activeTab, setActiveTab] = useState('global');
  const [sortBy, setSortBy] = useState('xp');
  const [users, setUsers] = useState(mockUsers);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch data from Supabase here
        // For now, we'll just simulate a delay and use our mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let sortedUsers = [...mockUsers];
        if (sortBy === 'xp') {
          sortedUsers.sort((a, b) => b.xp - a.xp);
        } else if (sortBy === 'coins') {
          sortedUsers.sort((a, b) => b.coins - a.coins);
        } else if (sortBy === 'challenges') {
          sortedUsers.sort((a, b) => b.challenges - a.challenges);
        }
        
        if (activeTab === 'city') {
          // Filter by city (simplified for demo, in a real app this would be dynamic)
          sortedUsers = sortedUsers.filter(user => ['Berlin', 'New York', 'London'].includes(user.city));
        } else if (activeTab === 'challenge-type') {
          // Filter by challenge type (simplified for demo)
          sortedUsers = sortedUsers.filter(user => ['Dance', 'Lifestyle', 'Comedy'].includes(user.challengeType));
        } else if (activeTab === 'team') {
          // Filter by team (simplified for demo)
          sortedUsers = sortedUsers.filter(user => ['Dance Crew', 'Comedy Club', 'Fitness Heroes'].includes(user.team));
        }
        
        setUsers(sortedUsers);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        toast({
          title: "Error",
          description: "Fehler beim Laden des Leaderboards.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLeaderboardData();
  }, [activeTab, sortBy, toast]);

  const renderTopUsers = () => {
    if (users.length === 0) {
      return (
        <div className="text-center py-8">
          <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No users found</h3>
          <p className="text-muted-foreground">Try changing your filters</p>
        </div>
      );
    }
    
    // Get top 3 users for the podium display
    const topThree = users.slice(0, 3);
    
    return (
      <div className="mb-8">
        <div className="flex justify-center items-end gap-4 h-44 mb-8">
          {/* Second Place */}
          <div className="flex flex-col items-center">
            <Avatar className="h-16 w-16 border-2 border-jillr-neonGreen">
              <AvatarImage src={topThree[1]?.avatarUrl} />
              <AvatarFallback>{topThree[1]?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="bg-jillr-neonGreen/20 border border-jillr-neonGreen/30 h-28 w-20 flex items-center justify-center rounded-t-lg mt-2">
              <div className="text-xl font-bold">2</div>
            </div>
            <div className="mt-2 text-center">
              <div className="font-medium">{topThree[1]?.username}</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Zap className="h-3 w-3" /> {topThree[1]?.xp.toLocaleString()}
              </div>
            </div>
          </div>
          
          {/* First Place */}
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-gradient-to-b from-jillr-neonPurple to-transparent p-1">
              <Avatar className="h-20 w-20 border-2 border-jillr-neonPurple">
                <AvatarImage src={topThree[0]?.avatarUrl} />
                <AvatarFallback>{topThree[0]?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            <div className="bg-jillr-neonPurple/20 border border-jillr-neonPurple/30 h-36 w-24 flex items-center justify-center rounded-t-lg mt-2">
              <Trophy className="h-8 w-8 text-jillr-neonPurple" />
            </div>
            <div className="mt-2 text-center">
              <div className="font-bold">{topThree[0]?.username}</div>
              <div className="text-sm flex items-center justify-center gap-1">
                <Zap className="h-3 w-3 text-jillr-neonPurple" /> {topThree[0]?.xp.toLocaleString()}
              </div>
              <div className="flex gap-1 mt-1 justify-center">
                {topThree[0]?.badges.slice(0, 2).map((badge, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs py-0">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Third Place */}
          <div className="flex flex-col items-center">
            <Avatar className="h-16 w-16 border-2 border-jillr-neonPink">
              <AvatarImage src={topThree[2]?.avatarUrl} />
              <AvatarFallback>{topThree[2]?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="bg-jillr-neonPink/20 border border-jillr-neonPink/30 h-20 w-20 flex items-center justify-center rounded-t-lg mt-2">
              <div className="text-xl font-bold">3</div>
            </div>
            <div className="mt-2 text-center">
              <div className="font-medium">{topThree[2]?.username}</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Zap className="h-3 w-3" /> {topThree[2]?.xp.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">See who's at the top of the jillr community</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <CardTitle className="text-xl mb-4 md:mb-0">User Rankings</CardTitle>
                <div className="flex gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Sort By: {sortBy === 'xp' ? 'XP' : sortBy === 'coins' ? 'Coins' : 'Challenges'}
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setSortBy('xp')}>
                        <Zap className="h-4 w-4 mr-2" /> XP Points
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy('coins')}>
                        <Coins className="h-4 w-4 mr-2" /> Coins
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy('challenges')}>
                        <Video className="h-4 w-4 mr-2" /> Challenge Count
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
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
              </Tabs>
            </CardHeader>
            
            <CardContent className="pt-6">
              <TabsContent value="global" className="mt-0">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-4 border-t-jillr-neonPurple rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <>
                    {renderTopUsers()}
                    
                    <div className="space-y-4">
                      {users.slice(3).map((user, index) => (
                        <div key={user.id} className="flex items-center gap-4 p-3 rounded-lg border border-border">
                          <div className="text-xl font-bold w-6 text-center">{index + 4}</div>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">{user.username}</div>
                            <div className="text-xs text-muted-foreground">{user.city}</div>
                          </div>
                          <div className="flex gap-6">
                            <div className="flex flex-col items-center">
                              <div className="text-xs text-muted-foreground">XP</div>
                              <div className="font-medium">{user.xp.toLocaleString()}</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="text-xs text-muted-foreground">Coins</div>
                              <div className="font-medium">{user.coins.toLocaleString()}</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="text-xs text-muted-foreground">Challenges</div>
                              <div className="font-medium">{user.challenges}</div>
                            </div>
                            <div className="hidden md:flex items-center gap-1">
                              {user.badges.slice(0, 1).map((badge, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {badge}
                                </Badge>
                              ))}
                              {user.badges.length > 1 && (
                                <span className="text-xs text-muted-foreground">+{user.badges.length - 1}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="city" className="mt-0">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-4 border-t-jillr-neonPurple rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 p-4 bg-muted rounded-lg">
                      <h3 className="font-medium mb-2">Featured Cities</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="cursor-pointer">Berlin</Badge>
                        <Badge variant="outline" className="cursor-pointer">New York</Badge>
                        <Badge variant="outline" className="cursor-pointer">London</Badge>
                        <Badge variant="outline" className="cursor-pointer">Tokyo</Badge>
                        <Badge variant="outline" className="cursor-pointer">Paris</Badge>
                        <Badge variant="outline" className="cursor-pointer">+ Add Your City</Badge>
                      </div>
                    </div>
                    
                    {renderTopUsers()}
                    
                    <div className="space-y-4">
                      {users.slice(3).map((user, index) => (
                        <div key={user.id} className="flex items-center gap-4 p-3 rounded-lg border border-border">
                          <div className="text-xl font-bold w-6 text-center">{index + 4}</div>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">{user.username}</div>
                            <div className="text-xs flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {user.city}
                            </div>
                          </div>
                          <div className="flex gap-6">
                            <div className="flex flex-col items-center">
                              <div className="text-xs text-muted-foreground">XP</div>
                              <div className="font-medium">{user.xp.toLocaleString()}</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="text-xs text-muted-foreground">Challenges</div>
                              <div className="font-medium">{user.challenges}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="challenge-type" className="mt-0">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-4 border-t-jillr-neonPurple rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 p-4 bg-muted rounded-lg">
                      <h3 className="font-medium mb-2">Challenge Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="cursor-pointer">Dance</Badge>
                        <Badge variant="outline" className="cursor-pointer">Comedy</Badge>
                        <Badge variant="outline" className="cursor-pointer">Lifestyle</Badge>
                        <Badge variant="outline" className="cursor-pointer">Fitness</Badge>
                        <Badge variant="outline" className="cursor-pointer">Tutorial</Badge>
                        <Badge variant="outline" className="cursor-pointer">Food</Badge>
                      </div>
                    </div>
                    
                    {renderTopUsers()}
                    
                    <div className="space-y-4">
                      {users.slice(3).map((user, index) => (
                        <div key={user.id} className="flex items-center gap-4 p-3 rounded-lg border border-border">
                          <div className="text-xl font-bold w-6 text-center">{index + 4}</div>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">{user.username}</div>
                            <div className="text-xs text-muted-foreground">{user.challengeType}</div>
                          </div>
                          <div className="flex gap-6">
                            <div className="flex flex-col items-center">
                              <div className="text-xs text-muted-foreground">XP</div>
                              <div className="font-medium">{user.xp.toLocaleString()}</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="text-xs text-muted-foreground">Challenges</div>
                              <div className="font-medium">{user.challenges}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="team" className="mt-0">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-4 border-t-jillr-neonPurple rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 p-4 bg-muted rounded-lg">
                      <h3 className="font-medium mb-2">Teams</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="cursor-pointer">Dance Crew</Badge>
                        <Badge variant="outline" className="cursor-pointer">Comedy Club</Badge>
                        <Badge variant="outline" className="cursor-pointer">Fitness Heroes</Badge>
                        <Badge variant="outline" className="cursor-pointer">+ Create Team</Badge>
                      </div>
                    </div>
                    
                    {renderTopUsers()}
                    
                    <div className="space-y-4">
                      {users.slice(3).map((user, index) => (
                        <div key={user.id} className="flex items-center gap-4 p-3 rounded-lg border border-border">
                          <div className="text-xl font-bold w-6 text-center">{index + 4}</div>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">{user.username}</div>
                            <div className="text-xs flex items-center gap-1">
                              <Users className="h-3 w-3" /> {user.team}
                            </div>
                          </div>
                          <div className="flex gap-6">
                            <div className="flex flex-col items-center">
                              <div className="text-xs text-muted-foreground">XP</div>
                              <div className="font-medium">{user.xp.toLocaleString()}</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="text-xs text-muted-foreground">Challenges</div>
                              <div className="font-medium">{user.challenges}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-jillr-neonPurple" />
                Badge System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-medium">Achievement Badges</h3>
                <div className="space-y-2">
                  {badgeSystem.slice(0, 8).map((badge, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg border border-border">
                      <div className="text-xl">{badge.icon_url}</div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{badge.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {badge.xp_required > 0 
                            ? `${badge.xp_required.toLocaleString()} XP required` 
                            : badge.challenges_required 
                              ? `${badge.challenges_required} ${badge.challenge_type || ''} challenges`
                              : 'Special achievement'
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" size="sm" className="w-full text-xs">
                  View All Badges
                </Button>
                
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Your next badge</h4>
                  <div className="flex items-center gap-3">
                    <div className="text-xl">🥈</div>
                    <div>
                      <div className="text-sm font-medium">Top 20%</div>
                      <div className="text-xs text-muted-foreground">4,200 / 6,000 XP</div>
                      <div className="w-full bg-background rounded-full h-1.5 mt-1">
                        <div className="bg-jillr-neonPurple h-1.5 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
