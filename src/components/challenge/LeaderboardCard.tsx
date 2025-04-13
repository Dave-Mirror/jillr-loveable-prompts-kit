
import React from 'react';
import { Trophy, Star, ThumbsUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { LeaderboardCardProps } from './types';

export const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ topUsers }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy size={20} className="text-yellow-500" />
          Leaderboard
        </CardTitle>
        <CardDescription>Die Top-Teilnehmer dieser Challenge</CardDescription>
      </CardHeader>
      <CardContent>
        {topUsers.length > 0 ? (
          <div className="space-y-4">
            {topUsers.map((user, index) => (
              <div key={user.id} className="flex items-center justify-between p-3 rounded-lg glassmorphism">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center h-8 w-8 rounded-full ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-700'} text-black font-bold`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{user.username}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="flex items-center"><Star size={12} className="mr-1" /> {user.views} Views</span>
                      <span className="flex items-center"><ThumbsUp size={12} className="mr-1" /> {user.likes} Likes</span>
                    </div>
                  </div>
                </div>
                <div className="text-jillr-neonGreen font-semibold">
                  {index === 0 ? '+1000 XP' : index === 1 ? '+750 XP' : '+500 XP'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            Noch keine Teilnehmer in dieser Challenge. Sei der Erste!
          </div>
        )}
      </CardContent>
    </Card>
  );
};
