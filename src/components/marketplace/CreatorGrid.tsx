
import React from 'react';
import CreatorCard from './CreatorCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

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

  // Group creators by their match score quality
  const topMatches = creators.filter(c => c.matchScore >= 80);
  const goodMatches = creators.filter(c => c.matchScore >= 60 && c.matchScore < 80);
  const otherMatches = creators.filter(c => c.matchScore < 60);

  return (
    <div className="space-y-6">
      {topMatches.length > 0 && (
        <div className="space-y-3">
          <Alert className="bg-gradient-to-r from-jillr-neonPurple/20 to-jillr-darkBlue/20 border-jillr-neonPurple">
            <Info className="h-4 w-4 text-jillr-neonPurple" />
            <AlertTitle>Top Matches für deine Kampagne</AlertTitle>
            <AlertDescription>
              Diese Creator passen besonders gut zu deiner aktiven Challenge.
            </AlertDescription>
          </Alert>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topMatches.map((creator) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                isSelected={creator.id === selectedCreatorId}
                onClick={() => onSelectCreator(creator)}
                isPriority={true}
              />
            ))}
          </div>
        </div>
      )}

      {goodMatches.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-200">Gute Übereinstimmungen</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goodMatches.map((creator) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                isSelected={creator.id === selectedCreatorId}
                onClick={() => onSelectCreator(creator)}
              />
            ))}
          </div>
        </div>
      )}

      {otherMatches.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-300">Weitere Creator</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherMatches.map((creator) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                isSelected={creator.id === selectedCreatorId}
                onClick={() => onSelectCreator(creator)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorGrid;
