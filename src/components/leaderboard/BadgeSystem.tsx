
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';
import BadgeList from './BadgeList';
import NextBadgeProgress from './NextBadgeProgress';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';

type Badge = {
  name: string;
  xp_required: number;
  challenges_required?: number;
  challenge_type?: string;
  special?: string;
  icon_url: string;
};

interface BadgeSystemProps {
  badges: Badge[];
}

const BadgeSystem = ({ badges }: BadgeSystemProps) => {
  const [viewAllOpen, setViewAllOpen] = useState(false);
  
  // Simulated user XP for the next badge progress
  const userXP = 4200;
  const nextBadge = badges.find(badge => badge.name === "Top 20%") || badges[0];
  
  return (
    <>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-jillr-neonPurple" />
            Badge System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BadgeList 
            badges={badges} 
            onViewAll={() => setViewAllOpen(true)}
          />
          
          <NextBadgeProgress 
            icon="🥈" 
            name="Top 20%" 
            currentXP={userXP} 
            requiredXP={6000} 
          />
        </CardContent>
      </Card>
      
      <Dialog open={viewAllOpen} onOpenChange={setViewAllOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-jillr-neonPurple" />
              All Available Badges
            </DialogTitle>
          </DialogHeader>
          <BadgeList 
            badges={badges} 
            limit={badges.length} 
            showViewAllButton={false} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BadgeSystem;
