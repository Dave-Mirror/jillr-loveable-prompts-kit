
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { FeedItem } from '@/utils/challenge/feed';
import { joinChallenge } from '@/utils/challenge/feed';

interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  text: string;
  timestamp: string;
  likes: number;
}

export const useFeedInteractions = (
  feedItems: FeedItem[],
  setFeedItems: React.Dispatch<React.SetStateAction<FeedItem[]>>
) => {
  // Track which feed item's comments are currently open
  const [activeComments, setActiveComments] = useState<string | null>(null);

  // Handle like interaction
  const handleLike = (id: string) => {
    setFeedItems(items => 
      items.map(item => 
        item.id === id 
          ? { 
              ...item, 
              liked: !item.liked, 
              likes: item.liked ? item.likes - 1 : item.likes + 1,
              impactPoints: item.liked ? item.impactPoints - 2 : item.impactPoints + 2
            } 
          : item
      )
    );
  };

  // Handle comment interaction
  const handleComment = (id: string) => {
    // Toggle comments view
    setActiveComments(activeComments === id ? null : id);
  };

  // Add a comment to a feed item
  const addComment = (feedItemId: string, commentText: string) => {
    const now = new Date();
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId: 'current-user',
      username: 'Du',
      userAvatar: '/placeholder.svg',
      text: commentText,
      timestamp: now.toLocaleTimeString(),
      likes: 0
    };
    
    setFeedItems(items => 
      items.map(item => 
        item.id === feedItemId 
          ? { 
              ...item, 
              comments: item.comments + 1,
              commentsList: [...(item.commentsList || []), newComment]
            } 
          : item
      )
    );
    
    toast({
      title: "Kommentar hinzugefügt",
      description: "Dein Kommentar wurde erfolgreich gepostet.",
    });
  };

  // Handle share interaction
  const handleShare = (id: string) => {
    toast({
      title: "Share",
      description: "Share feature coming soon!",
    });
    
    setFeedItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, shares: item.shares + 1, impactPoints: item.impactPoints + 5 }
          : item
      )
    );
  };

  // Show unique feature: Support the cause
  const handleSupportCause = (id: string) => {
    toast({
      title: "Impact Made!",
      description: "Thank you for supporting this cause! +25 impact points awarded.",
      className: "bg-jillr-neonGreen/20"
    });
    
    setFeedItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, impactPoints: item.impactPoints + 25 }
          : item
      )
    );
  };

  // Handle join challenge action
  const handleJoinChallenge = async (challengeId: string, challengeTitle: string) => {
    try {
      await joinChallenge(challengeId);
      toast({
        title: "Challenge beigetreten",
        description: `Du nimmst jetzt an der Challenge "${challengeTitle}" teil!`,
        variant: "default"
      });
    } catch (error) {
      console.error('Failed to join challenge:', error);
      toast({
        title: "Fehler",
        description: "Beitritt zur Challenge fehlgeschlagen.",
        variant: "destructive"
      });
    }
  };

  return {
    handleLike,
    handleComment,
    handleShare,
    handleSupportCause,
    handleJoinChallenge,
    addComment,
    activeComments,
    setActiveComments,
  };
};
