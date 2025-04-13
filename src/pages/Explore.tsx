
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ChallengeCard from '../components/ChallengeCard';
import { toast } from '@/hooks/use-toast';

// Challenge type icons
const typeIcons: Record<string, string> = {
  'Photo & Video': '📸',
  'AR': '🥽',
  'Geofencing': '📍',
  'Fitness': '💪',
  'Sustainability': '♻️',
  'Gamification': '🎮',
  'Community': '👥',
  'Battle': '⚔️',
  'Review': '⭐',
  'Travel': '✈️',
  'Food': '🍔',
  'Fashion': '👕',
  'Beauty': '💄',
  'Dance': '💃',
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

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold neon-text">Explore Challenges</h1>
        
        <div className="flex flex-wrap gap-2">
          <select
            className="glassmorphism px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jillr-neonPurple"
            value={filter.type}
            onChange={(e) => setFilter(prev => ({ ...prev, type: e.target.value }))}
          >
            {filterTypes.map(type => (
              <option key={type} value={type} className="bg-jillr-dark">
                {type === 'all' ? 'All Types' : `${typeIcons[type] || '🎯'} ${type}`}
              </option>
            ))}
          </select>
          
          <select
            className="glassmorphism px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jillr-neonPurple"
            value={filter.sort}
            onChange={(e) => setFilter(prev => ({ ...prev, sort: e.target.value }))}
          >
            <option value="latest" className="bg-jillr-dark">Latest</option>
            <option value="rewards" className="bg-jillr-dark">Highest Rewards</option>
          </select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div key={index} className="neon-card animate-pulse">
              <div className="neon-card-content p-6">
                <div className="aspect-video bg-jillr-darkBlue/30 rounded-lg mb-3"></div>
                <div className="h-6 bg-jillr-darkBlue/30 rounded-lg mb-2"></div>
                <div className="h-4 bg-jillr-darkBlue/30 rounded-lg mb-2"></div>
                <div className="h-4 bg-jillr-darkBlue/30 rounded-lg w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedChallenges.map(challenge => (
            <ChallengeCard
              key={challenge.id}
              id={challenge.id}
              title={challenge.title}
              description={challenge.description}
              type={challenge.type}
              hashtags={challenge.hashtags}
              xpReward={challenge.xpReward}
              endDate={challenge.endDate}
              imageUrl={challenge.imageUrl}
            />
          ))}
        </div>
      )}
      
      {!isLoading && sortedChallenges.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg text-muted-foreground mb-4">No challenges found with the selected filters</p>
          <button 
            className="neon-button"
            onClick={() => setFilter({ type: 'all', sort: 'latest' })}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Explore;
