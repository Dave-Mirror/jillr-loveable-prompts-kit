
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from './use-toast';
import { FeedItem } from '@/components/challenge-feed/types';

export const useFeedInteractions = (
  feedItems: FeedItem[],
  setFeedItems: React.Dispatch<React.SetStateAction<FeedItem[]>>
) => {
  const navigate = useNavigate();
  const [activeComments, setActiveComments] = useState<string | null>(null);

  const handleLike = useCallback((itemId: string) => {
    setFeedItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 } 
          : item
      )
    );
    
    toast({
      title: "Like gespeichert",
      description: "Dein Like wurde erfolgreich gespeichert."
    });
  }, [setFeedItems]);

  const handleComment = useCallback((itemId: string) => {
    setActiveComments(prev => prev === itemId ? null : itemId);
  }, []);

  const handleShare = useCallback((itemId: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Teile diesen Inhalt',
        text: 'Schau dir das an!',
        url: `${window.location.origin}/feed/${itemId}`,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/feed/${itemId}`);
      toast({
        title: "Link kopiert",
        description: "Link wurde in die Zwischenablage kopiert."
      });
    }
  }, []);

  const handleSupportCause = useCallback((itemId: string) => {
    toast({
      title: "Cause unterstützt!",
      description: "Vielen Dank für deine Unterstützung."
    });
  }, []);

  const handleJoinChallenge = useCallback((challengeId: string) => {
    // Navigiere zur Challenge-Detailseite
    navigate(`/challenge/${challengeId}`);
  }, [navigate]);

  const addComment = useCallback((itemId: string, comment: string) => {
    if (!comment.trim()) return;
    
    setFeedItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              comments: [
                { 
                  id: `comment-${Date.now()}`, 
                  username: 'Du', 
                  text: comment, 
                  timestamp: new Date().toISOString() 
                },
                ...item.comments
              ],
              commentCount: item.commentCount + 1
            } 
          : item
      )
    );
    
    toast({
      title: "Kommentar hinzugefügt",
      description: "Dein Kommentar wurde erfolgreich hinzugefügt."
    });
  }, [setFeedItems]);

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

export default useFeedInteractions;
