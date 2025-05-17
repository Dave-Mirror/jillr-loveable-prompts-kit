
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
  
  return (
    <div className="flex flex-wrap gap-1">
      <Badge variant="secondary" className="flex items-center">
        {icon}
        {type}
      </Badge>
      
      {hashtags.slice(0, 2).map(tag => (
        <Badge key={tag} variant="outline" className="text-jillr-neonBlue border-jillr-neonBlue/30">
          #{tag}
        </Badge>
      ))}
    </div>
  );
};

export default ChallengeBadges;
