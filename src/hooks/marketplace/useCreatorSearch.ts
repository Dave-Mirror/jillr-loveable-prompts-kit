
import { useState, useEffect } from 'react';
import { mockCreators } from '@/data/mockCreators';
import { useActiveChallenge } from './useActiveChallenge';

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
  const { activeChallenge } = useActiveChallenge();

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
                (creator.bio && creator.bio.toLowerCase().includes(searchLower)) ||
                creator.badges.some(badge => badge.toLowerCase().includes(searchLower))
            );
          }
          
          // Apply AI matchmaking logic based on active challenge
          if (activeChallenge) {
            filteredCreators = filteredCreators.map(creator => {
              let bonusScore = 0;
              
              // Boost if creator's niche matches challenge category
              if (activeChallenge.category && creator.niche === activeChallenge.category) {
                bonusScore += 20;
              } else if (activeChallenge.category && creator.niche.includes(activeChallenge.category)) {
                bonusScore += 10;
              }
              
              // Boost if target audience gender is female and creator has high female audience
              if (activeChallenge.targetAudience?.gender === 'female' && 
                  creator.badges.some(badge => badge.includes('Female Audience'))) {
                bonusScore += 15;
              }
              
              // Boost if creator is in the target region
              if (activeChallenge.targetAudience?.region && 
                  creator.region === activeChallenge.targetAudience.region) {
                bonusScore += 10;
              }
              
              // Apply bonus to match score (capped at 100)
              const newMatchScore = Math.min(100, creator.matchScore + bonusScore);
              
              return {
                ...creator,
                matchScore: newMatchScore,
                badges: creator.badges.concat(
                  bonusScore > 0 ? [`+${bonusScore}% Challenge Match`] : []
                )
              };
            });
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
  }, [filters, activeChallenge]);

  return { creators, isLoading, error };
}
