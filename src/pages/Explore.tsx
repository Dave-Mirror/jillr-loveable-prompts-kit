
import React from 'react';
import ExploreFilters from '@/components/explore/ExploreFilters';
import ChallengeGrid from '@/components/explore/ChallengeGrid';
import ExplorePromoBanner from '@/components/explore/ExplorePromoBanner';
import PageContainer from '@/components/navigation/PageContainer';

const Explore = () => {
  return (
    <PageContainer previousPage="/" nextPage="/leaderboard">
      <div className="container mx-auto max-w-6xl">
        <ExplorePromoBanner />
        <ExploreFilters />
        <ChallengeGrid />
      </div>
    </PageContainer>
  );
};

export default Explore;
