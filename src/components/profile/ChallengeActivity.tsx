
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Heart, Award, Clock, CheckCircle, TimerIcon, Zap, Upload, ExternalLink } from 'lucide-react';

interface ChallengeActivityProps {
  userProfile: any;
}

const ChallengeActivity: React.FC<ChallengeActivityProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState('active');
  
  // Mock data - would come from database in real app
  const activeChallenges = [
    {
      id: '1',
      title: 'Summer Dance Challenge',
      brand: 'Nike',
      deadline: '2 days left',
      xpReward: 250,
      coinReward: 100,
      progress: 70,
      status: 'in_progress'
    },
    {
      id: '2',
      title: 'City Travel Moments',
      brand: 'Airbnb',
      deadline: '5 days left',
      xpReward: 350,
      coinReward: 150,
      progress: 30,
      status: 'not_started'
    }
  ];
  
  const completedChallenges = [
    {
      id: '3',
      title: 'Trending Dance Moves',
      brand: 'Spotify',
      completedDate: '2023-09-15',
      xpEarned: 300,
      coinsEarned: 120,
      views: 2430,
      likes: 342
    },
    {
      id: '4',
      title: 'Product Unboxing',
      brand: 'Samsung',
      completedDate: '2023-08-22',
      xpEarned: 250,
      coinsEarned: 100,
      views: 1820,
      likes: 215
    }
  ];
  
  const contentUploads = [
    {
      id: '1',
      thumbnail: 'https://placehold.co/300x400/9b87f5/FFFFFF/png?text=Challenge+Video',
      title: 'My Dance Challenge',
      date: '2023-09-15',
      views: 2430,
      likes: 342,
      featured: true,
      challenge: 'Trending Dance Moves',
      tiktokLink: 'https://tiktok.com/'
    },
    {
      id: '2',
      thumbnail: 'https://placehold.co/300x400/7E69AB/FFFFFF/png?text=Product+Review',
      title: 'Unboxing the New Phone',
      date: '2023-08-22',
      views: 1820,
      likes: 215,
      featured: false,
      challenge: 'Product Unboxing',
      tiktokLink: 'https://tiktok.com/'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="active">Active Challenges</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-4">
              <div className="space-y-4">
                {activeChallenges.map(challenge => (
                  <Card key={challenge.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{challenge.title}</CardTitle>
                          <CardDescription>By {challenge.brand}</CardDescription>
                        </div>
                        <Badge variant={challenge.status === 'in_progress' ? 'default' : 'outline'}>
                          {challenge.status === 'in_progress' ? 'In Progress' : 'Not Started'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-sm">
                            <Zap size={16} className="text-jillr-neonPurple" />
                            <span>{challenge.xpReward} XP</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Award size={16} className="text-yellow-500" />
                            <span>{challenge.coinReward} Coins</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock size={16} className="text-red-400" />
                            <span>{challenge.deadline}</span>
                          </div>
                        </div>
                        
                        <Button size="sm" className="flex gap-2 items-center">
                          <Upload size={14} />
                          Upload Content
                        </Button>
                      </div>
                      
                      {challenge.status === 'in_progress' && (
                        <div className="w-full bg-jillr-darkBlue/50 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-jillr-neonPurple h-full rounded-full" 
                            style={{ width: `${challenge.progress}%` }}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-4">
              <div className="space-y-4">
                {completedChallenges.map(challenge => (
                  <Card key={challenge.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{challenge.title}</CardTitle>
                          <CardDescription>By {challenge.brand}</CardDescription>
                        </div>
                        <Badge className="bg-green-500">
                          <div className="flex items-center gap-1">
                            <CheckCircle size={12} />
                            Completed
                          </div>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap items-center justify-between gap-y-3">
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-1 text-sm">
                            <Zap size={16} className="text-jillr-neonPurple" />
                            <span>{challenge.xpEarned} XP Earned</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Award size={16} className="text-yellow-500" />
                            <span>{challenge.coinsEarned} Coins Earned</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Eye size={16} className="text-blue-400" />
                            <span>{challenge.views} Views</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Heart size={16} className="text-red-400" />
                            <span>{challenge.likes} Likes</span>
                          </div>
                        </div>
                        
                        <Button size="sm" variant="outline" className="flex gap-2 items-center">
                          View Submission
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <TimerIcon className="w-12 h-12 text-jillr-neonPurple/50 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">No Pending Challenges</h3>
                    <p className="text-muted-foreground">
                      Challenges awaiting verification or review will appear here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>My UGC Content</CardTitle>
              <CardDescription>Your uploaded challenge content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentUploads.map(content => (
                  <div key={content.id} className="flex gap-3">
                    <div className="relative w-24 h-32 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={content.thumbnail} 
                        alt={content.title} 
                        className="object-cover w-full h-full"
                      />
                      {content.featured && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-jillr-neonPink">Featured</Badge>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{content.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        {content.challenge}
                      </p>
                      <div className="flex gap-3 text-xs text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Eye size={12} />
                          <span>{content.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart size={12} />
                          <span>{content.likes}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-1 text-xs gap-1 h-7" asChild>
                        <a href={content.tiktokLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={12} /> View on TikTok
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChallengeActivity;
