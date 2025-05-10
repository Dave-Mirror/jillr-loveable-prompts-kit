
import React, { useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

interface ChallengeMediaProps {
  mediaType?: 'image' | 'video';
  imageUrl: string;
  videoUrl?: string;
  title: string;
  isVisible: boolean;
}

const ChallengeMedia: React.FC<ChallengeMediaProps> = ({
  mediaType = 'image',
  imageUrl,
  videoUrl,
  title,
  isVisible
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video play/pause based on visibility
  useEffect(() => {
    if (!videoRef.current || mediaType !== 'video') return;
    
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

  return (
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
    </div>
  );
};

export default ChallengeMedia;
