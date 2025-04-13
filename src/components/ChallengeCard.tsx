
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Clock, Hash } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

interface ChallengeCardProps {
  id: string;
  title: string;
  description: string;
  type: string;
  hashtags: string[];
  xpReward: number;
  endDate: string | Date;
  imageUrl?: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  id,
  title,
  description,
  type,
  hashtags,
  xpReward,
  endDate,
  imageUrl = '/placeholder.svg',
}) => {
  return (
    <Link to={`/challenge/${id}`} className="block">
      <div className="neon-card h-full animate-glow">
        <div className="neon-card-content flex flex-col h-full">
          <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute bottom-2 right-2">
              <CountdownTimer endDate={endDate} />
            </div>
            <div className="absolute top-2 left-2 px-2 py-1 rounded bg-jillr-neonPurple/80 text-white text-xs font-medium">
              {type}
            </div>
          </div>
          
          <h3 className="text-lg font-bold mb-1 line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{description}</p>
          
          <div className="mt-auto pt-2">
            <div className="flex flex-wrap gap-1 mb-2">
              {hashtags.slice(0, 3).map((tag, index) => (
                <div key={index} className="flex items-center text-xs px-2 py-0.5 rounded-full bg-jillr-darkBlue text-jillr-neonBlue">
                  <Hash size={10} className="mr-0.5" />
                  {tag}
                </div>
              ))}
              {hashtags.length > 3 && (
                <div className="text-xs px-2 py-0.5 rounded-full bg-jillr-darkBlue text-muted-foreground">
                  +{hashtags.length - 3}
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-jillr-neonPurple/20 text-jillr-neonPurple">
                <Zap size={14} />
                <span className="text-xs font-medium">{xpReward} XP</span>
              </div>
              <span className="text-xs text-muted-foreground">Tap to join</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChallengeCard;
