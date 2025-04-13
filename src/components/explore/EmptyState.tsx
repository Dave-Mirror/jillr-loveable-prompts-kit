
import React from 'react';

interface EmptyStateProps {
  resetFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ resetFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-lg text-muted-foreground mb-4">No challenges found with the selected filters</p>
      <button 
        className="neon-button"
        onClick={resetFilters}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default EmptyState;
