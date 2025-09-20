
import React, { useRef, useEffect, useState } from 'react';
import { Play, Camera } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ChallengeMediaProps {
  mediaType?: 'image' | 'video';
  mediaUrl?: string;
  posterUrl?: string;
  thumbnailUrl?: string;
  title: string;
  isVisible?: boolean;
  className?: string;
}

const ChallengeMedia: React.FC<ChallengeMediaProps> = ({
  mediaType = 'image',
  mediaUrl = '',
  posterUrl,
  thumbnailUrl,
  title,
  isVisible = true,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [processedMediaUrl, setProcessedMediaUrl] = useState<string>('');
  const [processedPosterUrl, setProcessedPosterUrl] = useState<string>('');
  const [hasError, setHasError] = useState(false);

  // Process URLs and handle Supabase storage
  useEffect(() => {
    const processUrls = async () => {
      let finalMediaUrl = mediaUrl;
      let finalPosterUrl = posterUrl || thumbnailUrl || '';

      // Handle Supabase storage URLs
      if (mediaUrl?.startsWith('supabase://')) {
        const path = mediaUrl.replace('supabase://', '');
        const [bucket, ...pathParts] = path.split('/');
        const filePath = pathParts.join('/');
        
        try {
          const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
          finalMediaUrl = data.publicUrl;
        } catch (error) {
          console.warn('Failed to process Supabase URL:', error);
        }
      }

      if (posterUrl?.startsWith('supabase://')) {
        const path = posterUrl.replace('supabase://', '');
        const [bucket, ...pathParts] = path.split('/');
        const filePath = pathParts.join('/');
        
        try {
          const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
          finalPosterUrl = data.publicUrl;
        } catch (error) {
          console.warn('Failed to process Supabase poster URL:', error);
        }
      }

      // Enforce HTTPS
      if (finalMediaUrl && !finalMediaUrl.startsWith('https://') && !finalMediaUrl.startsWith('data:')) {
        if (finalMediaUrl.startsWith('http://')) {
          console.warn('HTTP media URL detected, showing fallback:', finalMediaUrl);
          setHasError(true);
          return;
        }
      }

      setProcessedMediaUrl(finalMediaUrl);
      setProcessedPosterUrl(finalPosterUrl);
    };

    processUrls();
  }, [mediaUrl, posterUrl, thumbnailUrl]);

  // Handle video play/pause based on visibility
  useEffect(() => {
    if (!videoRef.current || mediaType !== 'video' || !isVisible) return;
    
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
  }, [isVisible, mediaType]);

  const handleImageError = () => {
    setHasError(true);
  };

  // Fallback component
  const MediaFallback = () => (
    <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center border border-white/10">
      <Camera className="h-9 w-9 text-white/80" />
    </div>
  );

  return (
    <div className={`relative aspect-video rounded-2xl overflow-hidden ${className}`}>
      {hasError || !processedMediaUrl ? (
        <MediaFallback />
      ) : mediaType === 'video' ? (
        <>
          <video 
            ref={videoRef}
            src={processedMediaUrl} 
            className="w-full h-full object-cover" 
            controls
            loop
            muted
            playsInline
            preload="metadata"
            poster={processedPosterUrl}
            crossOrigin="anonymous"
            onError={handleImageError}
          >
            <source src={processedMediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video play indicator */}
          <div className="absolute top-3 right-3 bg-black/60 rounded-full p-1.5">
            <Play className="h-4 w-4 text-white" fill="white" />
          </div>
        </>
      ) : (
        <img 
          src={processedMediaUrl} 
          alt={`${title} thumbnail`} 
          className="w-full h-full object-cover" 
          loading="eager"
          onError={handleImageError}
        />
      )}
      
      {/* Subtle neon border glow for Jillr theme */}
      <div className="absolute inset-0 rounded-2xl shadow-[0_0_24px_rgba(0,240,255,0.15)] pointer-events-none"></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default ChallengeMedia;
