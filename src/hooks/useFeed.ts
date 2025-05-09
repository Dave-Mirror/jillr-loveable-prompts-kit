
import { useState, useEffect } from 'react';
import { fetchFeedData, FeedItem } from '@/utils/challenge/feed';
import { toast } from '@/hooks/use-toast';

export const useFeed = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load feed items
  useEffect(() => {
    const loadFeed = async () => {
      setLoading(true);
      try {
        const data = await fetchFeedData();
        setFeedItems(data);
      } catch (error) {
        console.error('Failed to fetch feed:', error);
        toast({
          title: "Fehler beim Laden",
          description: "Feed konnte nicht geladen werden.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadFeed();
  }, []);

  return {
    feedItems,
    setFeedItems,
    loading,
  };
};
