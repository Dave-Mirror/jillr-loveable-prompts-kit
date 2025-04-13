
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coins, Zap, Award, Gift, Lock, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Wallet = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [walletData, setWalletData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rewards, setRewards] = useState<any[]>([]);

  // Calculate level based on XP
  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 1000) + 1;
  };

  // Calculate progress to next level
  const calculateProgress = (xp: number) => {
    const currentLevel = calculateLevel(xp);
    const previousLevelXP = (currentLevel - 1) * 1000;
    const nextLevelXP = currentLevel * 1000;
    return Math.floor(((xp - previousLevelXP) / (nextLevelXP - previousLevelXP)) * 100);
  };

  // Fetch wallet data
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
        
        // Generate available rewards based on XP thresholds
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

  // Claim reward function
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
      
      // Update rewards claimed in database
      const updatedRewardsClaimed = Array.isArray(walletData.rewards_claimed) 
        ? [...walletData.rewards_claimed, rewardId] 
        : [rewardId];
      
      const { error } = await supabase
        .from('wallets')
        .update({ rewards_claimed: updatedRewardsClaimed })
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      // Update local state
      setWalletData({
        ...walletData,
        rewards_claimed: updatedRewardsClaimed
      });
      
      // Update rewards state
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

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Meine Wallet</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* XP Card */}
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
        
        {/* Coins Card */}
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
        
        {/* Rewards Card */}
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
              {rewards.filter(r => r.isUnlocked).length} / {rewards.length}
            </div>
            <div className="text-sm text-gray-400">
              {rewards.filter(r => r.isClaimed).length} Belohnungen eingelöst
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="available" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="available">Verfügbare Rewards</TabsTrigger>
          <TabsTrigger value="claimed">Eingelöste Rewards</TabsTrigger>
        </TabsList>
        
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
                    className={reward.isUnlocked ? "bg-jillr-neonPurple hover:bg-jillr-neonPurple/80" : ""}
                    variant={reward.isUnlocked ? "default" : "outline"}
                    size="sm"
                    fullWidth
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
            
            {rewards.filter(reward => reward.isClaimed).length === 0 && (
              <div className="col-span-full text-center p-8">
                <h3 className="text-xl mb-2">Keine eingelösten Rewards</h3>
                <p className="text-gray-400">Löse deine ersten Belohnungen ein!</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wallet;
