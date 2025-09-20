
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ChallengeType } from '@/utils/challenge/rewards/types';
import { Camera, Video, MapPin, Dumbbell, Users, Star } from 'lucide-react';

// Define typeIcons here instead of importing it
export const typeIcons: Record<string, React.ReactNode> = {
  photo: <Camera className="h-3 w-3 mr-1" />,
  video: <Video className="h-3 w-3 mr-1" />,
  geofencing: <MapPin className="h-3 w-3 mr-1" />,
  fitness: <Dumbbell className="h-3 w-3 mr-1" />,
  community: <Users className="h-3 w-3 mr-1" />,
  default: <Star className="h-3 w-3 mr-1" />
};

interface ChallengeBadgesProps {
  type: ChallengeType;
  hashtags?: string[];
}

const ChallengeBadges: React.FC<ChallengeBadgesProps> = ({ type, hashtags = [] }) => {
  const icon = typeIcons[type] || typeIcons.default;
  
  // Define gradient combinations for different types
  const getTypeGradient = (challengeType: string) => {
    switch (challengeType.toLowerCase()) {
      case 'video':
        return 'bg-gradient-to-r from-jillr-neonCyan to-jillr-neonPurple shadow-glow-cyan';
      case 'photo':
        return 'bg-gradient-to-r from-jillr-neonPink to-jillr-neonPurple shadow-glow-pink';
      case 'ar':
        return 'bg-gradient-to-r from-jillr-neonPurple to-jillr-neonBlue shadow-glow-purple';
      case 'fitness':
        return 'bg-gradient-to-r from-jillr-neonBlue to-jillr-neonCyan shadow-glow-blue';
      default:
        return 'bg-gradient-to-r from-jillr-neonCyan to-jillr-neonPurple shadow-glow-cyan';
    }
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      <Badge 
        variant="category" 
        className={`flex items-center gap-1.5 px-3 py-1.5 ${getTypeGradient(type)} border border-white/30`}
      >
        {icon}
        <span className="capitalize font-medium">{type}</span>
      </Badge>
      
      {hashtags.slice(0, 2).map(tag => (
        <Badge 
          key={tag} 
          variant="neon" 
          className="border-jillr-neonCyan/50 text-jillr-neonCyan hover:shadow-glow-cyan"
        >
          #{tag}
        </Badge>
      ))}
    </div>
  );
};

export default ChallengeBadges;
