
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { getUserRewards } from '@/utils/challenge/rewards/api';
import { getSampleRewards } from '@/utils/challenge/rewards/samples';
import { UserReward } from '@/utils/challenge/rewards/types';
import { useToast } from '@/hooks/use-toast';
import { Json } from '@/integrations/supabase/types';

export interface WalletData {
  xp_total: number;
  coins_total: number;
  rewards_claimed: string[];
}

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
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('wallets')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        
        // Convert rewards_claimed to string array, ensuring proper type conversion
        const rewardsClaimed: string[] = Array.isArray(data?.rewards_claimed) 
          ? data.rewards_claimed.map(item => String(item)) // Convert all items to strings
          : [];
        
        // Create a properly typed wallet data object
        const typedWalletData: WalletData = {
          xp_total: data?.xp_total || 0,
          coins_total: data?.coins_total || 0,
          rewards_claimed: rewardsClaimed
        };
        
        setWalletData(typedWalletData);
        
        const xp = typedWalletData.xp_total;
        const claimedRewards = typedWalletData.rewards_claimed;
        
        const availableRewards = [
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
        
        setRewards(availableRewards);

        // Fetch boosted challenges (double XP)
        const { data: challengesData } = await supabase
          .from('challenges')
          .select('id, title, xp_reward')
          .gt('xp_reward', 250) // Get challenges with higher than standard XP
          .limit(3);
        
        if (challengesData) {
          setBoostedChallenges(challengesData.map(challenge => ({
            id: challenge.id,
            title: challenge.title,
            xpMultiplier: Math.round(challenge.xp_reward / 250) // Assuming 250 is standard
          })));
        }

        const userChallengeRewards = await getUserRewards(user.id);
        
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
