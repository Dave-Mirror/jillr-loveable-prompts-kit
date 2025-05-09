
import React, { useState, useEffect } from 'react';
import ChallengeGrid from '@/components/explore/ChallengeGrid';
import ExplorePromoBanner from '@/components/explore/ExplorePromoBanner';
import PageContainer from '@/components/navigation/PageContainer';
import ChallengeFilter from '@/components/explore/ChallengeFilter';
import { getChallenges } from '@/utils/challenge/rewards/api';
import { Challenge, IndustryType, ChallengeType } from '@/utils/challenge/rewards/types';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Filter, Compass } from 'lucide-react';

const Explore = () => {
  // State für Filter und Challenges
  const [industry, setIndustry] = useState<IndustryType | 'all'>('all');
  const [challengeType, setChallengeType] = useState<ChallengeType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'rewards' | 'endDate'>('latest');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  // Laden der Challenges beim ersten Rendering und bei Filter-Änderungen
  useEffect(() => {
    const fetchChallenges = async () => {
      setIsLoading(true);
      try {
        const allChallenges = await getChallenges(industry);
        
        // Generieren zusätzlicher Demo-Challenges für eine umfangreichere Anzeige
        const demoExtraCount = 15; // Zusätzliche Demo-Challenges
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
            // Adding the missing properties to match Challenge type
            brandId: `demo-brand-${i % 5 + 1}`,
            brandName: `Demo Brand ${i % 5 + 1}`,
            locationBased: i % 3 === 0, // Every third challenge is location-based
            status: 'active',
            rewards: [],
            coinReward: (i % 3 + 1) * 50
          };
        });
        
        // Alle Challenges kombinieren
        const combinedChallenges = [...allChallenges, ...demoChallenges];
        
        // Filtern nach Challenge-Typ
        let filteredChallenges = combinedChallenges;
        if (challengeType !== 'all') {
          filteredChallenges = combinedChallenges.filter(challenge => challenge.type === challengeType);
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
          <div className="flex items-center justify-between">
            <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-bold mb-0">
              <Compass className="h-7 w-7 text-jillr-neonPurple" /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Entdecke Challenges
              </span>
            </h1>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-jillr-border bg-jillr-darkAccent hover:bg-jillr-darkLight text-sm font-medium transition-all"
            >
              <Filter className="h-4 w-4" />
              Filter {showFilters ? 'ausblenden' : 'anzeigen'}
            </button>
          </div>
          
          {showFilters && (
            <ChallengeFilter
              industry={industry}
              challengeType={challengeType}
              sortBy={sortBy}
              setIndustry={setIndustry}
              setChallengeType={setChallengeType}
              setSortBy={setSortBy}
            />
          )}
          
          {isLoading ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 border-4 border-jillr-neonPurple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400 text-lg">Challenges werden geladen...</p>
            </div>
          ) : (
            <>
              {formattedChallenges.length > 0 ? (
                <div className="pb-8">
                  <ChallengeGrid challenges={formattedChallenges} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                  <Sparkles className="h-16 w-16 text-jillr-neonPurple mb-4 opacity-50" />
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Keine Challenges gefunden</h3>
                  <p className="text-gray-400 mb-6 max-w-lg">
                    Mit deinen aktuellen Filtereinstellungen wurden keine Challenges gefunden. Versuche andere Filter oder schau später wieder vorbei.
                  </p>
                  <button 
                    onClick={() => {
                      setIndustry('all');
                      setChallengeType('all');
                      setSortBy('latest');
                    }}
                    className="px-4 py-2 bg-jillr-neonPurple/20 hover:bg-jillr-neonPurple/30 text-jillr-neonPurple border border-jillr-neonPurple/30 rounded-lg transition-all"
                  >
                    Filter zurücksetzen
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Explore;
