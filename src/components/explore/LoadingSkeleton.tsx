
import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
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
  );
};

export default LoadingSkeleton;
