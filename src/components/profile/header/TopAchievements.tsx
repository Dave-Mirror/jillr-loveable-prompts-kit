
import React from 'react';
import { Award } from 'lucide-react';

interface TopAchievementsProps {
  badges: string[];
}

const TopAchievements: React.FC<TopAchievementsProps> = ({ badges }) => {
  if (!badges || badges.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Top Achievements</h3>
      <div className="flex flex-wrap gap-2">
        {badges.map((badge, i) => (
          <div 
            key={i} 
            className="bg-jillr-neonPurple/20 border border-jillr-neonPurple/30 rounded-full px-3 py-1 text-xs flex items-center gap-1"
          >
            <Award size={12} className="text-jillr-neonPurple" />
            {badge}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopAchievements;
