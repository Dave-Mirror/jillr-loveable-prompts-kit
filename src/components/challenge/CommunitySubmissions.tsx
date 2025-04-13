
import React from 'react';
import { Users, ThumbsUp, Star } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type CommunitySubmissionsProps = {
  verifiedSubmissions: any[];
  inviteFriends: () => void;
}

export const CommunitySubmissions: React.FC<CommunitySubmissionsProps> = ({ 
  verifiedSubmissions, 
  inviteFriends 
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users size={20} className="text-jillr-neonPurple" />
          Community Einreichungen
        </CardTitle>
        <CardDescription>
          Verifizierte Einreichungen von anderen Teilnehmern
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {verifiedSubmissions.map((submission) => (
            <div key={submission.id} className="neon-card overflow-hidden">
              <div className="neon-card-content p-3">
                <div className="aspect-video bg-black/50 rounded-md mb-2 flex items-center justify-center">
                  {submission.video_url ? (
                    <video 
                      src={submission.video_url} 
                      controls 
                      className="w-full h-full object-cover rounded-md"
                    ></video>
                  ) : (
                    <div className="text-center text-muted-foreground">Video nicht verfügbar</div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">User_{submission.user_id.substring(0, 5)}</div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center text-sm text-muted-foreground hover:text-jillr-neonPink">
                      <ThumbsUp size={14} className="mr-1" />
                      {submission.likes || 0}
                    </button>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star size={14} className="mr-1" />
                      {submission.views || 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={inviteFriends}>
          <Users size={18} className="mr-2" />
          Freunde einladen
        </Button>
      </CardFooter>
    </Card>
  );
};
