
import React from 'react';
import { 
  Heart, MessageSquare, Share, Award, Star, Flame, 
  Info, ChevronDown, ChevronUp, Flag 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { FeedItem as FeedItemType } from '@/utils/challenge/feed';
import AchievementPanel from './AchievementPanel';
import FeedItemActions from './FeedItemActions';
import FeedItemHeader from './FeedItemHeader';
import FeedItemCaption from './FeedItemCaption';
import FeedItemTooltip from './FeedItemTooltip';
import JoinChallengeButton from './JoinChallengeButton';
import CommentSection from './CommentSection';

interface FeedItemProps {
  item: FeedItemType;
  index: number;
  activeIndex: number;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
  onShare: (id: string) => void;
  onSupportCause: (id: string) => void;
  onJoinChallenge: (challengeId: string, challengeTitle: string) => void;
  onAddComment: (feedItemId: string, text: string) => void;
  toggleAchievement: (id: string | null) => void;
  showAchievement: string | null;
  activeComments: string | null;
}

const FeedItem: React.FC<FeedItemProps> = ({ 
  item, 
  index, 
  activeIndex,
  onLike,
  onComment,
  onShare,
  onSupportCause,
  onJoinChallenge,
  onAddComment,
  toggleAchievement,
  showAchievement,
  activeComments
}) => {
  return (
    <div 
      className="feed-item relative h-screen w-full flex items-center justify-center bg-black overflow-hidden snap-center"
    >
      {/* Video/Image Content with Fade In Animation */}
      {item.content.type === 'video' ? (
        <motion.video
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={item.content.url}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay={index === activeIndex}
          controls={false}
        />
      ) : (
        <motion.img
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={item.content.url}
          className="absolute inset-0 w-full h-full object-cover"
          alt={item.caption}
        />
      )}
      
      {/* Overlay gradient for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      
      {/* UI Elements with Staggered Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <FeedItemHeader item={item} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <FeedItemCaption item={item} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <FeedItemActions 
          item={item} 
          onLike={onLike}
          onComment={onComment}
          onShare={onShare}
          onSupportCause={onSupportCause}
          onJoinChallenge={onJoinChallenge}
          toggleAchievement={toggleAchievement}
          showAchievement={showAchievement}
        />
      </motion.div>
      
      {/* Achievement panel */}
      <AchievementPanel 
        item={item} 
        showAchievement={showAchievement} 
        toggleAchievement={toggleAchievement} 
      />
      
      {/* Comment section */}
      <CommentSection
        feedItemId={item.id}
        comments={item.commentsList || []}
        isOpen={activeComments === item.id}
        onClose={() => onComment(item.id)}
        onAddComment={onAddComment}
      />
      
      {/* Indicator for scrolling */}
      <motion.div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <ChevronDown className="h-6 w-6 text-white/50" />
      </motion.div>
      
      {/* Tooltip for the Impact Points feature */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <FeedItemTooltip />
      </motion.div>

      {/* Challenge Participation Button with Pulsing Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          delay: 0.6, 
          duration: 0.5,
          type: "spring",
          stiffness: 200
        }}
      >
        <JoinChallengeButton 
          challengeId={item.challenge.id} 
          challengeTitle={item.challenge.title} 
          onJoinChallenge={onJoinChallenge} 
        />
      </motion.div>
    </div>
  );
};

export default FeedItem;
