
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFeed } from '@/hooks/useFeed';
import { useFeedInteractions } from '@/hooks/useFeedInteractions';
import FeedItem from '@/components/challenge-feed/FeedItem';
import FeedFooter from '@/components/challenge-feed/FeedFooter';
import LoadingSpinner from '@/components/challenge-feed/LoadingSpinner';

const ChallengeFeed = () => {
  const {
    feedItems, 
    setFeedItems,
    activeIndex, 
    loading, 
    showAchievement,
    feedRef,
    toggleAchievement
  } = useFeed();
  
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
    <div ref={feedRef} className="pb-20">
      {feedItems.map((item, index) => (
        <FeedItem
          key={item.id}
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
      ))}
      
      {/* End of feed indicator */}
      {feedItems.length > 0 && <FeedFooter />}
    </div>
  );
};

export default ChallengeFeed;
