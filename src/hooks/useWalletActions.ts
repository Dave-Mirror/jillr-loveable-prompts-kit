
import { useState } from 'react';
import { UserReward } from '@/utils/challenge/rewards/types';
import { useToast } from '@/hooks/use-toast';
import { claimReward, claimChallengeReward } from '@/services/walletService';
import { WalletData } from '@/hooks/useWalletData';

export const useWalletActions = (
  walletData: WalletData | null,
  rewards: any[],
  userRewards: UserReward[],
  setUserRewards: (rewards: UserReward[]) => void,
  setWalletData: (data: WalletData) => void
) => {
  const { toast } = useToast();
  const [selectedReward, setSelectedReward] = useState<UserReward | null>(null);
  const [rewardDialogOpen, setRewardDialogOpen] = useState(false);

  const handleClaimReward = async (rewardId: string, xpRequired: number) => {
    if (!walletData) return;
    
    try {
      const result = await claimReward('', rewardId, xpRequired, walletData);
      
      if (!result.success) {
        if (result.reason === 'not_enough_xp') {
          toast({
            title: "Nicht genug XP",
            description: `Du benötigst ${xpRequired} XP um diese Belohnung freizuschalten.`,
            variant: "destructive"
          });
        }
        return;
      }
      
      if (result.updatedWalletData) {
        setWalletData(result.updatedWalletData);
      }
      
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

  const handleClaimChallengeReward = async (reward: UserReward) => {
    if (reward.claimed) return;

    try {
      const success = await claimChallengeReward('', reward);
      
      if (success) {
        setUserRewards(userRewards.map(r => 
          r.id === reward.id ? { ...r, claimed: true } : r
        ));
        
        toast({
          title: "Belohnung beansprucht!",
          description: `Du hast erfolgreich "${reward.name}" beansprucht.`,
        });
        
        setRewardDialogOpen(false);
      }
      
    } catch (error) {
      console.error('Error claiming challenge reward:', error);
      toast({
        title: "Fehler",
        description: "Die Belohnung konnte nicht beansprucht werden.",
        variant: "destructive"
      });
    }
  };

  const handleGenerateQRCode = (reward: UserReward) => {
    toast({
      title: "QR-Code generiert",
      description: "Der QR-Code wurde erfolgreich generiert und kann in Geschäften gescannt werden.",
    });
  };

  return {
    selectedReward,
    rewardDialogOpen,
    setRewardDialogOpen,
    handleClaimReward,
    openRewardDetails,
    handleClaimChallengeReward,
    handleGenerateQRCode
  };
};
