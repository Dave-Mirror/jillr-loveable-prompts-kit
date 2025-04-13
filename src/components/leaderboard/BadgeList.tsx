
import React from 'react';
import BadgeItem from './BadgeItem';
import { Button } from '@/components/ui/button';

type Badge = {
  name: string;
  xp_required: number;
  challenges_required?: number;
  challenge_type?: string;
  special?: string;
  icon_url: string;
};

type BadgeListProps = {
  badges: Badge[];
  limit?: number;
  showViewAllButton?: boolean;
  onViewAll?: () => void;
};

const BadgeList = ({ 
  badges, 
  limit = 8, 
  showViewAllButton = true,
  onViewAll = () => {} 
}: BadgeListProps) => {
  const displayBadges = badges.slice(0, limit);
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Achievement Badges</h3>
      <div className="space-y-2">
        {displayBadges.map((badge, index) => {
          const description = badge.xp_required > 0 
            ? `${badge.xp_required.toLocaleString()} XP required` 
            : badge.challenges_required 
              ? `${badge.challenges_required} ${badge.challenge_type || ''} challenges`
              : 'Special achievement';
              
          return (
            <BadgeItem 
              key={index}
              icon={badge.icon_url}
              name={badge.name}
              description={description}
            />
          );
        })}
      </div>
      
      {showViewAllButton && badges.length > limit && (
        <Button variant="outline" size="sm" className="w-full text-xs" onClick={onViewAll}>
          View All Badges
        </Button>
      )}
    </div>
  );
};

export default BadgeList;
