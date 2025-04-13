
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Video, Map, Trophy, Wallet, Zap, ShoppingBag } from 'lucide-react';

const Dashboard = () => {
  const { userProfile } = useAuth();

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome to Jillr</h1>
          <p className="text-muted-foreground">Your creative challenges platform</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button asChild variant="outline">
            <Link to="/explore">
              <Zap className="mr-2 h-4 w-4" />
              Explore Challenges
            </Link>
          </Button>
          <Button asChild>
            <Link to="/creator-dashboard">
              <Video className="mr-2 h-4 w-4" />
              Creator Studio
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="neon-card">
          <CardHeader className="pb-2">
            <CardTitle>Active Challenges</CardTitle>
            <CardDescription>Challenges you're participating in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-3xl">{userProfile?.active_challenges || 0}</div>
            <Button asChild variant="link" className="p-0 h-auto">
              <Link to="/explore">Find more challenges</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="neon-card">
          <CardHeader className="pb-2">
            <CardTitle>XP Level</CardTitle>
            <CardDescription>Your current experience level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-3xl">{userProfile?.level || 1}</div>
            <div className="text-sm text-muted-foreground">
              {userProfile?.xp || 0} XP total
            </div>
          </CardContent>
        </Card>
        
        <Card className="neon-card">
          <CardHeader className="pb-2">
            <CardTitle>Jillr Coins</CardTitle>
            <CardDescription>Your rewards balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-3xl">{userProfile?.coins || 0}</div>
            <Button asChild variant="link" className="p-0 h-auto">
              <Link to="/wallet">View wallet</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="featured" className="mb-8">
        <TabsList>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="for-you">For You</TabsTrigger>
        </TabsList>
        
        <TabsContent value="featured" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Challenge cards would be loaded here */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>No featured challenges yet</CardTitle>
                <CardDescription>Check back soon or explore other tabs</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link to="/explore">
                    Browse Challenges
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Other tab contents would be similar */}
        <TabsContent value="trending" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>No trending challenges yet</CardTitle>
                <CardDescription>Check back soon or explore other tabs</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link to="/explore">
                    Browse Challenges
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="new" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>No new challenges yet</CardTitle>
                <CardDescription>Check back soon or explore other tabs</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link to="/explore">
                    Browse Challenges
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="for-you" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Personalized challenges coming soon</CardTitle>
                <CardDescription>Complete your profile to get personalized recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link to="/explore">
                    Browse Challenges
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button asChild variant="outline" className="h-auto py-6 flex flex-col items-center">
          <Link to="/livemap">
            <Map className="h-8 w-8 mb-2" />
            <span>Live Map</span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="h-auto py-6 flex flex-col items-center">
          <Link to="/leaderboard">
            <Trophy className="h-8 w-8 mb-2" />
            <span>Leaderboard</span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="h-auto py-6 flex flex-col items-center">
          <Link to="/wallet">
            <Wallet className="h-8 w-8 mb-2" />
            <span>Wallet</span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="h-auto py-6 flex flex-col items-center">
          <Link to="/shop">
            <ShoppingBag className="h-8 w-8 mb-2" />
            <span>Shop</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
