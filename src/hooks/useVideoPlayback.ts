
import { useState, useEffect, useRef } from 'react';

export const useVideoPlayback = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);

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

  return {
    activeIndex,
    feedRef
  };
};
