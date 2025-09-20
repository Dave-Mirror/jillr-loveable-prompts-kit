
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MapPin, Clock, Award, Trophy, Heart, MessageCircle, Share2, Zap } from "lucide-react";
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
        // Glassmorphism base
        "glass-card border border-white/20 rounded-2xl overflow-hidden",
        "group cursor-pointer transition-all duration-500",
        // Hover effects
        "hover:scale-[1.02] hover:shadow-neon-intense hover:border-jillr-neonCyan/60",
        size === "compact" ? "w-full" : "w-full max-w-sm",
        className
      )}
    >
        {/* Image Preview with Hologram Overlay */}
        <div className="relative">
          <div className="w-full h-56 rounded-t-2xl overflow-hidden">
            {challenge.imageUrl ? (
              <img 
                src={challenge.imageUrl} 
                alt={challenge.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              // Hologram gradient placeholder instead of gray
              <div className="w-full h-full bg-gradient-to-br from-jillr-neonCyan/20 via-jillr-neonPurple/20 to-jillr-neonPink/20 flex items-center justify-center">
                <div className="text-white/60 text-4xl">
                  {challenge.type === 'video' ? '🎬' : '📸'}
                </div>
              </div>
            )}
            {/* Subtle hologram gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-jillr-neonCyan/5 via-transparent to-jillr-neonPurple/5 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          </div>
        
        {/* Category Chips */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge 
            variant="hologram" 
            className="bg-gradient-to-r from-jillr-neonCyan to-jillr-neonPurple text-white font-medium border-0 shadow-glow-cyan"
          >
            {challenge.type}
          </Badge>
        </div>
        
        {/* XP Reward Pill */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPink text-white text-xs font-bold shadow-glow-purple border border-white/30">
            <Zap className="h-3 w-3" />
            <span>+100 XP</span>
          </div>
        </div>
        
        {/* Time indicator */}
        {challenge.expiresIn && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/20">
            <Clock className="h-3 w-3" />
            <span>{challenge.expiresIn}</span>
          </div>
        )}
      </div>
      
      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-bold text-[var(--txt)] text-lg leading-tight group-hover:text-jillr-neonCyan transition-colors duration-300">
          {challenge.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-[var(--txt-dim)] line-clamp-2 leading-relaxed">
          {challenge.description}
        </p>
        
        {/* Footer with CTA and Stats */}
        <div className="flex items-center justify-between gap-4">
          {/* CTA Button */}
          <Button 
            variant="hologram" 
            size="sm" 
            className="flex-1"
            onClick={handleJoinClick}
          >
            {challenge.challengeId ? "Teilnehmen" : "Details"}
          </Button>
          
          {/* Compact Stats */}
          <div className="flex items-center gap-3 text-xs text-[var(--txt-dim)]">
            <div className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5 text-jillr-neonPink" />
              <span>234</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5 text-jillr-neonCyan" />
              <span>45</span>
            </div>
            <div className="flex items-center gap-1">
              <Share2 className="h-3.5 w-3.5 text-jillr-neonPurple" />
              <span>12</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
