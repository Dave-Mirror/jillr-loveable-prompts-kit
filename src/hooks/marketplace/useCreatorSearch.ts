
import { useState, useEffect } from 'react';
import { mockCreators } from '@/data/mockCreators';

interface Creator {
  id: string;
  name: string;
  avatar: string;
  niche: string;
  reach: number;
  successRate: number;
  badges: string[];
  engagementRate: number;
  region: string;
  matchScore: number;
  bio?: string;
  previousBrands?: string[];
  socialLinks?: { platform: string; url: string; followers: number }[];
  contentSamples?: { type: string; thumbnail: string; engagement: number }[];
}

interface Filters {
  niche: string[];
  region: string[];
  engagement: number[];
  matchScore: number;
  searchTerm?: string;
}

export function useCreatorSearch(filters: Filters) {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCreators = async () => {
      setIsLoading(true);
      
      try {
        // In a real implementation, this would be an API call with the filters
        // For now, we'll use mock data and filter it client-side
        
        setTimeout(() => {
          let filteredCreators = [...mockCreators];
          
          // Filter by niche
          if (filters.niche.length > 0) {
            filteredCreators = filteredCreators.filter(
              creator => filters.niche.includes(creator.niche)
            );
          }
          
          // Filter by region
          if (filters.region.length > 0) {
            filteredCreators = filteredCreators.filter(
              creator => filters.region.includes(creator.region)
            );
          }
          
          // Filter by engagement range
          filteredCreators = filteredCreators.filter(
            creator => 
              creator.engagementRate >= filters.engagement[0] &&
              creator.engagementRate <= filters.engagement[1]
          );
          
          // Filter by match score
          filteredCreators = filteredCreators.filter(
            creator => creator.matchScore >= filters.matchScore
          );
          
          // Filter by search term
          if (filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase();
            filteredCreators = filteredCreators.filter(
              creator => 
                creator.name.toLowerCase().includes(searchLower) ||
                creator.niche.toLowerCase().includes(searchLower) ||
                creator.region.toLowerCase().includes(searchLower) ||
                (creator.bio && creator.bio.toLowerCase().includes(searchLower))
            );
          }
          
          // Sort by match score (highest first)
          filteredCreators.sort((a, b) => b.matchScore - a.matchScore);
          
          setCreators(filteredCreators);
          setIsLoading(false);
        }, 800); // Simulate API delay
        
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };
    
    fetchCreators();
  }, [filters]);

  return { creators, isLoading, error };
}
