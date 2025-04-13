
import { Submission, SubmissionStatus, Challenge } from '@/components/challenge/types';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Reward } from '@/types/dashboard';

/**
 * Share a challenge on social media or copy link to clipboard
 */
export const shareChallenge = (challenge: Challenge): void => {
  if (navigator.share) {
    navigator.share({
      title: challenge?.title,
      text: `Check out this challenge: ${challenge?.title}`,
      url: window.location.href,
    })
    .then(() => {
      toast({
        title: "Geteilt!",
        description: "Du erhältst 50 XP für das Teilen!",
      });
    })
    .catch(console.error);
  } else {
    // Fallback for browsers that don't support the Web Share API
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link kopiert!",
      description: "Der Challenge-Link wurde in die Zwischenablage kopiert.",
    });
  }
};

/**
 * Invite friends to join the challenge
 */
export const inviteFriends = (challenge: Challenge): void => {
  const message = `Hey! Schau dir diese Challenge auf Jillr an: ${challenge?.title} ${window.location.href}`;
  
  if (navigator.share) {
    navigator.share({
      title: "Freunde zu Jillr einladen",
      text: message,
      url: window.location.href,
    });
  } else {
    navigator.clipboard.writeText(message);
    toast({
      title: "Einladungstext kopiert!",
      description: "Die Einladung wurde in die Zwischenablage kopiert.",
    });
  }
};

/**
 * Handle joining a challenge
 */
export const joinChallenge = (
  challengeId: string,
  user: any,
  navigate: (path: string) => void
): void => {
  if (!user) {
    toast({
      title: "Login erforderlich",
      description: "Bitte melde dich an, um an dieser Challenge teilzunehmen",
      variant: "destructive"
    });
    navigate('/auth', { state: { from: { pathname: `/challenge/${challengeId}` } } });
    return;
  }
  
  navigate(`/upload/${challengeId}`);
};

/**
 * Format submissions to match the required type
 */
export const formatSubmissions = (submissions: any[]): Submission[] => {
  if (!Array.isArray(submissions)) return [];
  
  return submissions.map(sub => ({
    id: sub.id,
    user_id: sub.user_id,
    username: sub.username || `User_${sub.user_id.substring(0, 5)}`,
    profile_image: sub.profile_image,
    video_url: sub.video_url,
    views: sub.views || 0,
    likes: sub.likes || 0,
    status: validateSubmissionStatus(sub.status),
    verified: sub.verified || false,
    challenge_id: sub.challenge_id,
    submitted_at: sub.submitted_at
  }));
};

/**
 * Validate submission status to ensure it matches the allowed types
 */
const validateSubmissionStatus = (status: string): SubmissionStatus => {
  const validStatuses: SubmissionStatus[] = ['pending', 'approved', 'rejected', 'verified'];
  return validStatuses.includes(status as SubmissionStatus) 
    ? status as SubmissionStatus 
    : 'pending';
};

/**
 * Generate AI coach tips for a challenge
 */
export const generateCoachTip = async (
  challenge: Challenge, 
  user: any, 
  coachTips: Record<string, string>
): Promise<string> => {
  // In a real implementation, this would call an AI service
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Select specific tips based on the challenge type
  const specificTips = coachTips[challenge.type || 'default'] || coachTips['default'];
  
  // Add hashtags and personal greeting
  return `Hey ${user?.email?.split('@')[0] || 'Creator'}! 

Hier sind meine Tipps für deine "${challenge.title}" (${challenge.type || 'Video'})-Challenge:

${specificTips}

Wichtig: Vergiss nicht die Hashtags ${challenge.hashtags?.map((tag: string) => '#' + tag).join(' ') || '#jillr'} zu verwenden!

Viel Erfolg! 🚀`;
};

/**
 * Get challenge type icon
 */
export const getChallengeTypeIcon = (type: string | null | undefined): JSX.Element => {
  const { Video, MapPin, Camera } = require('lucide-react');
  
  switch(type?.toLowerCase()) {
    case 'video': return <Video size={24} />;
    case 'geofencing': return <MapPin size={24} />;
    case 'ar': return <Camera size={24} />;
    default: return <Video size={24} />;
  }
};

/**
 * Get rewards based on challenge type
 */
export const getChallengeRewards = (
  challenge: Challenge | null, 
  rewardsData: Record<string, Reward[]>
): Reward[] => {
  if (!challenge?.type) return rewardsData['default'];
  return rewardsData[challenge.type] || rewardsData['default'];
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
    
    // Fetch challenge data
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .filter('id', 'eq', challengeId)
      .maybeSingle();
      
    if (error) {
      console.error('Error fetching challenge:', error);
      throw error;
    }
    
    if (!data) {
      setIsLoading(false);
      return;
    }
    
    // Add the appropriate image based on the challenge type
    const challengeWithImage = {
      ...data,
      imageUrl: challengeTypeImages[data.type] || challengeTypeImages['default']
    };
    
    setChallenge(challengeWithImage);
    
    // Fetch submissions for this challenge
    const { data: submissionsData, error: submissionsError } = await supabase
      .from('uploads')
      .select('*')
      .eq('challenge_id', challengeId);
      
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
