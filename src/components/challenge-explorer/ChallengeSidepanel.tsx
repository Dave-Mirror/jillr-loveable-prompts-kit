
import React from 'react';
import { X, MapPin, Clock, Award, Trophy, User, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface ChallengeSidepanelProps {
  open: boolean;
  onClose: () => void;
  challenge: any; // This would be properly typed in a real implementation
}

// Mock participants data
const mockParticipants = [
  { 
    id: 'u1', 
    name: 'SarahJ', 
    avatar: '/assets/avatars/user1.jpg', 
    xp: 350, 
    level: 12,
    rank: 1 
  },
  { 
    id: 'u2', 
    name: 'MikeT', 
    avatar: '/assets/avatars/user2.jpg', 
    xp: 320, 
    level: 9,
    rank: 2 
  },
  { 
    id: 'u3', 
    name: 'Anna_K', 
    avatar: '/assets/avatars/user3.jpg', 
    xp: 290, 
    level: 8,
    rank: 3 
  },
  { 
    id: 'u4', 
    name: 'JohnDoe', 
    avatar: '/assets/avatars/user4.jpg', 
    xp: 240, 
    level: 7,
    rank: 4 
  },
];

const ChallengeSidepanel: React.FC<ChallengeSidepanelProps> = ({ open, onClose, challenge }) => {
  const { toast } = useToast();

  const handleStartChallenge = () => {
    toast({
      title: "Challenge Started!",
      description: "You've successfully joined this challenge."
    });
  };

  const handleShareChallenge = () => {
    // In a real implementation, this would use the Web Share API
    toast({
      title: "Challenge Shared",
      description: "Link copied to clipboard"
    });
  };

  if (!challenge) return null;

  return (
    <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-jillr-dark border-l border-jillr-border z-30 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-full flex flex-col">
        {/* Header with close button */}
        <div className="p-4 border-b border-jillr-border flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">{challenge.title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Challenge content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Challenge preview video/image */}
          <div className="relative rounded-lg overflow-hidden">
            <AspectRatio ratio={16/9}>
              <div className="w-full h-full bg-gradient-to-br from-jillr-neonPurpleDark to-jillr-dark flex items-center justify-center">
                {challenge.type === 'video' ? (
                  <video 
                    src="https://placehold.co/360x640/mp4" 
                    className="h-full w-full object-cover" 
                    autoPlay 
                    muted 
                    loop
                  />
                ) : (
                  <img
                    src="https://source.unsplash.com/random/360x640/?fitness"
                    alt={challenge.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </AspectRatio>
            
            {/* Brand logo */}
            <div className="absolute top-3 left-3 bg-jillr-dark/80 rounded-full p-1">
              <img 
                src={`https://placehold.co/50x50?text=${challenge.brand?.charAt(0) || 'J'}`} 
                alt={challenge.brand || 'Jillr'} 
                className="h-7 w-7 rounded-full"
              />
            </div>
          </div>
          
          {/* Challenge details */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
                <div className="flex items-center text-sm text-white/70">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>München, Germany</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center text-jillr-neonPurple">
                  <Trophy className="h-4 w-4 mr-1" />
                  <span className="font-bold">{challenge.xp} XP</span>
                </div>
                <div className="flex items-center text-jillr-neonGreen mt-1">
                  <Award className="h-4 w-4 mr-1" />
                  <span className="font-bold">{challenge.coins} Coins</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-white/70">
              <Clock className="h-4 w-4 mr-1" />
              <span>Expires in {challenge.expiresIn}</span>
            </div>
            
            <p className="text-white/90">{challenge.description}</p>
            
            {/* Action buttons */}
            <div className="flex gap-2">
              <Button 
                className="flex-1"
                onClick={handleStartChallenge}
              >
                Start Challenge
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleShareChallenge}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Participants/Leaderboard */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">Top Participants</h4>
            <div className="space-y-2">
              {mockParticipants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-3 p-2 hover:bg-jillr-darkAccent/50 rounded-lg transition-colors"
                >
                  <div className="text-sm font-bold text-white w-4">
                    {participant.rank}.
                  </div>
                  <Avatar>
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback className="bg-jillr-neonPurple/20 text-jillr-neonPurple">
                      {participant.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-white">{participant.name}</span>
                      <span className="text-xs text-jillr-neonPurple">{participant.xp} XP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <Progress value={participant.xp / 5} className="h-1" />
                      </div>
                      <span className="text-xs text-white/70">Lv.{participant.level}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* See all button */}
            <Button variant="outline" className="w-full text-sm">
              See All Participants ({mockParticipants.length + 18})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeSidepanel;
