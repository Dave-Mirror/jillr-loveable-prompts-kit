
import { Challenge, Submission, ChallengeType } from '@/components/challenge/types';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { formatSubmissions } from './formatting';

// Function to validate and format challenge IDs
const validateChallengeId = (id: string): string => {
  // Check if the ID is a simple number (like "1", "2", etc.)
  if (/^\d+$/.test(id)) {
    // Convert to the UUID format used in the database for simple numeric IDs
    // Format: 00000000-0000-0000-0000-00000000000{id}
    return `00000000-0000-0000-0000-${id.padStart(12, '0')}`;
  }
  
  // If it's already a UUID or another format, return as is
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
    
    // Fetch challenge data
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
