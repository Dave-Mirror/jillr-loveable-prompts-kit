
import React, { useState } from 'react';
import ChallengeCard from '../components/ChallengeCard';

// Mock data - in a real app this would come from an API/database
const mockChallenges = [
  {
    id: '1',
    title: 'Summer Dance Challenge',
    description: 'Show your best moves with this trending summer hit! Winners get exclusive badges.',
    type: 'Dance',
    hashtags: ['summerdance', 'vibes', 'moves'],
    xpReward: 500,
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    imageUrl: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=500'
  },
  {
    id: '2',
    title: 'City Parkour',
    description: 'Show your parkour skills in your city. Most creative jumps and flips win!',
    type: 'Sport',
    hashtags: ['parkour', 'urban', 'jump', 'flip'],
    xpReward: 750,
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    imageUrl: 'https://images.unsplash.com/photo-1504609813442-a9ead3caee88?q=80&w=500'
  },
  {
    id: '3',
    title: 'Makeup Transformation',
    description: 'Create an amazing before/after makeup transformation. Show your skills!',
    type: 'Beauty',
    hashtags: ['makeup', 'transformation', 'beauty', 'skills'],
    xpReward: 600,
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    imageUrl: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?q=80&w=500'
  },
  {
    id: '4',
    title: 'Singing Challenge',
    description: 'Cover this viral song and show off your vocal talent. Best covers get featured!',
    type: 'Music',
    hashtags: ['singing', 'cover', 'music', 'viral'],
    xpReward: 550,
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=500'
  },
  {
    id: '5',
    title: 'Street Fashion',
    description: 'Show your unique street style. Most creative outfits win special badges!',
    type: 'Fashion',
    hashtags: ['streetstyle', 'fashion', 'outfit', 'trend'],
    xpReward: 450,
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
    imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=500'
  },
  {
    id: '6',
    title: 'Cooking Masterpiece',
    description: 'Create a delicious dish and record the process. Best recipes win!',
    type: 'Food',
    hashtags: ['cooking', 'recipe', 'food', 'delicious'],
    xpReward: 600,
    endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days from now
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=500'
  }
];

const Explore = () => {
  const [filter, setFilter] = useState({
    type: 'all',
    sort: 'latest'
  });

  const filterTypes = ['all', 'Dance', 'Sport', 'Beauty', 'Music', 'Fashion', 'Food'];

  const filteredChallenges = mockChallenges.filter(challenge => 
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
                {type === 'all' ? 'All Types' : type}
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
      
      {sortedChallenges.length === 0 && (
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
