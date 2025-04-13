
import React from 'react';
import BadgeItem from './BadgeItem';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export type Badge = {
  id: string;
  name: string;
  description?: string;
  xp_required?: number;
  challenges_required?: number;
  challenge_type?: string;
  special?: string;
  icon_url: string;
  unlocked?: boolean;
  progress?: number;
};

type BadgeListProps = {
  badges: Badge[];
  limit?: number;
  showViewAllButton?: boolean;
  onViewAll?: () => void;
  title?: string;
  className?: string;
};

const BadgeList = ({ 
  badges, 
  limit = 8, 
  showViewAllButton = true,
  onViewAll,
  title = "Achievement Badges",
  className
}: BadgeListProps) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedBadges, setSelectedBadges] = React.useState<Badge[]>([]);
  
  const displayBadges = badges.slice(0, limit);
  const hasMoreBadges = badges.length > limit;
  
  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      setSelectedBadges(badges);
      setOpenDialog(true);
    }
  };
  
  return (
    <>
      <div className={className}>
        <h3 className="font-medium mb-3">{title}</h3>
        <div className="space-y-2">
          {displayBadges.map((badge) => {
            const description = getBadgeDescription(badge);
              
            return (
              <BadgeItem 
                key={badge.id}
                icon={badge.icon_url}
                name={badge.name}
                description={description}
                unlocked={badge.unlocked}
                progress={badge.progress}
              />
            );
          })}
        </div>
        
        {showViewAllButton && hasMoreBadges && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs mt-4" 
            onClick={handleViewAll}
          >
            View All Badges
          </Button>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>All Achievement Badges</DialogTitle>
            <DialogDescription>
              Complete challenges and earn XP to unlock new badges
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-2">
              {selectedBadges.map((badge) => {
                const description = getBadgeDescription(badge);
                  
                return (
                  <BadgeItem 
                    key={badge.id}
                    icon={badge.icon_url}
                    name={badge.name}
                    description={description}
                    unlocked={badge.unlocked}
                    progress={badge.progress}
                  />
                );
              })}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Helper function to generate badge description
const getBadgeDescription = (badge: Badge): string => {
  if (badge.description) return badge.description;
  
  if (badge.xp_required && badge.xp_required > 0) 
    return `${badge.xp_required.toLocaleString()} XP required`;
  
  if (badge.challenges_required) 
    return `${badge.challenges_required} ${badge.challenge_type || ''} challenges`;
  
  return badge.special || 'Special achievement';
};

export default BadgeList;
