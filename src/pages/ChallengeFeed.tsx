
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

  // Normalize data before rendering to ensure consistency
  const normalizeChallenge = (item: any) => ({
    id: item.id ?? crypto.randomUUID(),
    title: item.challengeInfo?.title ?? item.title ?? "Untitled Challenge",
    description: item.caption ?? item.description ?? "",
    category: item.category ?? (item.type === 'challenge' ? 'city-clash' : item.type) ?? "city-clash",
    type: item.type ?? item.category ?? "challenge", 
    xp: parseInt(item.challengeInfo?.reward?.replace(' XP', '') ?? item.xp ?? '100'),
    thumbnailUrl: item.mediaUrl ?? item.thumbnailUrl ?? item.imageUrl ?? "",
    thumbnailAlt: item.thumbnailAlt ?? item.challengeInfo?.title ?? item.title ?? "Challenge thumbnail",
    tags: item.hashtags ?? item.tags ?? [],
    stats: { 
      likes: item.likes ?? 0, 
      comments: item.commentCount ?? 0, 
      shares: item.shares ?? 0 
    },
    challengeId: item.challengeId ?? item.id,
    reward: item.challengeInfo?.reward ?? `${item.xp ?? 100} XP`,
    expiresIn: item.expiresIn,
    imageUrl: item.mediaUrl ?? item.thumbnailUrl ?? item.imageUrl ?? "" // Fallback for legacy support
  });

  // Convert feed items to normalized challenge format
  const normalizedChallenges = filteredItems.map(normalizeChallenge);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-cosmic-dark">
      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-40">
        <div className="page-container">
          <div className="feed-header">
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
      </div>
      
      {/* Main Content Container */}
      <div className="page-container">
        <AnimatePresence>
          {normalizedChallenges.length > 0 ? (
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" id="feed-grid">
              {normalizedChallenges.map((challenge, index) => (
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
                    className="h-full challenge-card"
                  />
                </motion.div>
              ))}
            </section>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-[50vh] text-center"
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
        {normalizedChallenges.length > 0 && (
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
