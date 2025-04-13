
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Coins, Zap, Award, Gift, Lock, Check, Calendar, ShoppingBag, ExternalLink, Flame, Ticket, BadgePercent, ImagePlus, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getUserRewards, getSampleRewards, UserReward } from '@/utils/challenge/userRewards';
import { useNavigate } from 'react-router-dom';

const Wallet = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [walletData, setWalletData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rewards, setRewards] = useState<any[]>([]);
  const [userRewards, setUserRewards] = useState<UserReward[]>([]);
  const [selectedReward, setSelectedReward] = useState<UserReward | null>(null);
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);

  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 1000) + 1;
  };

  const calculateProgress = (xp: number) => {
    const currentLevel = calculateLevel(xp);
    const previousLevelXP = (currentLevel - 1) * 1000;
    const nextLevelXP = currentLevel * 1000;
    return Math.floor(((xp - previousLevelXP) / (nextLevelXP - previousLevelXP)) * 100);
  };

  useEffect(() => {
    const fetchWalletData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('wallets')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        
        setWalletData(data || { xp_total: 0, coins_total: 0, rewards_claimed: [] });
        
        const xp = data?.xp_total || 0;
        const claimedRewards = Array.isArray(data?.rewards_claimed) ? data?.rewards_claimed : [];
        
        const availableRewards = [
          {
            id: 'coupon',
            name: 'Gutschein',
            description: '20% Rabatt auf deinen nächsten Einkauf',
            xpRequired: 2000,
            isClaimed: Array.isArray(claimedRewards) && claimedRewards.includes('coupon'),
            isUnlocked: xp >= 2000
          },
          {
            id: 'product',
            name: 'Exklusiver Produkt-Drop',
            description: 'Zugang zum neuesten Produkt vor allen anderen',
            xpRequired: 5000,
            isClaimed: Array.isArray(claimedRewards) && claimedRewards.includes('product'),
            isUnlocked: xp >= 5000
          },
          {
            id: 'vip',
            name: 'VIP-Event-Zugang',
            description: 'Exklusiver Zugang zu unserem nächsten Event',
            xpRequired: 10000,
            isClaimed: Array.isArray(claimedRewards) && claimedRewards.includes('vip'),
            isUnlocked: xp >= 10000
          }
        ];
        
        setRewards(availableRewards);

        // Fetch user challenge rewards
        const userChallengeRewards = await getUserRewards(user.id);
        
        // If we have no rewards, add some sample ones (for development)
        if (userChallengeRewards.length === 0) {
          setUserRewards(getSampleRewards());
        } else {
          setUserRewards(userChallengeRewards);
        }

      } catch (error) {
        console.error('Error fetching wallet data:', error);
        toast({
          title: "Fehler",
          description: "Deine Wallet-Daten konnten nicht geladen werden.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletData();
  }, [user, toast]);

  const claimReward = async (rewardId: string, xpRequired: number) => {
    if (!user || !walletData) return;
    
    try {
      if (walletData.xp_total < xpRequired) {
        toast({
          title: "Nicht genug XP",
          description: `Du benötigst ${xpRequired} XP um diese Belohnung freizuschalten.`,
          variant: "destructive"
        });
        return;
      }
      
      const updatedRewardsClaimed = Array.isArray(walletData.rewards_claimed) 
        ? [...walletData.rewards_claimed, rewardId] 
        : [rewardId];
      
      const { error } = await supabase
        .from('wallets')
        .update({ rewards_claimed: updatedRewardsClaimed })
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      setWalletData({
        ...walletData,
        rewards_claimed: updatedRewardsClaimed
      });
      
      setRewards(rewards.map(reward => 
        reward.id === rewardId 
          ? { ...reward, isClaimed: true } 
          : reward
      ));
      
      toast({
        title: "Belohnung eingelöst!",
        description: `Du hast erfolgreich die Belohnung "${rewards.find(r => r.id === rewardId)?.name}" eingelöst.`,
      });
      
    } catch (error) {
      console.error('Error claiming reward:', error);
      toast({
        title: "Fehler",
        description: "Die Belohnung konnte nicht eingelöst werden.",
        variant: "destructive"
      });
    }
  };

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
    if (!user || reward.claimed) return;

    try {
      // Mark reward as claimed
      const rewardKey = reward.challengeId ? `${reward.challengeId}-${reward.type}` : reward.id;
      
      const { data: wallet } = await supabase
        .from('wallets')
        .select('rewards_claimed')
        .eq('user_id', user.id)
        .single();
      
      const currentClaimed = Array.isArray(wallet?.rewards_claimed) ? wallet.rewards_claimed : [];
      const updatedClaimed = [...currentClaimed, rewardKey];
      
      const { error } = await supabase
        .from('wallets')
        .update({ rewards_claimed: updatedClaimed })
        .eq('user_id', user.id);
        
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

  if (isLoading) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="text-center">
          <h2 className="text-xl mb-4">Lade Wallet-Daten...</h2>
          <div className="w-8 h-8 border-4 border-t-jillr-neonPurple rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!walletData) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="text-center">
          <h2 className="text-xl mb-4">Keine Wallet-Daten gefunden</h2>
          <p>Bitte logge dich ein, um deine Wallet zu sehen.</p>
        </div>
      </div>
    );
  }

  const level = calculateLevel(walletData.xp_total);
  const progress = calculateProgress(walletData.xp_total);
  const nextLevelXP = level * 1000;

  // Group rewards by type
  const groupedRewards = userRewards.reduce((acc, reward) => {
    const type = reward.type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(reward);
    return acc;
  }, {} as Record<string, UserReward[]>);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Meine Wallet</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPurple/20 border-jillr-neonPurple/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="text-jillr-neonPurple" />
              XP Points
            </CardTitle>
            <CardDescription>Dein aktueller Erfahrungsstand</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">{walletData.xp_total}</div>
            <div className="mb-2">Level {level}</div>
            <Progress value={progress} className="h-2 mb-2" />
            <div className="text-sm text-gray-400">{walletData.xp_total} / {nextLevelXP} XP zum nächsten Level</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonGreen/20 border-jillr-neonGreen/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="text-jillr-neonGreen" />
              Coins
            </CardTitle>
            <CardDescription>Dein aktuelles Guthaben</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">{walletData.coins_total}</div>
            <div className="text-sm text-gray-400">Für Prämien und Belohnungen einlösbar</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-jillr-darkBlue to-jillr-neonPink/20 border-jillr-neonPink/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="text-jillr-neonPink" />
              Rewards
            </CardTitle>
            <CardDescription>Deine freigeschalteten Belohnungen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">
              {userRewards.length}
            </div>
            <div className="text-sm text-gray-400">
              {userRewards.filter(r => r.claimed).length} Belohnungen eingelöst
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="challenge-rewards" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="challenge-rewards">Challenge Belohnungen</TabsTrigger>
          <TabsTrigger value="available">Level Belohnungen</TabsTrigger>
          <TabsTrigger value="claimed">Eingelöste Belohnungen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="challenge-rewards">
          {Object.keys(groupedRewards).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(groupedRewards).map(([type, typeRewards]) => (
                <div key={type}>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    {type === 'coupon' && <BadgePercent className="text-yellow-500" />}
                    {type === 'product' && <ShoppingBag className="text-jillr-neonBlue" />}
                    {type === 'ticket' && <Ticket className="text-jillr-neonPink" />}
                    {type === 'access' && <Flame className="text-orange-500" />}
                    {type === 'voucher' && <Gift className="text-jillr-neonGreen" />}
                    {type.charAt(0).toUpperCase() + type.slice(1)}s
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {typeRewards.map(reward => (
                      <Card key={reward.id} className="overflow-hidden h-full flex flex-col">
                        <div className="relative aspect-video">
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
                                  <Check size={12} />
                                  Eingelöst
                                </span>
                              ) : 'Verfügbar'}
                            </Badge>
                          </div>
                          {reward.challengeName && (
                            <div className="absolute top-3 right-3">
                              <Badge variant="outline" className="bg-jillr-darkBlue/60 backdrop-blur-sm">
                                {reward.challengeName}
                              </Badge>
                            </div>
                          )}
                        </div>
                        
                        <CardHeader className="pb-2">
                          <CardTitle className="line-clamp-1">{reward.name}</CardTitle>
                          <CardDescription className="line-clamp-2">{reward.description}</CardDescription>
                        </CardHeader>
                        
                        <CardFooter className="mt-auto">
                          <Button 
                            onClick={() => openRewardDetails(reward)}
                            className="w-full bg-jillr-neonBlue hover:bg-jillr-neonBlue/80"
                          >
                            {reward.claimed ? 'Details anzeigen' : 'Belohnung einlösen'}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-card rounded-lg border">
              <Gift className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">Keine Challenge-Belohnungen</h3>
              <p className="text-muted-foreground mb-4">
                Nimm an Challenges teil und gewinne exklusive Belohnungen!
              </p>
              <Button onClick={() => navigate('/explore')}>Challenges entdecken</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="available">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.filter(reward => !reward.isClaimed).map(reward => (
              <Card key={reward.id} className={`transition-all ${!reward.isUnlocked ? 'opacity-60' : ''}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      <Gift className={reward.isUnlocked ? "text-jillr-neonPurple" : "text-gray-500"} />
                      {reward.name}
                    </CardTitle>
                    {!reward.isUnlocked && <Lock size={18} className="text-gray-500" />}
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Zap size={14} /> {reward.xpRequired} XP benötigt
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{reward.description}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => claimReward(reward.id, reward.xpRequired)} 
                    disabled={!reward.isUnlocked || reward.isClaimed}
                    className={`${reward.isUnlocked ? "bg-jillr-neonPurple hover:bg-jillr-neonPurple/80" : ""} w-full`}
                    variant={reward.isUnlocked ? "default" : "outline"}
                    size="sm"
                  >
                    {reward.isUnlocked ? "Einlösen" : `${reward.xpRequired - walletData.xp_total} XP fehlen`}
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {rewards.filter(reward => !reward.isClaimed).length === 0 && (
              <div className="col-span-full text-center p-8">
                <h3 className="text-xl mb-2">Keine verfügbaren Rewards</h3>
                <p className="text-gray-400">Du hast alle Belohnungen bereits eingelöst!</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="claimed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.filter(reward => reward.isClaimed).map(reward => (
              <Card key={reward.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="text-jillr-neonPurple" />
                      {reward.name}
                    </CardTitle>
                    <Badge className="bg-jillr-neonGreen">
                      <div className="flex items-center gap-1">
                        <Check size={12} />
                        Eingelöst
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{reward.description}</p>
                </CardContent>
              </Card>
            ))}
            
            {/* Add claimed challenge rewards */}
            {userRewards.filter(r => r.claimed).map(reward => (
              <Card key={reward.id} className="overflow-hidden h-full flex flex-col">
                <div className="relative aspect-video">
                  <img 
                    src={reward.image} 
                    alt={reward.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jillr-darkBlue/80 to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-green-500">
                      <span className="flex items-center gap-1">
                        <Check size={12} />
                        Eingelöst
                      </span>
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="line-clamp-1">{reward.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{reward.description}</CardDescription>
                </CardHeader>
                
                <CardFooter className="mt-auto">
                  <Button 
                    onClick={() => openRewardDetails(reward)}
                    variant="outline"
                    className="w-full"
                  >
                    Details anzeigen
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {rewards.filter(reward => reward.isClaimed).length === 0 && 
             userRewards.filter(r => r.claimed).length === 0 && (
              <div className="col-span-full text-center p-8">
                <h3 className="text-xl mb-2">Keine eingelösten Rewards</h3>
                <p className="text-gray-400">Löse deine ersten Belohnungen ein!</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

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
                  <span>Gültig bis {new Date(selectedReward.expireDate).toLocaleDateString('de-DE')}</span>
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

export default Wallet;
