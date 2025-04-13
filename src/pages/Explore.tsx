
import React, { useState } from 'react';
import ExploreFilters, { typeIcons } from '@/components/explore/ExploreFilters';
import ChallengeGrid from '@/components/explore/ChallengeGrid';
import ExplorePromoBanner from '@/components/explore/ExplorePromoBanner';
import PageContainer from '@/components/navigation/PageContainer';

// Sample challenge data
const sampleChallenges = [
  {
    id: '1',
    title: 'Community Cleanup Challenge',
    description: 'Join our community cleanup event and earn rewards!',
    type: 'Community',
    hashtags: ['environment', 'community', 'cleanup'],
    xpReward: 500,
    endDate: '2025-05-01',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Street Photography Contest',
    description: 'Capture the essence of urban life in your city',
    type: 'Photo & Video',
    hashtags: ['photography', 'urban', 'contest'],
    xpReward: 750,
    endDate: '2025-05-15',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'Fitness 30-Day Challenge',
    description: 'Complete daily workouts for 30 days',
    type: 'Fitness',
    hashtags: ['fitness', 'health', '30days'],
    xpReward: 1000,
    endDate: '2025-06-01',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

// Available challenge types (derived from the typeIcons object plus 'all')
const availableTypes = ['all', ...Object.keys(typeIcons)];

const Explore = () => {
  // State for filter settings
  const [filter, setFilter] = useState({
    type: 'all',
    sort: 'latest'
  });

  // Filtered challenges based on the current filter
  const filteredChallenges = sampleChallenges.filter(challenge => 
    filter.type === 'all' || challenge.type === filter.type
  );

  return (
    <PageContainer previousPage="/" nextPage="/leaderboard">
      <div className="container mx-auto max-w-6xl">
        <ExplorePromoBanner />
        <ExploreFilters 
          filter={filter}
          filterTypes={availableTypes}
          setFilter={setFilter}
        />
        <div className="mt-6">
          <ChallengeGrid challenges={filteredChallenges} />
        </div>
      </div>
    </PageContainer>
  );
};

export default Explore;
