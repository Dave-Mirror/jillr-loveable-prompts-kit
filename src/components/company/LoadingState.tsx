
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <div className="flex justify-center">
        <div className="w-12 h-12 border-4 border-jillr-neonPurple border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingState;
