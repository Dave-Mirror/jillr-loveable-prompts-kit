
import React, { useState, useEffect } from 'react';
import ChallengeGrid from '@/components/explore/ChallengeGrid';
import ExplorePromoBanner from '@/components/explore/ExplorePromoBanner';
import PageContainer from '@/components/navigation/PageContainer';
import ChallengeFilter from '@/components/explore/ChallengeFilter';
import { getChallenges } from '@/utils/challenge/rewards/api';
import { Challenge, IndustryType, ChallengeType } from '@/utils/challenge/rewards/types';
import { useToast } from '@/hooks/use-toast';

const Explore = () => {
  // State für Filter und Challenges
  const [industry, setIndustry] = useState<IndustryType | 'all'>('all');
  const [challengeType, setChallengeType] = useState<ChallengeType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'rewards' | 'endDate'>('latest');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Laden der Challenges beim ersten Rendering und bei Filter-Änderungen
  useEffect(() => {
    const fetchChallenges = async () => {
      setIsLoading(true);
      try {
        const allChallenges = await getChallenges(industry);
        
        // Filtern nach Challenge-Typ
        let filteredChallenges = allChallenges;
        if (challengeType !== 'all') {
          filteredChallenges = allChallenges.filter(challenge => challenge.type === challengeType);
        }
        
        // Sortieren nach ausgewähltem Kriterium
        const sortedChallenges = [...filteredChallenges];
        if (sortBy === 'latest') {
          sortedChallenges.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        } else if (sortBy === 'rewards') {
          sortedChallenges.sort((a, b) => (b.xpReward || 0) - (a.xpReward || 0));
        } else if (sortBy === 'endDate') {
          sortedChallenges.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
        }
        
        setChallenges(sortedChallenges);
      } catch (error) {
        console.error('Fehler beim Laden der Challenges:', error);
        toast({
          title: 'Fehler beim Laden',
          description: 'Die Challenges konnten nicht geladen werden. Bitte versuche es später erneut.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, [industry, challengeType, sortBy, toast]);

  // Umwandlung der Challenges für die ChallengeGrid-Komponente
  const formattedChallenges = challenges.map(challenge => ({
    id: challenge.id,
    title: challenge.title,
    description: challenge.description,
    type: challenge.type,
    hashtags: challenge.hashtags,
    xpReward: challenge.xpReward,
    endDate: challenge.endDate,
    imageUrl: challenge.imageUrl
  }));

  return (
    <PageContainer previousPage="/" nextPage="/leaderboard">
      <div className="container mx-auto max-w-6xl pb-20">
        <ExplorePromoBanner />
        
        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-4">Entdecke Challenges</h1>
          
          <ChallengeFilter
            industry={industry}
            challengeType={challengeType}
            sortBy={sortBy}
            setIndustry={setIndustry}
            setChallengeType={setChallengeType}
            setSortBy={setSortBy}
          />
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-jillr-neonPurple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Challenges werden geladen...</p>
            </div>
          ) : (
            <ChallengeGrid challenges={formattedChallenges} />
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Explore;
