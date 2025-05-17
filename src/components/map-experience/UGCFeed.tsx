
import React, { useState, useEffect } from 'react';
import { useLiveMap } from '@/hooks/useLiveMap';
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Share } from 'lucide-react';
import { ChallengeCard } from '@/components/challenge-card';
import { Challenge } from '@/components/challenge-card/types';

// Mock-Daten für den UGC-Feed
const mockUGCItems: Challenge[] = [
  {
    id: 'ugc-1',
    title: 'Summer Fashion Challenge',
    description: 'Zeige deinen besten Sommer-Look! #SummerStyle',
    type: 'video',
    imageUrl: '/assets/challenges/fashion-challenge.jpg',
    reward: '200 XP',
    expiresIn: '2 Tage',
    challengeId: 'challenge-fashion-1'
  },
  {
    id: 'ugc-2',
    title: 'Coffee Art',
    description: 'Dein kreativster Latte Art für unseren Wettbewerb',
    type: 'photo',
    imageUrl: '/assets/challenges/coffee-challenge.jpg',
    reward: '150 XP',
    expiresIn: '3 Tage',
    challengeId: 'challenge-coffee-1'
  },
  {
    id: 'ugc-3',
    title: 'Dance Challenge',
    description: 'Mach mit bei unserem viralen Tanz! #DanceWithUs',
    type: 'video',
    imageUrl: '/assets/challenges/dance-challenge.jpg',
    reward: '300 XP',
    expiresIn: '5 Tage',
    challengeId: 'challenge-dance-1'
  },
  {
    id: 'ugc-4',
    title: 'Street Photography',
    description: 'Fange den perfekten urbanen Moment ein!',
    type: 'photo',
    imageUrl: '/assets/challenges/street-challenge.jpg',
    reward: '180 XP',
    expiresIn: '1 Tag',
    challengeId: 'challenge-photo-1'
  }
];

const UGCFeed: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ugcItems, setUgcItems] = useState<Challenge[]>(mockUGCItems);
  
  const handleNextItem = () => {
    if (activeIndex < ugcItems.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };
  
  const handlePrevItem = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };
  
  const handleJoinChallenge = (id: string) => {
    console.log(`Joining challenge: ${id}`);
  };
  
  return (
    <div className="w-full h-full bg-gradient-to-t from-jillr-dark to-transparent p-2 pt-6 relative">
      <div className="absolute top-1 left-0 right-0 flex items-center justify-center">
        <div className="w-16 h-1 bg-white/30 rounded-full"></div>
      </div>
      
      <h3 className="text-white text-sm font-semibold mb-2 text-center">UGC Feed</h3>
      
      <div className="flex items-center justify-center h-full">
        <button 
          onClick={handlePrevItem}
          disabled={activeIndex === 0}
          className="p-1 text-white/70 hover:text-white disabled:opacity-30"
        >
          <ChevronLeft />
        </button>
        
        <div className="flex-1 max-w-xs h-full overflow-hidden relative">
          {ugcItems.length > 0 ? (
            <div 
              className="flex transition-transform duration-300 h-full" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {ugcItems.map((item) => (
                <div key={item.id} className="min-w-full h-full px-1">
                  <div className="relative h-full rounded-lg overflow-hidden flex flex-col">
                    <ChallengeCard 
                      challenge={item} 
                      size="compact"
                      onJoinClick={handleJoinChallenge}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center">
              <p className="text-white/70">Keine UGC-Inhalte verfügbar</p>
            </div>
          )}
        </div>
        
        <button 
          onClick={handleNextItem}
          disabled={activeIndex === ugcItems.length - 1}
          className="p-1 text-white/70 hover:text-white disabled:opacity-30"
        >
          <ChevronRight />
        </button>
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-1 left-0 right-0 flex items-center justify-center gap-1">
        {ugcItems.map((_, index) => (
          <button
            key={index}
            className={`w-1.5 h-1.5 rounded-full ${
              index === activeIndex ? 'bg-jillr-neonPurple' : 'bg-white/30'
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default UGCFeed;
