import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ExploreFilters, { typeIcons } from '../components/explore/ExploreFilters';
import ChallengeGrid from '../components/explore/ChallengeGrid';
import LoadingSkeleton from '../components/explore/LoadingSkeleton';
import EmptyState from '../components/explore/EmptyState';
import ExplorePromoBanner from '../components/explore/ExplorePromoBanner';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

// Challenge type images
const challengeTypeImages = {
  'Video': 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800',
  'Geofencing': 'https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?q=80&w=800',
  'Photo & Video': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800',
  'Fashion': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800',
  'Sport': 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=800',
  'AR': 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?q=80&w=800',
  'Beauty': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800',
  'Fitness': 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800',
  'Travel': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800',
  'Food': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800',
  'Dance': 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800',
  'Sustainability': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800',
  'Gamification': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800',
  'Community': 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800',
  'Battle': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800',
  'Review': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800',
  // Fallback für nicht definierte Typen
  'default': 'https://images.unsplash.com/photo-1579547621869-0dbd72cf4caa?q=80&w=800'
};

const Explore = () => {
  const [filter, setFilter] = useState({
    type: 'all',
    sort: 'latest'
  });
  const [challenges, setChallenges] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('challenges')
          .select('*')
          .eq('status', 'active');

        if (error) throw error;

        if (data) {
          // Format the challenges to match the expected structure
          const formattedChallenges = data.map(challenge => ({
            id: challenge.id,
            title: challenge.title,
            description: challenge.description,
            type: challenge.type,
            hashtags: challenge.hashtags || [],
            xpReward: challenge.xp_reward,
            endDate: challenge.end_date,
            // Use a thematically fitting image based on challenge type
            imageUrl: challengeTypeImages[challenge.type] || challengeTypeImages['default']
          }));
          setChallenges(formattedChallenges);
          
          // Extract unique categories for content rows
          const uniqueTypes = [...new Set(formattedChallenges.map(c => c.type))];
          setCategories(uniqueTypes);
        }
      } catch (error) {
        console.error("Error fetching challenges:", error);
        toast({
          title: "Error",
          description: "Failed to load challenges",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, [toast]);

  // Extract unique filter types from the challenges
  const filterTypes = ['all', ...new Set(challenges.map(challenge => challenge.type))];

  // Filter challenges based on the selected filter
  const filteredChallenges = challenges.filter(challenge => 
    filter.type === 'all' || challenge.type === filter.type
  );

  // Sort challenges based on the selected sort option
  const sortedChallenges = [...filteredChallenges].sort((a, b) => {
    if (filter.sort === 'latest') {
      return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
    } else if (filter.sort === 'rewards') {
      return b.xpReward - a.xpReward;
    }
    return 0;
  });

  const resetFilters = () => {
    setFilter({ type: 'all', sort: 'latest' });
  };

  // Get featured challenges (top 4 with highest XP rewards)
  const featuredChallenges = [...challenges]
    .sort((a, b) => b.xpReward - a.xpReward)
    .slice(0, 4);

  if (isLoading) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold neon-text mb-8">Explore Challenges</h1>
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Banner Section */}
      {featuredChallenges.length > 0 && (
        <div className="relative h-[70vh] w-full">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${featuredChallenges[0].imageUrl})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-jillr-dark via-jillr-dark/60 to-transparent" />
          </div>
          
          <div className="container relative z-10 h-full flex flex-col justify-end pb-16">
            <h1 className="text-5xl font-bold mb-2">{featuredChallenges[0].title}</h1>
            <p className="text-xl max-w-2xl mb-6">{featuredChallenges[0].description}</p>
            <div className="flex space-x-4">
              <button className="neon-button flex items-center">
                Join Challenge <ChevronRight className="ml-2" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg flex items-center">
                More Info
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container py-10">
        {/* Notification Banner */}
        <ExplorePromoBanner />
        
        {/* Filters Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sticky top-0 z-20 py-4 bg-jillr-dark/80 backdrop-blur-lg">
          <h2 className="text-2xl font-bold mb-4 md:mb-0">Discover Challenges</h2>
          <ExploreFilters 
            filter={filter} 
            filterTypes={filterTypes} 
            setFilter={setFilter} 
          />
        </div>
        
        {filter.type !== 'all' ? (
          // Filtered Grid View
          sortedChallenges.length > 0 ? (
            <ChallengeGrid challenges={sortedChallenges} />
          ) : (
            <EmptyState resetFilters={resetFilters} />
          )
        ) : (
          // Netflix-style Category Rows
          <div className="space-y-12">
            {/* Trending Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Trending Challenges</h2>
                <button className="text-sm flex items-center text-gray-400 hover:text-white">
                  See all <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              
              <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                {featuredChallenges.map((challenge) => (
                  <div key={challenge.id} className="min-w-[280px] flex-shrink-0">
                    <Card className="neon-card h-full">
                      <div 
                        className="h-40 w-full rounded-t-xl bg-cover bg-center" 
                        style={{ backgroundImage: `url(${challenge.imageUrl})` }}
                      />
                      <CardContent className="p-4">
                        <h3 className="font-bold truncate">{challenge.title}</h3>
                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{challenge.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Category Rows */}
            {categories.map((category) => {
              const categoryChallenges = challenges.filter(c => c.type === category);
              if (categoryChallenges.length === 0) return null;
              
              return (
                <section key={category}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">{category} Challenges</h2>
                    <button className="text-sm flex items-center text-gray-400 hover:text-white">
                      See all <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                  
                  <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                    {categoryChallenges.map((challenge) => (
                      <div key={challenge.id} className="min-w-[280px] flex-shrink-0">
                        <Card className="neon-card h-full">
                          <div 
                            className="h-40 w-full rounded-t-xl bg-cover bg-center" 
                            style={{ backgroundImage: `url(${challenge.imageUrl})` }}
                          />
                          <CardContent className="p-4">
                            <h3 className="font-bold truncate">{challenge.title}</h3>
                            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{challenge.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
