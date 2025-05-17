
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getChallenges } from '@/utils/challenge/rewards/api';
import { Challenge, IndustryType, ChallengeType } from '@/utils/challenge/rewards/types';
import ExploreHeader from './ExploreHeader';
import ExploreFilters from './ExploreFilters';
import ChallengeGrid from './ChallengeGrid';
import LoadingSkeleton from './LoadingSkeleton';
import EmptyState from './EmptyState';
import ExplorePromoBanner from './ExplorePromoBanner';
import PageContainer from '@/components/navigation/PageContainer';

const ExploreContainer = () => {
  // State for filters and challenges
  const [industry, setIndustry] = useState<IndustryType | 'all'>('all');
  const [challengeType, setChallengeType] = useState<ChallengeType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'rewards' | 'endDate'>('latest');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Available filter options
  const [availableIndustries, setAvailableIndustries] = useState<string[]>([]);
  const [availableChallengeTypes, setAvailableChallengeTypes] = useState<string[]>([]);
  
  // Counter for active filters
  const activeFiltersCount = 
    (industry !== 'all' ? 1 : 0) + 
    (challengeType !== 'all' ? 1 : 0) + 
    (sortBy !== 'latest' ? 1 : 0);

  // Reset function for all filters
  const resetFilters = () => {
    setIndustry('all');
    setChallengeType('all');
    setSortBy('latest');
  };

  // Load challenges on first render
  useEffect(() => {
    const fetchChallenges = async () => {
      setIsLoading(true);
      try {
        const allChallenges = await getChallenges('all'); // Load all challenges
        
        // Generate additional demo challenges for a more comprehensive display
        const demoExtraCount = 15; // Additional demo challenges
        const demoChallenges: Challenge[] = Array.from({ length: demoExtraCount }, (_, i) => {
          const challengeId = `challenge-${allChallenges.length + i + 1}`;
          const industryType = ['Fashion', 'Beauty', 'Sport', 'Tech', 'Food'][i % 5] as IndustryType;
          const challengeType = ['Video', 'Photo & Video', 'Geofencing', 'AR', 'Fashion', 'Sport', 'Beauty'][i % 7] as ChallengeType;
          
          return {
            id: challengeId,
            title: `jillr Challenge ${i + 1}`,
            description: `Demo Challenge ${i + 1} für die jillr Plattform. Mach mit und gewinne Preise!`,
            type: challengeType,
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + (i % 5 + 1) * 7 * 24 * 60 * 60 * 1000).toISOString(),
            xpReward: (i % 5 + 1) * 100,
            imageUrl: `/placeholder.svg`,
            hashtags: [`jillr`, `challenge${i+1}`, `fun`],
            industry: industryType,
            brandId: `demo-brand-${i % 5 + 1}`,
            brandName: `Demo Brand ${i % 5 + 1}`,
            locationBased: i % 3 === 0,
            status: 'active',
            rewards: [],
            coinReward: (i % 3 + 1) * 50
          };
        });
        
        // Combine all challenges
        const combinedChallenges = [...allChallenges, ...demoChallenges];
        setChallenges(combinedChallenges);
        
        // Extract available filter options
        const uniqueIndustries = Array.from(new Set(combinedChallenges.map(c => c.industry)));
        const uniqueTypes = Array.from(new Set(combinedChallenges.map(c => c.type)));
        
        setAvailableIndustries(uniqueIndustries);
        setAvailableChallengeTypes(uniqueTypes);
        
      } catch (error) {
        console.error('Error loading challenges:', error);
        toast({
          title: 'Error loading',
          description: 'The challenges could not be loaded. Please try again later.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, [toast]);
  
  // Filter and sort challenges when filters change
  useEffect(() => {
    if (!challenges.length) return;
    
    let result = [...challenges];
    
    // Filter by industry
    if (industry !== 'all') {
      result = result.filter(challenge => challenge.industry === industry);
    }
    
    // Filter by challenge type
    if (challengeType !== 'all') {
      result = result.filter(challenge => challenge.type === challengeType);
    }
    
    // Sort by selected criterion
    if (sortBy === 'latest') {
      result.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    } else if (sortBy === 'rewards') {
      result.sort((a, b) => (b.xpReward || 0) - (a.xpReward || 0));
    } else if (sortBy === 'endDate') {
      result.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
    }
    
    setFilteredChallenges(result);
    
  }, [challenges, industry, challengeType, sortBy]);

  // Convert challenges for the ChallengeGrid component
  const formattedChallenges = filteredChallenges.map(challenge => ({
    id: challenge.id,
    title: challenge.title,
    description: challenge.description,
    type: challenge.type,
    hashtags: challenge.hashtags || [],
    xpReward: challenge.xpReward || 0,
    endDate: challenge.endDate || '',
    imageUrl: challenge.imageUrl || '/placeholder.svg'
  }));

  return (
    <PageContainer previousPage="/" nextPage="/leaderboard">
      <div className="container mx-auto max-w-6xl pb-20">
        <ExplorePromoBanner />
        
        <div className="mt-6 space-y-6">
          <ExploreHeader />
          
          <ExploreFilters 
            industry={industry}
            challengeType={challengeType}
            sortBy={sortBy}
            setIndustry={setIndustry}
            setChallengeType={setChallengeType}
            setSortBy={setSortBy}
            availableIndustries={availableIndustries}
            availableChallengeTypes={availableChallengeTypes}
            activeFiltersCount={activeFiltersCount}
            resetFilters={resetFilters}
          />
          
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {formattedChallenges.length > 0 ? (
                <div className="pb-8">
                  <ChallengeGrid challenges={formattedChallenges} />
                </div>
              ) : (
                <EmptyState resetFilters={resetFilters} />
              )}
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default ExploreContainer;
