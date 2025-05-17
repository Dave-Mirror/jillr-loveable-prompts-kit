
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MapPin, Clock, Award, Trophy } from "lucide-react";
import { ChallengeCardProps } from './types';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const ChallengeCard = ({
  challenge,
  className,
  size = "default",
  onClick,
  onJoinClick
}: ChallengeCardProps) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    // Wenn eine onClick-Funktion übergeben wurde, rufe diese auf
    if (onClick) {
      onClick(challenge.id);
    } else {
      // Ansonsten navigiere direkt zur Challenge-Detailseite
      navigate(`/challenge/${challenge.id}`);
    }
  };

  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onJoinClick) onJoinClick(challenge.id);
  };

  return (
    <div 
      onClick={handleCardClick}
      className={cn(
        "bg-jillr-dark border border-jillr-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-neon",
        "group cursor-pointer hover:scale-[1.02]",
        size === "compact" ? "w-full" : "w-full max-w-sm",
        className
      )}
    >
      <div className="relative">
        <AspectRatio ratio={16/9}>
          <div className="w-full h-full bg-jillr-darkAccent">
            {challenge.imageUrl && (
              <img 
                src={challenge.imageUrl} 
                alt={challenge.title} 
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </AspectRatio>
        
        <div className="absolute top-2 right-2 flex gap-1">
          <Badge variant="secondary" className="z-10">
            {challenge.type}
          </Badge>
        </div>
        
        {challenge.expiresIn && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-jillr-dark/80 text-white text-xs px-2 py-1 rounded-full z-10">
            <Clock className="h-3 w-3" />
            <span>{challenge.expiresIn}</span>
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold text-white mb-1 group-hover:text-jillr-neonPurple transition-colors">
          {challenge.title}
        </h3>
        
        <p className="text-sm text-gray-300 line-clamp-2 mb-2">
          {challenge.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-jillr-neonPink" />
              <span>1.2 km</span>
            </div>
            
            {challenge.reward && (
              <div className="flex items-center gap-1">
                <Award className="h-3 w-3 text-jillr-neonBlue" />
                <span>{challenge.reward}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-jillr-neonGreen" />
            <span className="text-jillr-neonGreen text-xs font-semibold">
              +100 XP
            </span>
          </div>
        </div>
        
        <Button 
          variant="default" 
          size="sm" 
          className="w-full mt-3"
          onClick={handleJoinClick}
        >
          {challenge.challengeId ? "Jetzt teilnehmen" : "Details anzeigen"}
        </Button>
      </div>
    </div>
  );
};

export default ChallengeCard;
