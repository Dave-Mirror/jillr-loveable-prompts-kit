
import React from 'react';
import CreatorCard from './CreatorCard';
import { Skeleton } from '@/components/ui/skeleton';

interface Creator {
  id: string;
  name: string;
  avatar: string;
  niche: string;
  reach: number;
  successRate: number;
  badges: string[];
  engagementRate: number;
  region: string;
  matchScore: number;
}

interface CreatorGridProps {
  creators: Creator[];
  isLoading: boolean;
  onSelectCreator: (creator: Creator) => void;
  selectedCreatorId: string | null;
}

const CreatorGrid: React.FC<CreatorGridProps> = ({
  creators,
  isLoading,
  onSelectCreator,
  selectedCreatorId
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array(6).fill(null).map((_, i) => (
          <div key={i} className="rounded-lg border border-jillr-neonPurple/30 p-0.5 overflow-hidden">
            <div className="bg-jillr-dark/90 rounded-md p-4 h-full">
              <div className="flex items-center gap-4 mb-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="space-y-4">
                <Skeleton className="h-3 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!creators || creators.length === 0) {
    return (
      <div className="bg-jillr-darkBlue/50 rounded-lg border border-jillr-neonPurple/30 p-6 text-center">
        <h3 className="text-xl font-medium mb-2">Keine Creator gefunden</h3>
        <p className="text-gray-400">
          Bitte passe deine Filterkriterien an, um mehr Creator zu finden.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {creators.map((creator) => (
        <CreatorCard
          key={creator.id}
          creator={creator}
          isSelected={creator.id === selectedCreatorId}
          onClick={() => onSelectCreator(creator)}
        />
      ))}
    </div>
  );
};

export default CreatorGrid;
