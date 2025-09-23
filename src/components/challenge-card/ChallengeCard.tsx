
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MapPin, Clock, Award, Trophy, Heart, MessageCircle, Share2, Zap, Play } from "lucide-react";
import { ChallengeCardProps } from './types';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { resolveThumbnailUrl, normalizeMediaFields } from '@/utils/media/thumbnailResolver';

const ChallengeCard = ({
  challenge,
  className,
  size = "default",
  onClick,
  onJoinClick
}: ChallengeCardProps) => {
  const navigate = useNavigate();
  
  // Normalize media fields for consistent handling
  const normalizedChallenge = normalizeMediaFields({
    ...challenge,
    slug: challenge.slug
  });
  const thumbnailUrl = resolveThumbnailUrl(normalizedChallenge);
  const isVideo = normalizedChallenge.mediaType === 'video';
  
  const handleCardClick = () => {
    // Wenn eine onClick-Funktion übergeben wurde, rufe diese auf
    if (onClick) {
      onClick(challenge.id);
    } else {
      // Navigiere zur Challenge-Detailseite mit slug falls verfügbar
      const route = challenge.slug ? `/challenges/${challenge.slug}` : `/challenge/${challenge.id}`;
      navigate(route);
    }
  };

  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onJoinClick) onJoinClick(challenge.id);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Replace with hologram fallback on error
    const target = e.currentTarget;
    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'w-full h-full bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center border border-white/10';
    fallbackDiv.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-80 text-white/60">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
        <circle cx="12" cy="13" r="3"/>
      </svg>
    `;
    target.parentNode?.replaceChild(fallbackDiv, target);
  };

  return (
    <div 
      onClick={handleCardClick}
      className={cn(
        // Enhanced glassmorphism with neon effects - use challenge-card class
        "challenge-card group cursor-pointer",
        // Additional hover effects for neon glow
        "hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(0,240,255,0.35)] hover:border-jillr-neonCyan/60",
        size === "compact" ? "w-full" : "w-full max-w-sm",
        className
      )}
    >
        {/* Media Preview with 16:9 Aspect Ratio */}
        <div className="relative">
          <div className="media-slot w-full aspect-video rounded-t-2xl overflow-hidden">
            {thumbnailUrl ? (
              <div className="relative w-full h-full">
                <img 
                  src={thumbnailUrl}
                  alt={challenge.thumbnailAlt || `${challenge.title} thumbnail`} 
                  loading="lazy"
                  className="challenge-card-media w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={handleImageError}
                />
                {/* Video play indicator overlay */}
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 rounded-full p-3 shadow-glow-cyan">
                      <Play className="w-6 h-6 text-jillr-neonCyan" fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Hologram gradient fallback (no gray slab)
              <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center border border-white/10">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-80 text-white/60">
                  <rect x="3" y="5" width="18" height="14" rx="2" ry="2"/>
                  <circle cx="8.5" cy="11.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
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
            {challenge.category || challenge.type}
          </Badge>
        </div>
        
        {/* XP Reward Pill */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPink text-white text-xs font-bold shadow-glow-purple border border-white/30">
            <Zap className="h-3 w-3" />
            <span>+{challenge.xp || 100} XP</span>
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
          {/* CTA Button - Hologram Glass */}
          <Button 
            variant="hologram" 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-jillr-neonCyan/20 to-jillr-neonPurple/20 border border-white/30 backdrop-blur-xl text-white font-semibold hover:from-jillr-neonCyan/30 hover:to-jillr-neonPurple/30"
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
