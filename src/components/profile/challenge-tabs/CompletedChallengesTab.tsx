
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Zap, Award, Eye, Heart } from 'lucide-react';

interface CompletedChallengesProps {
  completedChallenges: any[];
}

const CompletedChallengesTab: React.FC<CompletedChallengesProps> = ({ completedChallenges }) => {
  return (
    <div className="space-y-4">
      {completedChallenges.map(challenge => (
        <Card key={challenge.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{challenge.title}</CardTitle>
                <CardDescription>By {challenge.brand}</CardDescription>
              </div>
              <Badge className="bg-green-500">
                <div className="flex items-center gap-1">
                  <CheckCircle size={12} />
                  Completed
                </div>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-between gap-y-3">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-1 text-sm">
                  <Zap size={16} className="text-jillr-neonPurple" />
                  <span>{challenge.xpEarned} XP Earned</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Award size={16} className="text-yellow-500" />
                  <span>{challenge.coinsEarned} Coins Earned</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Eye size={16} className="text-blue-400" />
                  <span>{challenge.views} Views</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Heart size={16} className="text-red-400" />
                  <span>{challenge.likes} Likes</span>
                </div>
              </div>
              
              <Button size="sm" variant="outline" className="flex gap-2 items-center">
                View Submission
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CompletedChallengesTab;
