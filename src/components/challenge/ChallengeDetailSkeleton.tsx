import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ChallengeDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-cosmic-dark">
      <div className="page-container">
        {/* Header skeleton */}
        <div className="space-y-4 mb-6">
          <div className="h-8 w-3/4 bg-gradient-to-r from-white/10 to-white/5 rounded-lg animate-pulse" />
          <div className="h-4 w-1/2 bg-gradient-to-r from-white/10 to-white/5 rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-gradient-to-r from-jillr-neonCyan/20 to-jillr-neonPurple/20 rounded-full animate-pulse" />
            <div className="h-6 w-16 bg-gradient-to-r from-jillr-neonPurple/20 to-jillr-neonPink/20 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Media skeleton */}
        <div className="w-full aspect-video bg-gradient-to-br from-white/10 via-white/5 to-white/10 rounded-2xl mb-6 animate-pulse" />

        {/* Content grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content skeleton */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="challenge-card">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-6 w-1/3 bg-gradient-to-r from-white/10 to-white/5 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gradient-to-r from-white/10 to-white/5 rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-gradient-to-r from-white/10 to-white/5 rounded animate-pulse" />
                    <div className="h-4 w-4/6 bg-gradient-to-r from-white/10 to-white/5 rounded animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submissions skeleton */}
            <Card className="challenge-card">
              <CardContent className="p-6">
                <div className="h-6 w-1/4 bg-gradient-to-r from-white/10 to-white/5 rounded mb-4 animate-pulse" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-lg animate-pulse" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-6">
            <Card className="challenge-card">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-12 w-full bg-gradient-to-r from-jillr-neonCyan/20 to-jillr-neonPurple/20 rounded-xl animate-pulse" />
                  <div className="h-10 w-full bg-gradient-to-r from-white/10 to-white/5 rounded-lg animate-pulse" />
                  <div className="h-10 w-full bg-gradient-to-r from-white/10 to-white/5 rounded-lg animate-pulse" />
                </div>
              </CardContent>
            </Card>

            <Card className="challenge-card">
              <CardContent className="p-6">
                <div className="h-6 w-1/2 bg-gradient-to-r from-white/10 to-white/5 rounded mb-4 animate-pulse" />
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-jillr-neonCyan/20 to-jillr-neonPurple/20 rounded-full animate-pulse" />
                      <div className="flex-1">
                        <div className="h-4 w-3/4 bg-gradient-to-r from-white/10 to-white/5 rounded animate-pulse" />
                        <div className="h-3 w-1/2 bg-gradient-to-r from-white/10 to-white/5 rounded mt-1 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailSkeleton;