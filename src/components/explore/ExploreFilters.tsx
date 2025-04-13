
import React from 'react';

// Challenge type icons
const typeIcons: Record<string, string> = {
  'Photo & Video': '📸',
  'AR': '🥽',
  'Geofencing': '📍',
  'Fitness': '💪',
  'Sustainability': '♻️',
  'Gamification': '🎮',
  'Community': '👥',
  'Battle': '⚔️',
  'Review': '⭐',
  'Travel': '✈️',
  'Food': '🍔',
  'Fashion': '👕',
  'Beauty': '💄',
  'Dance': '💃',
};

interface ExploreFiltersProps {
  filter: {
    type: string;
    sort: string;
  };
  filterTypes: string[];
  setFilter: (filter: { type: string; sort: string }) => void;
}

const ExploreFilters: React.FC<ExploreFiltersProps> = ({ filter, filterTypes, setFilter }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <select
        className="glassmorphism px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jillr-neonPurple"
        value={filter.type}
        onChange={(e) => setFilter({ ...filter, type: e.target.value })}
      >
        {filterTypes.map(type => (
          <option key={type} value={type} className="bg-jillr-dark">
            {type === 'all' ? 'All Types' : `${typeIcons[type] || '🎯'} ${type}`}
          </option>
        ))}
      </select>
      
      <select
        className="glassmorphism px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jillr-neonPurple"
        value={filter.sort}
        onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
      >
        <option value="latest" className="bg-jillr-dark">Latest</option>
        <option value="rewards" className="bg-jillr-dark">Highest Rewards</option>
      </select>
    </div>
  );
};

export { typeIcons };
export default ExploreFilters;
