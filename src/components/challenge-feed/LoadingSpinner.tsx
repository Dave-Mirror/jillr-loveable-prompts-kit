
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-t-jillr-neonPurple border-r-transparent border-b-jillr-neonPurple border-l-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-jillr-neonPurple">Loading challenge feed...</p>
    </div>
  );
};

export default LoadingSpinner;
