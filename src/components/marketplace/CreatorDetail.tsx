
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { formatNumber } from '@/utils/formatters';

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
  bio?: string;
  previousBrands?: string[];
  socialLinks?: { platform: string; url: string; followers: number }[];
  contentSamples?: { type: string; thumbnail: string; engagement: number }[];
}

interface CreatorDetailProps {
  creator: Creator;
}

const CreatorDetail: React.FC<CreatorDetailProps> = ({ creator }) => {
  const [collaborationDialogOpen, setCollaborationDialogOpen] = useState(false);

  const handleCollaborationRequest = () => {
    setCollaborationDialogOpen(false);
    // Here you would handle the collaboration request submission
  };

  return (
    <>
      <Card className="border-jillr-neonPurple/30">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>{creator.name}</CardTitle>
            <div className="flex items-center">
              <div 
                className="h-8 w-8 rounded-full flex items-center justify-center bg-jillr-darkBlue border border-jillr-neonPurple text-sm font-bold" 
                title="KI-Match Score"
              >
                {creator.matchScore}%
              </div>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-400 mt-1">
            <span>{creator.region}</span>
            <span className="mx-2">•</span>
            <span>{creator.niche}</span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Profile Image */}
          <div className="flex justify-center">
            <img 
              src={creator.avatar} 
              alt={creator.name} 
              className="h-32 w-32 rounded-full object-cover border-2 border-jillr-neonPurple/50"
            />
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-jillr-dark/50 rounded-lg p-3">
              <div className="text-lg font-bold">{formatNumber(creator.reach)}</div>
              <div className="text-xs text-gray-400">Reichweite</div>
            </div>
            <div className="bg-jillr-dark/50 rounded-lg p-3">
              <div className="text-lg font-bold">{creator.engagementRate}%</div>
              <div className="text-xs text-gray-400">Engagement</div>
            </div>
            <div className="bg-jillr-dark/50 rounded-lg p-3">
              <div className="text-lg font-bold">{creator.successRate}%</div>
              <div className="text-xs text-gray-400">Erfolgsrate</div>
            </div>
          </div>
          
          {/* Bio */}
          {creator.bio && (
            <div>
              <h4 className="text-sm font-medium mb-1">Über den Creator</h4>
              <p className="text-sm text-gray-300">{creator.bio}</p>
            </div>
          )}
          
          {/* Badges */}
          {creator.badges && creator.badges.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">Badges</h4>
              <div className="flex flex-wrap gap-1">
                {creator.badges.map((badge, idx) => (
                  <Badge key={idx} variant="outline" className="bg-jillr-darkBlue text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Previous brands */}
          {creator.previousBrands && creator.previousBrands.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">Vorherige Kooperationen</h4>
              <div className="flex flex-wrap gap-1">
                {creator.previousBrands.map((brand, idx) => (
                  <Badge key={idx} className="bg-jillr-darkBlue/50 text-xs">
                    {brand}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Social links */}
          {creator.socialLinks && creator.socialLinks.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">Social Media</h4>
              <div className="flex flex-wrap gap-2">
                {creator.socialLinks.map((link, idx) => (
                  <a 
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-jillr-dark/50 text-xs hover:bg-jillr-dark"
                  >
                    {link.platform}
                    <span className="text-gray-400">{formatNumber(link.followers)}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
          
          {/* Content samples */}
          {creator.contentSamples && creator.contentSamples.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">Content-Beispiele</h4>
              <div className="grid grid-cols-3 gap-2">
                {creator.contentSamples.map((sample, idx) => (
                  <div key={idx} className="relative">
                    <img 
                      src={sample.thumbnail} 
                      alt={`Content sample ${idx + 1}`}
                      className="h-16 w-full object-cover rounded-md"
                    />
                    <div className="absolute bottom-0 right-0 p-0.5 bg-black/70 rounded-tl-md text-xs">
                      {formatNumber(sample.engagement)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter>
          <Button 
            className="w-full bg-jillr-neonPurple hover:bg-jillr-neonPurple/80"
            onClick={() => setCollaborationDialogOpen(true)}
          >
            Kooperationsanfrage senden
          </Button>
        </CardFooter>
      </Card>
      
      {/* Collaboration Dialog */}
      <Dialog open={collaborationDialogOpen} onOpenChange={setCollaborationDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Kooperationsanfrage an {creator.name}</DialogTitle>
            <DialogDescription>
              Sende eine Anfrage zur Zusammenarbeit mit diesem Creator für deine Kampagne.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium col-span-1">
                Kampagne
              </label>
              <select className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option>Beauty Challenge 2023</option>
                <option>Sommer Lookbook</option>
                <option>Neue Kampagne erstellen...</option>
              </select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium col-span-1">
                Budget
              </label>
              <input 
                type="text" 
                placeholder="z.B. 500€" 
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium col-span-1">
                Nachricht
              </label>
              <textarea 
                placeholder="Details zur Zusammenarbeit..." 
                className="col-span-3 flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCollaborationDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={handleCollaborationRequest} className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80">
              Anfrage senden
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatorDetail;
