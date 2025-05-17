
import React from 'react';
import { Heart, MessageSquare, Share, Flame, Flag, Award, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FeedItem } from '@/components/challenge-feed/types';

interface FeedItemActionsProps {
  item: FeedItem;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
  onShare: (id: string) => void;
  onSupportCause: (id: string) => void;
  onJoinChallenge: (challengeId: string, challengeTitle: string) => void;
  toggleAchievement: (id: string | null) => void;
  showAchievement: string | null;
}

const FeedItemActions: React.FC<FeedItemActionsProps> = ({ 
  item, 
  onLike, 
  onComment, 
  onShare, 
  onSupportCause, 
  onJoinChallenge,
  toggleAchievement,
  showAchievement
}) => {
  return (
    <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-4">
      <div className="flex flex-col items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`rounded-full bg-black/30 backdrop-blur-md ${item.liked ? 'text-red-500' : 'text-white'}`}
          onClick={() => onLike(item.id)}
        >
          <Heart className={`h-7 w-7 ${item.liked ? 'fill-red-500' : ''}`} />
        </Button>
        <span className="text-white text-xs mt-1">{item.likes}</span>
      </div>
      
      <div className="flex flex-col items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-black/30 backdrop-blur-md"
          onClick={() => onComment(item.id)}
        >
          <MessageSquare className="h-7 w-7" />
        </Button>
        <span className="text-white text-xs mt-1">{item.commentCount}</span>
      </div>
      
      <div className="flex flex-col items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-black/30 backdrop-blur-md"
          onClick={() => onShare(item.id)}
        >
          <Share className="h-7 w-7" />
        </Button>
        <span className="text-white text-xs mt-1">{item.shares || 0}</span>
      </div>
      
      {/* Unique Feature: Impact Points */}
      <div className="flex flex-col items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-jillr-neonGreen/20 backdrop-blur-md text-jillr-neonGreen"
          onClick={() => onSupportCause(item.id)}
        >
          <Flame className="h-7 w-7" />
        </Button>
        <span className="text-jillr-neonGreen text-xs mt-1">{item.impactPoints || 0} IP</span>
      </div>
      
      {/* Challenge Join Button - Side action */}
      <div className="flex flex-col items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-jillr-neonPurple/30 backdrop-blur-md text-white"
          onClick={() => onJoinChallenge(item.challenge?.id, item.challenge?.title)}
        >
          <Flag className="h-7 w-7" />
        </Button>
        <span className="text-white text-xs mt-1">Teilnehmen</span>
      </div>
      
      {/* Achievement showcase */}
      {item.achievements && item.achievements.length > 0 && (
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-jillr-neonPurple/20 backdrop-blur-md text-jillr-neonPurple"
            onClick={() => toggleAchievement(item.id)}
          >
            <Award className="h-7 w-7" />
          </Button>
          <span className="text-jillr-neonPurple text-xs mt-1">
            {showAchievement === item.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </span>
        </div>
      )}
    </div>
  );
};

export default FeedItemActions;
