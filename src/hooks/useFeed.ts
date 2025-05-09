
import { useState, useEffect, useRef } from 'react';
import { fetchFeedData, FeedItem } from '@/utils/challenge/feed';
import { toast } from '@/hooks/use-toast';

export const useFeed = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);

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

  // Handle scroll to play/pause videos
  useEffect(() => {
    const handleScroll = () => {
      if (feedRef.current) {
        const items = feedRef.current.querySelectorAll('.feed-item');
        if (items.length === 0) return;
        
        let newActiveIndex = activeIndex;
        
        items.forEach((item, index) => {
          const rect = item.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
          
          if (isVisible && newActiveIndex !== index) {
            newActiveIndex = index;
          }
        });
        
        if (newActiveIndex !== activeIndex) {
          setActiveIndex(newActiveIndex);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  // Handle showing achievement details
  const toggleAchievement = (id: string | null) => {
    setShowAchievement(showAchievement === id ? null : id);
  };

  return {
    feedItems,
    setFeedItems,
    activeIndex,
    loading,
    showAchievement,
    feedRef,
    toggleAchievement,
  };
};
