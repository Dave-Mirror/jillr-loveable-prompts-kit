
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { getUserRewards } from '@/utils/challenge/rewards/api';
import { getSampleRewards } from '@/utils/challenge/rewards/samples';
import { UserReward } from '@/utils/challenge/rewards/types';
import { useToast } from '@/hooks/use-toast';

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
    setWalletData
  };
};
