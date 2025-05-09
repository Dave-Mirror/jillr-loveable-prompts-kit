
import React from 'react';
import { useFeed } from '@/hooks/useFeed';
import { useFeedInteractions } from '@/hooks/useFeedInteractions';
import { useVideoPlayback } from '@/hooks/useVideoPlayback';
import { useAchievementManager } from '@/hooks/useAchievementManager';
import { useFilteredFeed } from '@/hooks/useFilteredFeed';
import FeedItem from '@/components/challenge-feed/FeedItem';
import FeedFooter from '@/components/challenge-feed/FeedFooter';
import LoadingSpinner from '@/components/challenge-feed/LoadingSpinner';
import FeedFilterBar from '@/components/challenge-feed/FeedFilterBar';
import { motion, AnimatePresence } from 'framer-motion';

const ChallengeFeed = () => {
  const { feedItems, setFeedItems, loading } = useFeed();
  const { activeIndex, feedRef } = useVideoPlayback();
  const { showAchievement, toggleAchievement } = useAchievementManager();
  const { 
    filterType, 
    sortBy, 
    filteredItems, 
    handleFilterChange, 
    handleSortChange 
  } = useFilteredFeed(feedItems);
  
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
    <div className="flex flex-col h-full">
      <FeedFilterBar 
        filterType={filterType}
        setFilterType={handleFilterChange}
        sortBy={sortBy}
        setSortBy={handleSortChange}
      />
      
      <div ref={feedRef} className="pb-20 scroll-smooth flex-1">
        <AnimatePresence>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
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
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-[60vh] text-center p-4"
            >
              <p className="text-lg font-medium mb-2">Keine Inhalte gefunden</p>
              <p className="text-sm text-muted-foreground">
                Versuche einen anderen Filter oder komme später wieder.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* End of feed indicator */}
        {filteredItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <FeedFooter />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChallengeFeed;
