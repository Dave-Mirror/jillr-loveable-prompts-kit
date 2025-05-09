
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const useChallengeData = (challengeId: string | undefined) => {
  const [challenge, setChallenge] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      if (!challengeId) {
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('challenges')
          .select('*')
          .eq('id', challengeId)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setChallenge(data);
        }
      } catch (error) {
        console.error('Error fetching challenge:', error);
        toast({
          title: 'Error',
          description: 'Failed to load challenge details',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChallenge();
  }, [challengeId]);

  return {
    challenge,
    isLoading
  };
};

export default useChallengeData;
