
import React, { useState } from 'react';
import ExploreFilters, { typeIcons } from '@/components/explore/ExploreFilters';
import ChallengeGrid from '@/components/explore/ChallengeGrid';
import ExplorePromoBanner from '@/components/explore/ExplorePromoBanner';
import PageContainer from '@/components/navigation/PageContainer';

// Erweiterte Sample-Challenge-Daten
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
  },
  {
    id: '4',
    title: 'Dance Challenge',
    description: 'Show off your best dance moves to the latest hit songs',
    type: 'Dance',
    hashtags: ['dance', 'music', 'moves'],
    xpReward: 800,
    endDate: '2025-05-20',
    imageUrl: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    title: 'Food Photography',
    description: 'Capture the most delicious food photos to win restaurant vouchers',
    type: 'Food',
    hashtags: ['food', 'photography', 'culinary'],
    xpReward: 600,
    endDate: '2025-05-25',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    title: 'Travel Vlog Challenge',
    description: 'Share your journey through a stunning travel vlog',
    type: 'Travel',
    hashtags: ['travel', 'vlog', 'adventure'],
    xpReward: 850,
    endDate: '2025-06-10',
    imageUrl: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '7',
    title: 'Fashion Week Style',
    description: 'Create your own fashion week inspired outfits',
    type: 'Fashion',
    hashtags: ['fashion', 'style', 'outfits'],
    xpReward: 700,
    endDate: '2025-06-05',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '8',
    title: 'Beauty Transformation',
    description: 'Show your stunning before and after makeup transformation',
    type: 'Beauty',
    hashtags: ['beauty', 'makeup', 'transformation'],
    xpReward: 600,
    endDate: '2025-05-30',
    imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '9',
    title: 'AR Scavenger Hunt',
    description: 'Find all AR items hidden across the city',
    type: 'AR',
    hashtags: ['AR', 'technology', 'gaming'],
    xpReward: 950,
    endDate: '2025-06-15',
    imageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '10',
    title: 'Local Restaurant Reviews',
    description: 'Review local restaurants and help others discover hidden gems',
    type: 'Review',
    hashtags: ['food', 'review', 'local'],
    xpReward: 550,
    endDate: '2025-06-20',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '11',
    title: 'Sustainable Fashion Challenge',
    description: 'Create outfits using only sustainable or second-hand items',
    type: 'Fashion',
    hashtags: ['sustainable', 'fashion', 'eco'],
    xpReward: 800,
    endDate: '2025-07-01',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '12',
    title: 'Pet Tricks',
    description: 'Show off your pet\'s best tricks and talents',
    type: 'Community',
    hashtags: ['pets', 'animals', 'tricks'],
    xpReward: 650,
    endDate: '2025-06-25',
    imageUrl: 'https://images.unsplash.com/photo-1583511655826-05700442982d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
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
