import React from 'react';
import PageContainer from '@/components/navigation/PageContainer';

const Leaderboard = () => {
  return (
    <PageContainer previousPage="/explore" nextPage="/wallet">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
        {/* Leaderboard content */}
      </div>
    </PageContainer>
  );
};

export default Leaderboard;
