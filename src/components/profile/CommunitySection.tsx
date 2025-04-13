
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, Trophy, Bell, MessageSquare, UserPlus, BarChart2, ExternalLink } from 'lucide-react';

interface CommunitySectionProps {
  userProfile: any;
}

const CommunitySection: React.FC<CommunitySectionProps> = ({ userProfile }) => {
  // Mock data for followers/following
  const followData = {
    followers: 158,
    following: 86
  };
  
  // Mock data for notifications
  const notifications = [
    {
      id: '1',
      type: 'mention',
      user: {
        name: 'Sarah94',
        avatar: 'https://placehold.co/100x100/7E69AB/FFFFFF/png?text=S'
      },
      message: 'mentioned you in a comment',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      type: 'challenge',
      message: 'Your submission was featured!',
      challengeName: 'Summer Dance',
      time: '1 day ago',
      read: true
    }
  ];
  
  // Mock data for teams/clans
  const teams = [
    {
      id: '1',
      name: 'Dance Crew',
      members: 12,
      avatar: 'https://placehold.co/100x100/9b87f5/FFFFFF/png?text=DC',
      role: 'Admin'
    },
    {
      id: '2',
      name: 'Street Fashionistas',
      members: 28,
      avatar: 'https://placehold.co/100x100/6E59A5/FFFFFF/png?text=SF',
      role: 'Member'
    }
  ];
  
  // Mock data for leaderboard position
  const leaderboardPosition = {
    global: 1248,
    weekly: 523,
    category: {
      name: 'Dance',
      position: 68
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Community Connections</CardTitle>
            <CardDescription>
              Your network on Jillr
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-around py-4 border-b border-jillr-darkBlue/50 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{followData.followers}</div>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{followData.following}</div>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-2">Your Teams</h3>
              {teams.map(team => (
                <div 
                  key={team.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-jillr-darkBlue/20 border border-jillr-darkBlue/20"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={team.avatar} alt={team.name} />
                      <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{team.name}</h4>
                      <p className="text-xs text-muted-foreground">{team.members} members</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{team.role}</Badge>
                    <Button size="sm">View</Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-4 flex gap-2 items-center justify-center">
                <Users size={16} />
                Find More Teams
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Recent interactions and mentions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg flex gap-3 items-start ${
                      notification.read 
                        ? 'bg-jillr-darkBlue/10' 
                        : 'bg-jillr-neonPurple/10 border border-jillr-neonPurple/20'
                    }`}
                  >
                    {notification.type === 'mention' && (
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage src={notification.user.avatar} />
                        <AvatarFallback>{notification.user.name.substring(0, 1)}</AvatarFallback>
                      </Avatar>
                    )}
                    
                    {notification.type === 'challenge' && (
                      <div className="h-8 w-8 flex-shrink-0 rounded-full bg-jillr-neonPink/20 flex items-center justify-center">
                        <Trophy size={16} className="text-jillr-neonPink" />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          {notification.type === 'mention' && (
                            <p className="text-sm">
                              <span className="font-medium">{notification.user.name}</span> {notification.message}
                            </p>
                          )}
                          
                          {notification.type === 'challenge' && (
                            <p className="text-sm">
                              <span className="font-medium">{notification.message}</span>
                            </p>
                          )}
                          
                          {notification.type === 'challenge' && (
                            <p className="text-xs text-muted-foreground">
                              Challenge: {notification.challengeName}
                            </p>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {notification.time}
                        </span>
                      </div>
                      
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                          View
                        </Button>
                        
                        {notification.type === 'mention' && (
                          <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                            Reply
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-jillr-neonPurple flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <Bell className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">No Notifications</h3>
                  <p className="text-muted-foreground mb-4">
                    You'll see mentions, comments, and challenge updates here.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Notifications
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card className="border-jillr-neonPurple/20 bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPurple/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Leaderboard Ranking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Global Rank</span>
                <span className="text-xl font-bold">#{leaderboardPosition.global}</span>
              </div>
              <div className="h-1.5 w-full bg-jillr-darkBlue/30 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPink rounded-full" style={{ width: '30%' }} />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Weekly Rank</span>
                <span className="text-xl font-bold">#{leaderboardPosition.weekly}</span>
              </div>
              <div className="h-1.5 w-full bg-jillr-darkBlue/30 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPink rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">{leaderboardPosition.category.name} Category</span>
                <span className="text-xl font-bold">#{leaderboardPosition.category.position}</span>
              </div>
              <div className="h-1.5 w-full bg-jillr-darkBlue/30 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPink rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
            
            <Button className="w-full mt-4" asChild>
              <a href="/leaderboard">
                View Full Leaderboard
                <ExternalLink size={14} className="ml-2" />
              </a>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Find Creators</CardTitle>
            <CardDescription>
              Connect with other creators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-md bg-jillr-darkBlue/20">
              <Avatar>
                <AvatarImage src="https://placehold.co/100x100/9b87f5/FFFFFF/png?text=MJ" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium">MikeJones</h4>
                <p className="text-xs text-muted-foreground">Dance Creator • Level 8</p>
              </div>
              <Button size="sm" variant="outline" className="h-8 flex gap-1">
                <UserPlus size={14} />
                Follow
              </Button>
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-md bg-jillr-darkBlue/20">
              <Avatar>
                <AvatarImage src="https://placehold.co/100x100/7E69AB/FFFFFF/png?text=LT" />
                <AvatarFallback>LT</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium">LisaTrends</h4>
                <p className="text-xs text-muted-foreground">Fashion Creator • Level 12</p>
              </div>
              <Button size="sm" variant="outline" className="h-8 flex gap-1">
                <UserPlus size={14} />
                Follow
              </Button>
            </div>
            
            <Button variant="outline" className="w-full mt-2" asChild>
              <a href="/explore?tab=creators">
                Discover More Creators
              </a>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare size={18} className="text-jillr-neonBlue" />
              Community Challenges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Collaborate with friends and compete in team challenges
            </p>
            <Button variant="outline" className="w-full">
              Browse Team Challenges
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart2 size={18} className="text-jillr-neonGreen" />
              Activity Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-2">
              <p className="text-sm text-muted-foreground">
                You've completed <span className="font-bold text-white">{Math.floor(userProfile.active_challenges * 1.5)}</span> challenges so far!
              </p>
              <Button variant="link" size="sm" className="mt-2">View Detailed Stats</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunitySection;
