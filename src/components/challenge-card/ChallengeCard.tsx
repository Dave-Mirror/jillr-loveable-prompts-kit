
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChallengeMedia from './ChallengeMedia';
import ChallengeBadges from './ChallengeBadges';
import ChallengeStats from './ChallengeStats';
import { ChallengeCardProps } from './types';

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
  
  return (
    <Link to={`/challenge/${id}`} className="block w-full transition-transform hover:scale-[1.02] focus:scale-[1.02]">
      <div ref={cardRef} className="challenge-card h-full flex flex-col bg-jillr-dark border border-jillr-border/30 rounded-lg overflow-hidden shadow-lg shadow-jillr-dark/50">
        <div className="relative">
          <ChallengeMedia 
            mediaType={mediaType}
            imageUrl={imageUrl}
            videoUrl={videoUrl}
            title={title}
            isVisible={isVisible}
          />
          
          <ChallengeBadges 
            type={type}
            endDate={endDate}
            hashtags={hashtags}
          />
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold mb-1.5 line-clamp-1 text-white">{title}</h3>
          <p className="text-sm text-gray-300 mb-3 line-clamp-2">{description}</p>
          
          <div className="mt-auto">
            <ChallengeStats xpReward={xpReward} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChallengeCard;
