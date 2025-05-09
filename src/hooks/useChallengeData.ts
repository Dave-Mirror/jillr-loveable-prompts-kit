
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Challenge } from '@/components/challenge/types';

export const useChallengeData = (challengeId: string | undefined) => {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      if (!challengeId) {
        setIsLoading(false);
        return;
      }
      
      try {
        // Für Demo-Zwecke: Wenn die ID das Format 'challenge-X' hat, erstellen wir Beispieldaten
        if (challengeId.startsWith('challenge-')) {
          // Mock-Daten für Demo-Zwecke
          setTimeout(() => {
            const demoChallenge: Challenge = {
              id: challengeId,
              title: `Challenge ${challengeId.split('-')[1]}`,
              description: 'Dies ist eine Demo Challenge für die jillr Plattform. Nehmen Sie teil und gewinnen Sie tolle Preise!',
              type: 'Video',
              imageUrl: '/placeholder.svg',
              brand_logo: '/placeholder.svg',
              brand_name: 'jillr Demo',
              start_date: new Date().toISOString(),
              end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
              coin_reward: 100,
              xp_reward: 500,
              hashtags: ['jillr', 'challenge', 'demo'],
              status: 'active'
            };
            setChallenge(demoChallenge);
            setIsLoading(false);
          }, 500);
          return;
        }
        
        // Bei UUID-Format versuchen wir, aus der Datenbank zu laden
        const { data, error } = await supabase
          .from('challenges')
          .select('*')
          .eq('id', challengeId)
          .maybeSingle();
          
        if (error) throw error;
        
        if (data) {
          setChallenge(data as Challenge);
        } else {
          // Fallback für fehlende Daten
          const fallbackChallenge: Challenge = {
            id: challengeId,
            title: 'Challenge nicht gefunden',
            description: 'Diese Challenge existiert nicht oder wurde entfernt.',
            start_date: new Date().toISOString(),
            end_date: new Date().toISOString(),
          };
          setChallenge(fallbackChallenge);
        }
      } catch (error) {
        console.error('Error fetching challenge:', error);
        toast({
          title: 'Error',
          description: 'Fehler beim Laden der Challenge-Details',
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
