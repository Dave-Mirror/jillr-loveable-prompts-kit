
import { Challenge } from '@/components/challenge/types';
import { Video, MapPin, Camera } from 'lucide-react';

/**
 * Get challenge type icon
 */
export const getChallengeTypeIcon = (type: string | null | undefined): JSX.Element => {
  switch(type?.toLowerCase()) {
    case 'video': return <Video size={24} />;
    case 'geofencing': return <MapPin size={24} />;
    case 'ar': return <Camera size={24} />;
    default: return <Video size={24} />;
  }
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
