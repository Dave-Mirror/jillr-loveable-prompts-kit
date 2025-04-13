
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { 
  Coins, Award, Gift, Check, Zap, Calendar, ShoppingBag, 
  ExternalLink, Flame, Ticket, BadgePercent, Copy 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserRewards, UserReward } from '@/utils/challenge/userRewards';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface RewardsSectionProps {
  userProfile: any;
}

const RewardsSection: React.FC<RewardsSectionProps> = ({ userProfile }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  // Calculate XP progress to next level
  const currentLevel = userProfile?.level || 1;
  const nextLevelXP = currentLevel * 1000;
  const previousLevelXP = (currentLevel - 1) * 1000;
  const currentXP = userProfile?.xp || 0;
  const progress = Math.min(100, ((currentXP - previousLevelXP) / (nextLevelXP - previousLevelXP)) * 100);

  const [userRewards, setUserRewards] = useState<UserReward[]>([]);
  const [selectedReward, setSelectedReward] = useState<UserReward | null>(null);
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for rewards - would come from database in real app
  const availableRewards = [
    {
      id: '1',
      name: '20% Off Coupon',
      description: 'Get 20% off your next purchase at Nike',
      requiredLevel: 2,
      isUnlocked: currentLevel >= 2,
      isClaimed: false,
      type: 'coupon'
    },
    {
      id: '2',
      name: 'Early Product Access',
      description: 'Get early access to the latest product releases',
      requiredLevel: 5,
      isUnlocked: currentLevel >= 5,
      isClaimed: false,
      type: 'access'
    },
    {
      id: '3',
      name: 'VIP Event Ticket',
      description: 'Exclusive access to our next in-store event',
      requiredLevel: 10,
      isUnlocked: currentLevel >= 10,
      isClaimed: false,
      type: 'ticket'
    }
  ];
  
  const claimedRewards = [
    {
      id: '4',
      name: 'Free Shipping Coupon',
      description: 'Free shipping on your next order',
      claimedDate: '2023-08-15',
      expireDate: '2023-12-31',
      code: 'FREESHIP2023',
      type: 'coupon'
    }
  ];
  
  // Mock data for streaks
  const streakData = {
    currentStreak: 5,
    bestStreak: 12,
    nextReward: {
      days: 7,
      reward: '50 Coins'
    }
  };

  useEffect(() => {
    const fetchUserRewards = async () => {
      if (!userProfile?.id) return;
      
      try {
        setIsLoading(true);
        const rewards = await getUserRewards(userProfile.id);
        setUserRewards(rewards);
      } catch (error) {
        console.error('Error fetching user rewards:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRewards();
  }, [userProfile?.id]);

  const openRewardDetails = (reward: UserReward) => {
    setSelectedReward(reward);
    setRewardDialogOpen(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Code kopiert!",
      description: "Der Code wurde in die Zwischenablage kopiert.",
    });
  };

  const claimChallengeReward = async (reward: UserReward) => {
    if (!userProfile?.id || reward.claimed) return;

    try {
      // Mark reward as claimed
      const rewardKey = reward.challengeId ? `${reward.challengeId}-${reward.type}` : reward.id;
      
      const { data: wallet } = await supabase
        .from('wallets')
        .select('rewards_claimed')
        .eq('user_id', userProfile.id)
        .single();
      
      const currentClaimed = Array.isArray(wallet?.rewards_claimed) ? wallet.rewards_claimed : [];
      const updatedClaimed = [...currentClaimed, rewardKey];
      
      const { error } = await supabase
        .from('wallets')
        .update({ rewards_claimed: updatedClaimed })
        .eq('user_id', userProfile.id);
        
      if (error) throw error;
      
      // Update UI
      setUserRewards(userRewards.map(r => 
        r.id === reward.id ? { ...r, claimed: true } : r
      ));
      
      toast({
        title: "Belohnung beansprucht!",
        description: `Du hast erfolgreich "${reward.name}" beansprucht.`,
      });
      
      // Close dialog
      setRewardDialogOpen(false);
      
    } catch (error) {
      console.error('Error claiming challenge reward:', error);
      toast({
        title: "Fehler",
        description: "Die Belohnung konnte nicht beansprucht werden.",
        variant: "destructive"
      });
    }
  };

  const navigateToReward = (reward: UserReward) => {
    if (reward.claimUrl) {
      // For external URLs
      if (reward.claimUrl.startsWith('http')) {
        window.open(reward.claimUrl, '_blank');
      } else {
        // For internal routes
        navigate(reward.claimUrl);
      }
    }
    setRewardDialogOpen(false);
  };

  // Group rewards by type for display
  const groupedRewards = userRewards.reduce((acc, reward) => {
    const type = reward.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(reward);
    return acc;
  }, {} as Record<string, UserReward[]>);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Level Progress</CardTitle>
            <CardDescription>
              Your journey to becoming a top creator
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <Progress value={progress} className="h-4" />
                <div className="flex justify-between mt-2 text-sm">
                  <div>Level {currentLevel}</div>
                  <div>{nextLevelXP - currentXP} XP to Level {currentLevel + 1}</div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPurple/20 border border-jillr-neonPurple/30 p-4 rounded-xl flex flex-col items-center justify-center min-w-28">
                <Zap className="h-6 w-6 text-jillr-neonPurple mb-1" />
                <span className="text-2xl font-bold">{currentXP}</span>
                <span className="text-xs">Total XP</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[5, 10, 15, 20].map(level => (
                <Card 
                  key={level} 
                  className={`border ${currentLevel >= level 
                    ? 'border-jillr-neonPurple bg-jillr-neonPurple/10' 
                    : 'border-dashed'}`}
                >
                  <CardContent className="p-4 text-center">
                    <Award 
                      className={`h-8 w-8 mx-auto mb-2 ${
                        currentLevel >= level 
                          ? 'text-jillr-neonPurple' 
                          : 'text-gray-400'
                      }`} 
                    />
                    <h4 className="font-medium">Level {level}</h4>
                    <p className="text-xs text-muted-foreground">
                      {currentLevel >= level 
                        ? 'Unlocked!' 
                        : `${(level - currentLevel) * 1000 - (currentXP - (currentLevel - 1) * 1000)} XP needed`}
                    </p>
                    {currentLevel >= level && (
                      <Badge className="mt-2 bg-jillr-neonPurple">
                        <Check size={10} className="mr-1" /> Achieved
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="challenge-rewards">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="challenge-rewards">Challenge Rewards</TabsTrigger>
            <TabsTrigger value="available">Available Rewards</TabsTrigger>
            <TabsTrigger value="claimed">Claimed Rewards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="challenge-rewards" className="mt-4">
            {isLoading ? (
              <div className="text-center p-6">
                <div className="w-6 h-6 border-4 border-t-jillr-neonPurple rounded-full animate-spin mx-auto mb-4"></div>
                <p>Loading your rewards...</p>
              </div>
            ) : Object.keys(groupedRewards).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(groupedRewards).map(([type, typeRewards]) => (
                  <div key={type}>
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      {type === 'coupon' && <BadgePercent className="text-yellow-500" />}
                      {type === 'product' && <ShoppingBag className="text-jillr-neonBlue" />}
                      {type === 'ticket' && <Ticket className="text-jillr-neonPink" />}
                      {type === 'access' && <Flame className="text-orange-500" />}
                      {type === 'voucher' && <Gift className="text-jillr-neonGreen" />}
                      {type.charAt(0).toUpperCase() + type.slice(1)}s
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {typeRewards.map(reward => (
                        <Card key={reward.id} className="overflow-hidden h-full flex flex-col">
                          <div className="relative h-40">
                            <img 
                              src={reward.image} 
                              alt={reward.name} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-jillr-darkBlue/80 to-transparent"></div>
                            <div className="absolute bottom-3 left-3">
                              <Badge className={`${reward.claimed ? 'bg-green-500' : 'bg-jillr-neonPurple'}`}>
                                {reward.claimed ? (
                                  <span className="flex items-center gap-1">
                                    <Check size={10} />
                                    Eingelöst
                                  </span>
                                ) : 'Verfügbar'}
                              </Badge>
                            </div>
                          </div>
                          
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base line-clamp-1">{reward.name}</CardTitle>
                            <CardDescription className="line-clamp-2">{reward.description}</CardDescription>
                          </CardHeader>
                          
                          <CardFooter className="pt-0 mt-auto">
                            <Button 
                              onClick={() => openRewardDetails(reward)}
                              size="sm"
                              className="w-full"
                              variant={reward.claimed ? "outline" : "default"}
                            >
                              {reward.claimed ? 'Details' : 'Einlösen'}
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-6 bg-card rounded-lg border">
                <Gift className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No Challenge Rewards Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Complete challenges to earn exclusive rewards!
                </p>
                <Button onClick={() => navigate('/explore')} size="sm">Explore Challenges</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="available" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableRewards.map(reward => (
                <Card key={reward.id} className="transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2 text-base">
                        {reward.type === 'coupon' && <Gift className="h-5 w-5 text-jillr-neonPink" />}
                        {reward.type === 'access' && <Flame className="h-5 w-5 text-orange-500" />}
                        {reward.type === 'ticket' && <Calendar className="h-5 w-5 text-jillr-neonBlue" />}
                        {reward.name}
                      </CardTitle>
                      <Badge variant={reward.isUnlocked ? "default" : "outline"}>
                        {reward.isUnlocked ? "Available" : `Level ${reward.requiredLevel}`}
                      </Badge>
                    </div>
                    <CardDescription>
                      {reward.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <Button 
                      className="w-full" 
                      disabled={!reward.isUnlocked}
                      variant={reward.isUnlocked ? "default" : "outline"}
                      size="sm"
                    >
                      {reward.isUnlocked ? "Claim Reward" : `Unlock at Level ${reward.requiredLevel}`}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="claimed" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {claimedRewards.length > 0 ? (
                claimedRewards.map(reward => (
                  <Card key={reward.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="flex items-center gap-2 text-base">
                          {reward.type === 'coupon' && <Gift className="h-5 w-5 text-jillr-neonPink" />}
                          {reward.name}
                        </CardTitle>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                          <Check size={12} className="mr-1" /> Claimed
                        </Badge>
                      </div>
                      <CardDescription>
                        {reward.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="bg-jillr-darkBlue/30 rounded-md p-3 font-mono text-center">
                        {reward.code}
                      </div>
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        Valid until {new Date(reward.expireDate).toLocaleDateString()}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" className="w-full" size="sm">Use Reward</Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Card className="col-span-full">
                  <CardContent className="p-8 text-center">
                    <Gift className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-medium mb-2">No Claimed Rewards Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't claimed any rewards yet. Check the available rewards to get started!
                    </p>
                    <Button>View Available Rewards</Button>
                  </CardContent>
                </Card>
              )}
              
              {/* Add claimed challenge rewards */}
              {userRewards.filter(r => r.claimed).map(reward => (
                <Card key={reward.id} className="overflow-hidden flex flex-col">
                  <div className="relative h-32">
                    <img 
                      src={reward.image} 
                      alt={reward.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-jillr-darkBlue/80 to-transparent"></div>
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-green-500">
                        <span className="flex items-center gap-1">
                          <Check size={10} />
                          Claimed
                        </span>
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2 pt-3">
                    <CardTitle className="text-sm">{reward.name}</CardTitle>
                  </CardHeader>
                  
                  <CardFooter className="pt-0">
                    <Button 
                      onClick={() => openRewardDetails(reward)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonGreen/10 border-jillr-neonGreen/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-500" />
              Jillr Coins
            </CardTitle>
            <CardDescription>
              Your current coin balance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold">{userProfile.coins || 0}</div>
              <p className="text-sm text-muted-foreground">Available Coins</p>
            </div>
            
            <Button className="w-full flex items-center gap-2" asChild>
              <a href="/wallet">
                <ShoppingBag className="h-4 w-4" />
                Visit Rewards Shop
              </a>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              Daily Streak
            </CardTitle>
            <CardDescription>
              Your consecutive activity days
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <div className="text-center">
                <div className="text-2xl font-bold">{streakData.currentStreak}</div>
                <p className="text-xs text-muted-foreground">Current Streak</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{streakData.bestStreak}</div>
                <p className="text-xs text-muted-foreground">Best Streak</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{streakData.nextReward.days}</div>
                <p className="text-xs text-muted-foreground">Days to Reward</p>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`aspect-square rounded-full flex items-center justify-center text-xs ${
                    i < streakData.currentStreak % 7
                      ? 'bg-orange-500/80 text-white'
                      : 'bg-jillr-darkBlue/30 text-muted-foreground'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            
            <div className="bg-jillr-darkBlue/30 p-3 rounded-md">
              <p className="text-sm flex justify-between">
                <span>Next reward:</span>
                <span className="font-medium">{streakData.nextReward.reward}</span>
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">VIP Rewards Shop</CardTitle>
            <CardDescription>
              Exclusive rewards for level {currentLevel}+ users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full flex items-center gap-2" asChild>
              <a href="/shop">
                <ShoppingBag className="h-4 w-4" />
                <span>Browse VIP Rewards</span>
                <ExternalLink className="h-3 w-3 ml-auto" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Reward Detail Dialog */}
      {selectedReward && (
        <Dialog open={rewardDialogOpen} onOpenChange={setRewardDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedReward.type === 'coupon' && <BadgePercent className="text-yellow-500" />}
                {selectedReward.type === 'product' && <ShoppingBag className="text-jillr-neonBlue" />}
                {selectedReward.type === 'ticket' && <Ticket className="text-jillr-neonPink" />}
                {selectedReward.type === 'access' && <Flame className="text-orange-500" />}
                {selectedReward.type === 'voucher' && <Gift className="text-jillr-neonGreen" />}
                {selectedReward.name}
              </DialogTitle>
            </DialogHeader>
            
            <div className="relative aspect-video rounded-md overflow-hidden mb-4">
              <img 
                src={selectedReward.image} 
                alt={selectedReward.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <p>{selectedReward.description}</p>
              
              {selectedReward.challengeName && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Challenge:</span>
                  <Badge variant="outline">{selectedReward.challengeName}</Badge>
                </div>
              )}
              
              {selectedReward.code && (
                <div className="bg-muted p-3 rounded-md flex items-center justify-between">
                  <code className="font-mono text-base">{selectedReward.code}</code>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => copyToClipboard(selectedReward.code!)}
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              )}
              
              {selectedReward.expireDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={14} className="text-muted-foreground" />
                  <span>Gültig bis {new Date(selectedReward.expireDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
            
            <DialogFooter className="flex sm:justify-between">
              <Button 
                variant="outline" 
                onClick={() => setRewardDialogOpen(false)}
              >
                Schließen
              </Button>
              
              {!selectedReward.claimed ? (
                <Button 
                  className="bg-jillr-neonGreen hover:bg-jillr-neonGreen/80"
                  onClick={() => claimChallengeReward(selectedReward)}
                >
                  <Check size={16} className="mr-2" /> Belohnung beanspruchen
                </Button>
              ) : (
                <Button
                  className="bg-jillr-neonBlue hover:bg-jillr-neonBlue/80"
                  onClick={() => navigateToReward(selectedReward)}
                >
                  <ExternalLink size={16} className="mr-2" /> Belohnung einlösen
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default RewardsSection;
