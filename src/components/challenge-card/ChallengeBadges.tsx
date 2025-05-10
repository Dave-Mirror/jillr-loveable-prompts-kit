
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, Hash } from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';
import { typeIcons } from './types';

interface ChallengeBadgesProps {
  type: string;
  endDate: string | Date;
  hashtags: string[];
}

const ChallengeBadges: React.FC<ChallengeBadgesProps> = ({ 
  type,
  endDate, 
  hashtags
}) => {
  // Ensure typeIcon always has a value
  const typeIcon = typeIcons[type.toLowerCase()] || '🎯';

  return (
    <>
      {/* Type badge */}
      <div className="absolute top-3 left-3">
        <Badge className="bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPurpleDark border-0 text-white px-2.5 py-1.5 text-xs font-medium flex items-center gap-1.5">
          <span className="text-base">{typeIcon}</span> {type}
        </Badge>
      </div>
      
      {/* Timer badge */}
      <div className="absolute bottom-3 right-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-jillr-dark/80 backdrop-blur-sm border-jillr-neonPurple/30 flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-jillr-neonPurple" />
            <CountdownTimer endDate={endDate} />
          </Badge>
        </div>
      </div>
      
      {/* Hashtags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {hashtags && hashtags.slice(0, 3).map((tag, index) => (
          <div key={index} className="flex items-center text-xs px-2 py-1 rounded-full bg-jillr-darkBlue text-jillr-neonBlue">
            <Hash size={10} className="mr-0.5" />
            {tag}
          </div>
        ))}
        {hashtags && hashtags.length > 3 && (
          <div className="text-xs px-2 py-1 rounded-full bg-jillr-darkBlue text-gray-400">
            +{hashtags.length - 3}
          </div>
        )}
      </div>
    </>
  );
};

export default ChallengeBadges;
