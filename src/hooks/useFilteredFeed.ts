
import { useState, useMemo } from 'react';
import { FeedItem } from '@/components/challenge-feed/types';

export type FilterType = 'all' | 'video' | 'photo' | 'ar' | 'geofencing' | 'city_clash' | 'team_battle';
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
        // Check both challenge types and hashtags
        const challengeType = item.challenge?.title?.toLowerCase() || '';
        const hashtags = item.hashtags.map(tag => tag.toLowerCase());
        
        // Special handling for city_clash and team_battle
        if (filterType === 'city_clash') {
          return challengeType.includes('city') || 
                 challengeType.includes('clash') || 
                 hashtags.some(tag => tag.includes('city') || tag.includes('clash'));
        }
        
        if (filterType === 'team_battle') {
          return challengeType.includes('team') || 
                 challengeType.includes('battle') || 
                 hashtags.some(tag => tag.includes('team') || tag.includes('battle'));
        }
        
        return challengeType.includes(filterType) || 
               hashtags.some(tag => tag.includes(filterType));
      });
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          // Sort by likes count
          return b.likes - a.likes;
        case 'trending':
          // Sort by engagement (likes + comments count + shares)
          const engagementA = a.likes + a.commentCount + (a.shares || 0);
          const engagementB = b.likes + b.commentCount + (b.shares || 0);
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
