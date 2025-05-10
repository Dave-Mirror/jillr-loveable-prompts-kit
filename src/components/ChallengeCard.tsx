
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Hash, Clock, Users, Star, Play } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { Badge } from '@/components/ui/badge';

// Challenge type icons
const typeIcons: Record<string, string> = {
  'photo': '📸',
  'video': '🎥',
  'ar': '🥽',
  'geofencing': '📍',
  'fitness': '💪',
  'wearable': '⌚',
  'schnitzeljagd': '🔍',
  'community': '👥',
  'battle': '⚔️',
  'review': '⭐',
  'fashion': '👕',
  'beauty': '💄',
  'sport': '🏆',
  'food': '🍔',
  'travel': '✈️',
  'gaming': '🎮',
  'mobility': '🚗',
  'sustainability': '♻️',
  'entertainment': '🎭',
  'education': '📚',
};

interface ChallengeCardProps {
  id: string;
  title: string;
  description: string;
  type: string;
  hashtags: string[];
  xpReward: number;
  endDate: string | Date;
  imageUrl?: string;
  videoUrl?: string;
  mediaType?: 'image' | 'video';
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  id,
  title,
  description,
  type,
  hashtags,
  xpReward,
  endDate,
  imageUrl = '/placeholder.svg',
  videoUrl,
  mediaType = 'image',
}) => {
  // Sicherstellen, dass typeIcon immer einen Wert hat
  const typeIcon = typeIcons[type.toLowerCase()] || '🎯';
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Use Intersection Observer to detect when card is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Card is 50% visible
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Handle video play/pause based on visibility
  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isVisible) {
      // When element is in view
      videoRef.current.play().catch(error => {
        // Handle autoplay restrictions by muting if needed
        if (error.name === 'NotAllowedError') {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(e => console.log('Even muted autoplay failed:', e));
          }
        }
      });
    } else {
      // When element is out of view
      videoRef.current.pause();
    }
  }, [isVisible]);
  
  return (
    <Link to={`/challenge/${id}`} className="block w-full transition-transform hover:scale-[1.02] focus:scale-[1.02]">
      <div ref={cardRef} className="challenge-card h-full flex flex-col bg-jillr-dark border border-jillr-border/30 rounded-lg overflow-hidden shadow-lg shadow-jillr-dark/50">
        <div className="relative aspect-video rounded-t-lg overflow-hidden">
          {mediaType === 'video' && videoUrl ? (
            <video 
              ref={videoRef}
              src={videoUrl} 
              className="w-full h-full object-cover" 
              loop
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover" 
              loading="lazy"
            />
          )}
          
          {/* Video play indicator */}
          {mediaType === 'video' && videoUrl && (
            <div className="absolute top-3 right-3 bg-black/60 rounded-full p-1">
              <Play className="h-4 w-4 text-white" fill="white" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-jillr-dark to-transparent pointer-events-none"></div>
          
          <div className="absolute bottom-3 right-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-jillr-dark/80 backdrop-blur-sm border-jillr-neonPurple/30 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-jillr-neonPurple" />
                <CountdownTimer endDate={endDate} />
              </Badge>
            </div>
          </div>
          
          <div className="absolute top-3 left-3">
            <Badge className="bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPurpleDark border-0 text-white px-2.5 py-1.5 text-xs font-medium flex items-center gap-1.5">
              <span className="text-base">{typeIcon}</span> {type}
            </Badge>
          </div>
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold mb-1.5 line-clamp-1 text-white">{title}</h3>
          <p className="text-sm text-gray-300 mb-3 line-clamp-2">{description}</p>
          
          <div className="mt-auto space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {hashtags && hashtags.slice(0, 3).map((tag, index) => (
                <div key={index} className="flex items-center text-xs px-2 py-1 rounded-full bg-jillr-darkBlue text-jillr-neonBlue">
                  <Hash size={10} className="mr-0.5" />
                  {tag}
                </div>
              ))}
              {hashtags && hashtags.length > 3 && (
                <div className="text-xs px-2 py-1 rounded-full bg-jillr-darkBlue text-gray-400">
                  +{hashtags.length - 3}
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-jillr-neonPurple/10 border-jillr-neonPurple/30 text-jillr-neonPurple flex items-center gap-1.5 px-2.5 py-1">
                <Zap className="h-3.5 w-3.5" />
                <span className="font-medium">{xpReward} XP</span>
              </Badge>
              
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Users size={12} />
                  <span>124</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={12} />
                  <span>4.8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChallengeCard;
