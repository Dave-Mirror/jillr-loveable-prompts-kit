
import { Challenge, Submission, ChallengeType } from '@/components/challenge/types';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { formatSubmissions } from './formatting';

// Function to validate and format challenge IDs
const validateChallengeId = (id: string): string => {
  // Wenn wir eine numerische ID oder eine ID im Format 'challenge-X' haben, 
  // geben wir sie unverändert zurück, da sie in useChallengeData speziell behandelt wird
  if (/^\d+$/.test(id) || id.startsWith('challenge-')) {
    return id;
  }
  
  // Wenn es bereits eine UUID oder ein anderes Format ist, unverändert zurückgeben
  return id;
};

/**
 * Fetch challenge details from the database
 */
export const fetchChallengeDetails = async (
  challengeId: string,
  setChallenge: (data: Challenge) => void,
  setSubmissions: (data: Submission[]) => void,
  setTopUsers: (data: any[]) => void,
  setVerifiedSubmissions: (data: Submission[]) => void,
  challengeTypeImages: Record<string, string>,
  setIsLoading: (loading: boolean) => void
): Promise<void> => {
  if (!challengeId) return;
  
  try {
    setIsLoading(true);
    
    // Validate and format the challenge ID
    const validatedId = validateChallengeId(challengeId);
    
    console.log('Fetching challenge with validated ID:', validatedId);
    
    // For demo purposes, fetch from sample data when using numeric IDs or 'challenge-X' format
    if (/^\d+$/.test(challengeId) || challengeId.startsWith('challenge-')) {
      // Mock data for demo purposes
      setTimeout(() => {
        const mockChallenge: Challenge = {
          id: validatedId,
          title: `Challenge ${challengeId.startsWith('challenge-') ? challengeId.split('-')[1] : challengeId}`,
          description: 'Dies ist eine Demo-Challenge für Test-Zwecke.',
          type: 'Community',
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          imageUrl: challengeTypeImages['Community'] || challengeTypeImages['default'],
          coin_reward: 100,
          xp_reward: 500,
          hashtags: ['demo', 'test', 'challenge'],
          brand_name: 'Demo Brand',
          status: 'active'
        };
        
        setChallenge(mockChallenge);
        setSubmissions([]);
        setTopUsers([]);
        setVerifiedSubmissions([]);
        setIsLoading(false);
      }, 1000);
      
      return;
    }
    
    // Fetch challenge data from database
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .filter('id', 'eq', validatedId)
      .maybeSingle();
      
    if (error) {
      console.error('Error fetching challenge:', error);
      throw error;
    }
    
    if (!data) {
      setIsLoading(false);
      return;
    }
    
    // Add the appropriate image based on the challenge type and cast type to ChallengeType
    const challengeWithImage: Challenge = {
      ...data,
      imageUrl: challengeTypeImages[data.type] || challengeTypeImages['default'],
      type: (data.type as ChallengeType) || undefined,
      status: (data.status as "active" | "completed" | "draft") || "active"
    };
    
    setChallenge(challengeWithImage);
    
    // Fetch submissions for this challenge
    const { data: submissionsData, error: submissionsError } = await supabase
      .from('uploads')
      .select('*')
      .eq('challenge_id', validatedId);
      
    if (submissionsError) throw submissionsError;
    
    // Format the submissions to match the required type
    const formattedSubmissions = formatSubmissions(submissionsData || []);
    setSubmissions(formattedSubmissions);
    
    // Get top users based on views/likes for the leaderboard
    const topSubmissions = Array.isArray(submissionsData) 
      ? [...submissionsData].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3)
      : [];
      
    setTopUsers(topSubmissions.map(sub => ({
      id: sub.id,
      user_id: sub.user_id,
      username: `User_${sub.user_id.substring(0, 5)}`, // Placeholder
      views: sub.views || 0,
      likes: sub.likes || 0
    })));
    
    // Filter verified submissions for the gallery
    const verified = Array.isArray(formattedSubmissions)
      ? formattedSubmissions.filter(sub => sub.verified === true)
      : [];
      
    setVerifiedSubmissions(verified);
  } catch (error) {
    console.error('Error fetching challenge details:', error);
    toast({
      title: "Fehler",
      description: "Die Challenge-Details konnten nicht geladen werden.",
      variant: "destructive"
    });
  } finally {
    setIsLoading(false);
  }
};
