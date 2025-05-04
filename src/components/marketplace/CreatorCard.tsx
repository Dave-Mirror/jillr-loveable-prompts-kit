
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatNumber } from '@/utils/formatters';

interface Creator {
  id: string;
  name: string;
  avatar: string;
  niche: string;
  reach: number;
  successRate: number;
  badges: string[];
  engagementRate: number;
  region: string;
  matchScore: number;
}

interface CreatorCardProps {
  creator: Creator;
  isSelected: boolean;
  onClick: () => void;
}

const CreatorCard: React.FC<CreatorCardProps> = ({
  creator,
  isSelected,
  onClick
}) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:border-jillr-neonPurple
        ${isSelected ? 'border-jillr-neonPurple border-2' : 'border-jillr-neonPurple/30'}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img 
              src={creator.avatar} 
              alt={creator.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-jillr-neonPurple/50"
            />
            <div 
              className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center bg-jillr-darkBlue border border-jillr-neonPurple text-xs font-bold"
              title="KI-Match Score"
            >
              {creator.matchScore}%
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{creator.name}</h3>
              <span className="text-sm text-gray-400">{creator.region}</span>
            </div>
            
            <p className="text-sm text-jillr-neonPurple mb-2">{creator.niche}</p>
            
            <div className="flex justify-between text-sm text-gray-300">
              <span title="Reichweite">
                <span role="img" aria-label="Reichweite">👁️</span> {formatNumber(creator.reach)}
              </span>
              <span title="Engagement Rate">
                <span role="img" aria-label="Engagement">❤️</span> {creator.engagementRate}%
              </span>
              <span title="Erfolgsrate">
                <span role="img" aria-label="Erfolgsrate">🏆</span> {creator.successRate}%
              </span>
            </div>
          </div>
        </div>
        
        {creator.badges && creator.badges.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {creator.badges.map((badge, idx) => (
              <Badge key={idx} variant="outline" className="bg-jillr-darkBlue text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreatorCard;
