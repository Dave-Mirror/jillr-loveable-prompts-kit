
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const ChallengeLoading: React.FC = () => {
  return (
    <div className="container py-8">
      <Skeleton className="h-64 w-full mb-6 rounded-xl" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-20 w-2/3" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-60 w-full" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    </div>
  );
};
