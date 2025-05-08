
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { getUserRewards } from '@/utils/challenge/rewards/api';
import { getSampleRewards } from '@/utils/challenge/rewards/samples';
import { UserReward } from '@/utils/challenge/rewards/types';
import { useToast } from '@/hooks/use-toast';
import { isValidData } from '@/utils/challenge/database-types';

export interface WalletData {
  xp_total: number;
  coins_total: number;
  rewards_claimed: string[];
}

// Sample wallet data for non-authenticated users
const sampleWalletData: WalletData = {
  xp_total: 2500,
  coins_total: 350,
  rewards_claimed: ['coupon']
};

export const useWalletData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rewards, setRewards] = useState<any[]>([]);
  const [userRewards, setUserRewards] = useState<UserReward[]>([]);
  const [boostedChallenges, setBoostedChallenges] = useState<any[]>([]);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setIsLoading(true);
        
        // If not authenticated, use sample data
        if (!user) {
          setWalletData(sampleWalletData);
          
          // Set sample rewards based on the sample wallet data
          const xp = sampleWalletData.xp_total;
          const claimedRewards = sampleWalletData.rewards_claimed;
          
          const availableRewards = getAvailableRewards(xp, claimedRewards);
          setRewards(availableRewards);
          
          // Set sample boosted challenges
          setBoostedChallenges([
            {
              id: "boost1",
              title: "Instagram Challenge",
              xpMultiplier: 2
            },
            {
              id: "boost2",
              title: "TikTok Viral Challenge",
              xpMultiplier: 3
            }
          ]);
          
          setUserRewards(getSampleRewards());
          setIsLoading(false);
          return;
        }
        
        // If authenticated, fetch real data
        try {
          const { data, error } = await supabase
            .from('wallets')
            .select('*')
            .eq('user_id', user.id)
            .maybeSingle();

          if (error) throw error;
          
          if (!data) {
            // Create a wallet if it doesn't exist
            const { data: newWallet, error: createError } = await supabase
              .from('wallets')
              .insert([{ user_id: user.id }])
              .select()
              .single();
              
            if (createError) throw createError;
            
            // Use the newly created wallet
            setWalletData({
              xp_total: 0,
              coins_total: 0,
              rewards_claimed: []
            });
          } else {
            // Convert rewards_claimed to string array, ensuring proper type conversion
            const rewardsClaimed: string[] = Array.isArray(data.rewards_claimed) 
              ? data.rewards_claimed.map(item => String(item)) // Convert all items to strings
              : [];
            
            // Create a properly typed wallet data object
            const typedWalletData: WalletData = {
              xp_total: data.xp_total || 0,
              coins_total: data.coins_total || 0,
              rewards_claimed: rewardsClaimed
            };
            
            setWalletData(typedWalletData);
            
            const xp = typedWalletData.xp_total;
            const claimedRewards = typedWalletData.rewards_claimed;
            
            const availableRewards = getAvailableRewards(xp, claimedRewards);
            setRewards(availableRewards);
          }
        } catch (error) {
          console.error("Error fetching wallet:", error);
          // Fallback to sample data
          setWalletData(sampleWalletData);
          const availableRewards = getAvailableRewards(sampleWalletData.xp_total, sampleWalletData.rewards_claimed);
          setRewards(availableRewards);
        }

        try {
          // Fetch boosted challenges (double XP)
          const { data: challengesData } = await supabase
            .from('challenges')
            .select('id, title, xp_reward')
            .gt('xp_reward', 250) // Get challenges with higher than standard XP
            .limit(3);
          
          if (Array.isArray(challengesData) && challengesData.length > 0) {
            const boosted = challengesData.map(challenge => {
              if (challenge) {
                return {
                  id: challenge.id,
                  title: challenge.title,
                  xpMultiplier: Math.round((challenge.xp_reward || 250) / 250) // Assuming 250 is standard
                };
              }
              return null;
            }).filter(Boolean);
            
            setBoostedChallenges(boosted as any[]);
          } else {
            // Set sample boosted challenges if no real ones exist
            setBoostedChallenges([
              {
                id: "boost1",
                title: "Instagram Challenge",
                xpMultiplier: 2
              },
              {
                id: "boost2",
                title: "TikTok Viral Challenge",
                xpMultiplier: 3
              }
            ]);
          }
        } catch (error) {
          console.error("Error fetching boosted challenges:", error);
          // Set default boosted challenges
          setBoostedChallenges([
            {
              id: "boost1",
              title: "Instagram Challenge",
              xpMultiplier: 2
            },
            {
              id: "boost2",
              title: "TikTok Viral Challenge",
              xpMultiplier: 3
            }
          ]);
        }

        try {
          const userChallengeRewards = await getUserRewards(user.id);
          
          if (userChallengeRewards.length === 0) {
            setUserRewards(getSampleRewards());
          } else {
            setUserRewards(userChallengeRewards);
          }
        } catch (error) {
          console.error("Error fetching rewards:", error);
          setUserRewards(getSampleRewards());
        }
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        toast({
          title: "Fehler",
          description: "Deine Wallet-Daten konnten nicht geladen werden.",
          variant: "destructive"
        });
        
        // Set sample data as fallback
        setWalletData(sampleWalletData);
        setUserRewards(getSampleRewards());
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletData();
  }, [user, toast]);

  // Helper function to get available rewards
  const getAvailableRewards = (xp: number, claimedRewards: string[]) => {
    return [
      {
        id: 'coupon',
        name: 'Gutschein',
        description: '20% Rabatt auf deinen nächsten Einkauf',
        xpRequired: 2000,
        isClaimed: claimedRewards.includes('coupon'),
        isUnlocked: xp >= 2000
      },
      {
        id: 'product',
        name: 'Exklusiver Produkt-Drop',
        description: 'Zugang zum neuesten Produkt vor allen anderen',
        xpRequired: 5000,
        isClaimed: claimedRewards.includes('product'),
        isUnlocked: xp >= 5000
      },
      {
        id: 'vip',
        name: 'VIP-Event-Zugang',
        description: 'Exklusiver Zugang zu unserem nächsten Event',
        xpRequired: 10000,
        isClaimed: claimedRewards.includes('vip'),
        isUnlocked: xp >= 10000
      },
      {
        id: 'premium',
        name: 'Premium-Mitgliedschaft',
        description: '1 Monat Premium-Status mit allen Vorteilen',
        xpRequired: 15000,
        isClaimed: claimedRewards.includes('premium'),
        isUnlocked: xp >= 15000
      },
      {
        id: 'exclusive',
        name: 'Limitierte Edition Box',
        description: 'Eine Box mit exklusiven Produkten unserer Marke',
        xpRequired: 20000,
        isClaimed: claimedRewards.includes('exclusive'),
        isUnlocked: xp >= 20000
      }
    ];
  };

  return {
    walletData,
    isLoading,
    rewards,
    userRewards,
    setUserRewards,
    setWalletData,
    boostedChallenges
  };
};
