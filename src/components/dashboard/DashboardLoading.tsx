
import React from 'react';
import LoadingSpinner from '../leaderboard/LoadingSpinner';

const DashboardLoading = () => {
  return (
    <div className="container py-8 flex justify-center items-center min-h-[calc(100vh-80px)]">
      <div className="text-center">
        <h2 className="text-xl mb-4">Lade Creator-Daten...</h2>
        <LoadingSpinner />
      </div>
    </div>
  );
};

export default DashboardLoading;
