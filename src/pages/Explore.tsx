
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import ExploreFilters, { typeIcons } from '../components/explore/ExploreFilters';
import ChallengeGrid from '../components/explore/ChallengeGrid';
import LoadingSkeleton from '../components/explore/LoadingSkeleton';
import EmptyState from '../components/explore/EmptyState';

// Thematische Bilder für jeden Challenge-Typ
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
            // Verwende ein thematisch passendes Bild basierend auf dem Challenge-Typ
            imageUrl: challengeTypeImages[challenge.type] || challengeTypeImages['default']
          }));
          setChallenges(formattedChallenges);
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
  }, []);

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

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold neon-text">Explore Challenges</h1>
        <ExploreFilters 
          filter={filter} 
          filterTypes={filterTypes} 
          setFilter={setFilter} 
        />
      </div>
      
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        sortedChallenges.length > 0 ? (
          <ChallengeGrid challenges={sortedChallenges} />
        ) : (
          <EmptyState resetFilters={resetFilters} />
        )
      )}
    </div>
  );
};

export default Explore;
