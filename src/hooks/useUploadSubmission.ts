
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { upsertUserChallenge } from '@/utils/upload/mockUserChallenges';
import { FormValues } from '@/components/upload/UploadFormContainer';

export const useUploadSubmission = (challengeId: string | undefined, challenge: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: FormValues) => {
    if (!challengeId || !challenge) return;
    
    setIsSubmitting(true);
    
    try {
      // First, check if the user is authenticated
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        toast({
          title: 'Authentication required',
          description: 'Please log in to submit your challenge.',
          variant: 'destructive',
        });
        return;
      }
      
      const userId = user.user.id;
      
      // Insert upload record
      const { data: uploadData, error: uploadError } = await supabase
        .from('uploads')
        .insert({
          user_id: userId,
          challenge_id: challengeId,
          video_url: data.videoUrl || null,
          tiktok_link: data.tiktokLink,
          capcut_template: data.capCutTemplate,
          submitted_at: new Date().toISOString(),
        })
        .select()
        .single();
        
      if (uploadError) throw uploadError;
      
      // Mark this challenge as active for the user using our mock function
      const { error: challengeError } = await upsertUserChallenge({
        user_id: userId,
        challenge_id: challengeId,
        status: 'active',
        joined_at: new Date().toISOString(),
      });
      
      if (challengeError) throw challengeError;
      
      // Award XP and coins to the user's wallet
      const xpReward = challenge.xp_reward || 250;
      const coinReward = challenge.coin_reward || 10;
      
      // Get the user's current wallet or create a new one
      const { data: walletData, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (walletError && walletError.code !== 'PGRST116') { // No rows returned
        throw walletError;
      }
      
      if (walletData) {
        // Update existing wallet
        const { error: updateError } = await supabase
          .from('wallets')
          .update({
            xp_total: walletData.xp_total + xpReward,
            coins_total: walletData.coins_total + coinReward,
            updated_at: new Date().toISOString(),
          })
          .eq('id', walletData.id);
          
        if (updateError) throw updateError;
      } else {
        // Create new wallet for the user
        const { error: insertError } = await supabase
          .from('wallets')
          .insert({
            user_id: userId,
            xp_total: xpReward,
            coins_total: coinReward,
          });
          
        if (insertError) throw insertError;
      }
      
      // Show success notification
      toast({
        title: 'Challenge submission successful!',
        description: `You've earned +${xpReward} XP and +${coinReward} coins for your submission!`,
      });
      
      // Redirect to challenge page
      navigate(`/challenge/${challengeId}`);
    } catch (error) {
      console.error('Error submitting challenge:', error);
      toast({
        title: 'Submission failed',
        description: 'There was an error submitting your challenge. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit
  };
};

export default useUploadSubmission;
