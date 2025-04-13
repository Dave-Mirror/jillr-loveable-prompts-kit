
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="container py-8 flex justify-center items-center min-h-[calc(100vh-80px)]">
      <div className="text-center">
        <h2 className="text-xl mb-4">Lade Wallet-Daten...</h2>
        <div className="w-8 h-8 border-4 border-t-jillr-neonPurple rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default LoadingState;
