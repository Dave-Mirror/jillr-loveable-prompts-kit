import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Video, Map, Trophy, Wallet, Zap, ShoppingBag, ChevronRight, Flame, TrendingUp, Clock, Award, User, Coins } from 'lucide-react';

const Dashboard = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('for-you');

  const mockChallenges = [
    {
      id: '1',
      title: 'Dance Challenge 2023',
      description: 'Show off your best dance moves for a chance to win big!',
      type: 'Dance',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800',
      rewards: '500 XP',
      participants: 1243
    },
    {
      id: '2',
      title: 'Urban Photography',
      description: 'Capture the essence of city life through your lens',
      type: 'Photo & Video',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800',
      rewards: '300 XP',
      participants: 892
    },
    {
      id: '3',
      title: 'Fitness Transformation',
      description: 'Document your 30-day fitness journey',
      type: 'Fitness',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800',
      rewards: '750 XP',
      participants: 456
    },
    {
      id: '4',
      title: 'Food Art Creation',
      description: 'Turn your meals into masterpieces',
      type: 'Food',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800',
      rewards: '250 XP',
      participants: 723
    }
  ];

  const featuredChallenge = mockChallenges[0];

  return (
    <div className="pt-16">
      <div className="relative h-[60vh] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${featuredChallenge.image})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-jillr-dark via-jillr-dark/80 to-transparent" />
        </div>
        
        <div className="container relative z-10 h-full flex flex-col justify-end pb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-jillr-neonPurple/80 text-white text-xs px-2 py-1 rounded">FEATURED</span>
            <span className="bg-white/20 text-white text-xs px-2 py-1 rounded flex items-center">
              <Flame className="h-3 w-3 mr-1 text-jillr-neonPink" /> TRENDING
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{featuredChallenge.title}</h1>
          <p className="text-lg max-w-2xl mb-6 text-gray-300">{featuredChallenge.description}</p>
          <div className="flex space-x-4">
            <Link to={`/challenge/${featuredChallenge.id}`}>
              <Button className="neon-button flex items-center">
                Join Challenge <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
              Details
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPurple/20 border-jillr-neonPurple/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Zap className="text-jillr-neonPurple" />
                Active Challenges
              </CardTitle>
              <CardDescription>Challenges you're participating in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-4xl">{userProfile?.active_challenges || 0}</div>
              <Button asChild variant="link" className="p-0 h-auto">
                <Link to="/explore" className="flex items-center text-jillr-neonPurple">
                  Find more challenges <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonGreen/20 border-jillr-neonGreen/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Award className="text-jillr-neonGreen" />
                XP Level
              </CardTitle>
              <CardDescription>Your current experience level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-4xl">{userProfile?.level || 1}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {userProfile?.xp || 0} XP total
              </div>
              <div className="w-full bg-jillr-dark/60 h-1 mt-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-jillr-neonPurple to-jillr-neonGreen h-full rounded-full" 
                  style={{ width: `${(userProfile?.xp || 0) % 1000 / 10}%` }}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPink/20 border-jillr-neonPink/20">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Coins className="text-jillr-neonPink" />
                Jillr Coins
              </CardTitle>
              <CardDescription>Your rewards balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-4xl">{userProfile?.coins || 0}</div>
              <Button asChild variant="link" className="p-0 h-auto">
                <Link to="/wallet" className="flex items-center text-jillr-neonPink">
                  View wallet <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="w-full justify-start overflow-x-auto no-scrollbar border-b border-white/10 bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="for-you" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-jillr-neonPurple data-[state=active]:bg-transparent rounded-none px-5 py-3 data-[state=active]:text-jillr-neonPurple"
            >
              For You
            </TabsTrigger>
            <TabsTrigger 
              value="trending" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-jillr-neonPurple data-[state=active]:bg-transparent rounded-none px-5 py-3 data-[state=active]:text-jillr-neonPurple"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger 
              value="new" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-jillr-neonPurple data-[state=active]:bg-transparent rounded-none px-5 py-3 data-[state=active]:text-jillr-neonPurple"
            >
              <Clock className="h-4 w-4 mr-2" />
              New
            </TabsTrigger>
            <TabsTrigger 
              value="featured" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-jillr-neonPurple data-[state=active]:bg-transparent rounded-none px-5 py-3 data-[state=active]:text-jillr-neonPurple"
            >
              <Award className="h-4 w-4 mr-2" />
              Featured
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="for-you" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Recommended For You</h2>
                <Button variant="ghost" className="flex items-center gap-1">
                  See all <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockChallenges.map(challenge => (
                  <Link key={challenge.id} to={`/challenge/${challenge.id}`}>
                    <Card className="neon-card overflow-hidden h-full cursor-pointer transform transition-all hover:scale-[1.02]">
                      <div className="relative">
                        <img 
                          src={challenge.image} 
                          alt={challenge.title} 
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="bg-jillr-neonPurple/80 text-white text-xs px-2 py-0.5 rounded-sm">
                              {challenge.type}
                            </span>
                            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-sm">
                              {challenge.rewards}
                            </span>
                          </div>
                          <h3 className="font-bold text-white">{challenge.title}</h3>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <p className="text-sm text-muted-foreground line-clamp-2">{challenge.description}</p>
                        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <User className="h-3 w-3 mr-1" /> {challenge.participants} participants
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trending" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Hot Trends</CardTitle>
                  <CardDescription>See what's trending now</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link to="/explore">
                      Browse Trending Challenges
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>New Arrivals</CardTitle>
                  <CardDescription>The newest challenges on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link to="/explore">
                      Browse New Challenges
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="featured" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Featured Content</CardTitle>
                  <CardDescription>Handpicked challenges by our team</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link to="/explore">
                      Browse Featured Challenges
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button asChild variant="outline" className="h-auto py-6 flex flex-col items-center bg-white/5 border-white/10 hover:bg-white/10">
            <Link to="/livemap">
              <Map className="h-8 w-8 mb-2 text-jillr-neonBlue" />
              <span>Live Map</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-auto py-6 flex flex-col items-center bg-white/5 border-white/10 hover:bg-white/10">
            <Link to="/leaderboard">
              <Trophy className="h-8 w-8 mb-2 text-jillr-neonGreen" />
              <span>Leaderboard</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-auto py-6 flex flex-col items-center bg-white/5 border-white/10 hover:bg-white/10">
            <Link to="/wallet">
              <Wallet className="h-8 w-8 mb-2 text-jillr-neonPurple" />
              <span>Wallet</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-auto py-6 flex flex-col items-center bg-white/5 border-white/10 hover:bg-white/10">
            <Link to="/shop">
              <ShoppingBag className="h-8 w-8 mb-2 text-jillr-neonPink" />
              <span>Shop</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
