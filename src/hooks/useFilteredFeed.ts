
import { useState, useMemo } from 'react';
import { FeedItem } from '@/utils/challenge/feed';

export type FilterType = 'all' | 'video' | 'photo' | 'ar' | 'geofencing';
export type SortType = 'latest' | 'popular' | 'trending';

export const useFilteredFeed = (feedItems: FeedItem[]) => {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('latest');

  // Apply filters and sorting to feed items
  const filteredItems = useMemo(() => {
    // Apply type filter
    let filtered = [...feedItems];
    
    if (filterType !== 'all') {
      filtered = filtered.filter(item => {
        // Check both challenge types and tags
        const challengeType = item.challenge.title.toLowerCase();
        const tags = item.tags.map(tag => tag.toLowerCase());
        
        return challengeType.includes(filterType) || 
               tags.some(tag => tag.includes(filterType));
      });
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          // Sort by likes count
          return b.likes - a.likes;
        case 'trending':
          // Sort by engagement (likes + comments + shares)
          const engagementA = a.likes + a.comments + a.shares;
          const engagementB = b.likes + b.comments + b.shares;
          return engagementB - engagementA;
        case 'latest':
        default:
          // Latest is the default sort (assume items are already in chronological order)
          return 0;
      }
    });
  }, [feedItems, filterType, sortBy]);

  // Type-safe handler functions
  const handleFilterChange = (type: string) => {
    setFilterType(type as FilterType);
  };
  
  const handleSortChange = (sort: string) => {
    setSortBy(sort as SortType);
  };

  return {
    filterType,
    setFilterType,
    sortBy,
    setSortBy,
    filteredItems,
    handleFilterChange,
    handleSortChange
  };
};
