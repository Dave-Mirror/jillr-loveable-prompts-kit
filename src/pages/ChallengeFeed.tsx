
import React, { useState } from 'react';
import { useFeed } from '@/hooks/useFeed';
import { useFeedInteractions } from '@/hooks/useFeedInteractions';
import { useVideoPlayback } from '@/hooks/useVideoPlayback';
import { useAchievementManager } from '@/hooks/useAchievementManager';
import { useFilteredFeed } from '@/hooks/useFilteredFeed';
import FeedItem from '@/components/challenge-feed/FeedItem';
import FeedFooter from '@/components/challenge-feed/FeedFooter';
import LoadingSpinner from '@/components/challenge-feed/LoadingSpinner';
import FeedFilterBar from '@/components/challenge-feed/FeedFilterBar';
import ChallengeCard from '@/components/ChallengeCard';
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
  
  // Add state for showing/hiding filters
  const [showFilters, setShowFilters] = useState(true);
  
  // Add toggle function for filters
  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  const {
    handleLike,
    handleComment,
    handleShare,
    handleSupportCause,
    handleJoinChallenge,
    addComment,
    activeComments,
    setActiveComments,
  } = useFeedInteractions(feedItems, setFeedItems);

  // Convert feed items to challenge format for cards
  const challengesFromFeed = filteredItems.map(item => ({
    id: item.id,
    title: item.challengeInfo?.title || 'Challenge',
    description: item.caption,
    type: item.type === 'challenge' ? 'video' : item.type,
    imageUrl: item.mediaUrl,
    reward: item.challengeInfo?.reward,
    challengeId: item.challengeId,
    expiresIn: undefined
  }));

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-cosmic-dark">
      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeedFilterBar 
            filterType={filterType}
            setFilterType={handleFilterChange}
            sortBy={sortBy}
            setSortBy={handleSortChange}
            showFilters={showFilters}
            toggleFilters={toggleFilters}
          />
        </div>
      </div>
      
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AnimatePresence>
          {challengesFromFeed.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {challengesFromFeed.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeInOut"
                  }}
                  className="w-full"
                >
                  <ChallengeCard
                    challenge={challenge}
                    onJoinClick={handleJoinChallenge}
                    className="h-full"
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-[50vh] text-center p-4"
            >
              <div className="glass-card rounded-2xl p-8 max-w-md mx-auto">
                <h3 className="text-xl font-bold text-[var(--txt)] mb-4">Keine Inhalte gefunden</h3>
                <p className="text-sm text-[var(--txt-dim)]">
                  Versuche einen anderen Filter oder komme später wieder.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* End of feed indicator */}
        {challengesFromFeed.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <FeedFooter />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChallengeFeed;
