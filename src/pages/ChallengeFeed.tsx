
import React from 'react';
import { useFeed } from '@/hooks/useFeed';
import { useFeedInteractions } from '@/hooks/useFeedInteractions';
import { useVideoPlayback } from '@/hooks/useVideoPlayback';
import { useAchievementManager } from '@/hooks/useAchievementManager';
import FeedItem from '@/components/challenge-feed/FeedItem';
import FeedFooter from '@/components/challenge-feed/FeedFooter';
import LoadingSpinner from '@/components/challenge-feed/LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';

const ChallengeFeed = () => {
  const { feedItems, setFeedItems, loading } = useFeed();
  const { activeIndex, feedRef } = useVideoPlayback();
  const { showAchievement, toggleAchievement } = useAchievementManager();
  
  const {
    handleLike,
    handleComment,
    handleShare,
    handleSupportCause,
    handleJoinChallenge,
  } = useFeedInteractions(feedItems, setFeedItems);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div ref={feedRef} className="pb-20 scroll-smooth">
      <AnimatePresence>
        {feedItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.5, 
              ease: "easeInOut"
            }}
            className="snap-start"
          >
            <FeedItem
              item={item}
              index={index}
              activeIndex={activeIndex}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
              onSupportCause={handleSupportCause}
              onJoinChallenge={handleJoinChallenge}
              toggleAchievement={toggleAchievement}
              showAchievement={showAchievement}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* End of feed indicator */}
      {feedItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <FeedFooter />
        </motion.div>
      )}
    </div>
  );
};

export default ChallengeFeed;
