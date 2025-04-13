
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import ExploreFilters, { typeIcons } from '../components/explore/ExploreFilters';
import ChallengeGrid from '../components/explore/ChallengeGrid';
import LoadingSkeleton from '../components/explore/LoadingSkeleton';
import EmptyState from '../components/explore/EmptyState';

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
            // Using a placeholder image if none is provided
            imageUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?q=80&w=500`
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
