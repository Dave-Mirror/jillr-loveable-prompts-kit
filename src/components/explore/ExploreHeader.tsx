
import React from 'react';
import { Compass } from 'lucide-react';

const ExploreHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-bold mb-0">
        <Compass className="h-7 w-7 text-jillr-neonPurple" /> 
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          Entdecke Challenges
        </span>
      </h1>
    </div>
  );
};

export default ExploreHeader;
