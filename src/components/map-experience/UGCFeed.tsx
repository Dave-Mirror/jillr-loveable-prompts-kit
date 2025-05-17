
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ChallengeCard } from '@/components/challenge-card';

// Mock-Daten für den UGC-Feed
const mockUGCItems = [
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

interface UGCFeedProps {
  categoryFilter?: string;
  locationFilter?: string;
}

const UGCFeed: React.FC<UGCFeedProps> = ({ categoryFilter = 'all', locationFilter = 'global' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ugcItems, setUgcItems] = useState(mockUGCItems);
  const { toast } = useToast();
  
  useEffect(() => {
    // Filter UGC items based on category if needed
    if (categoryFilter !== 'all') {
      setUgcItems(mockUGCItems.filter(item => item.type.includes(categoryFilter)));
    } else {
      setUgcItems(mockUGCItems);
    }
  }, [categoryFilter]);
  
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
    toast({
      title: "Challenge beigetreten!",
      description: `Du nimmst jetzt an der Challenge ${id} teil.`
    });
  };
  
  if (ugcItems.length === 0) {
    return (
      <div className="w-full h-full bg-gradient-to-t from-jillr-dark to-transparent p-4 flex items-center justify-center">
        <p className="text-white text-center">Keine Foto- oder Video-Challenges in dieser Region gefunden.</p>
      </div>
    );
  }
  
  return (
    <div className="w-full h-full bg-gradient-to-t from-jillr-dark to-transparent p-2 pt-6 relative">
      <div className="absolute top-2 left-0 right-0 flex justify-between items-center px-4 z-10">
        <h3 className="text-white font-semibold text-sm">Foto & Video Challenges</h3>
        <div className="flex space-x-1 items-center">
          <button 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${activeIndex === 0 ? 'text-gray-500 bg-gray-800/30' : 'text-white bg-gray-800/60'}`}
            onClick={handlePrevItem}
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-white text-xs">{activeIndex + 1}/{ugcItems.length}</span>
          <button 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${activeIndex === ugcItems.length - 1 ? 'text-gray-500 bg-gray-800/30' : 'text-white bg-gray-800/60'}`}
            onClick={handleNextItem}
            disabled={activeIndex === ugcItems.length - 1}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="flex overflow-x-hidden w-full h-full">
        <div 
          className="flex transition-transform duration-300 ease-in-out w-full h-full"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {ugcItems.map((item) => (
            <div key={item.id} className="min-w-full px-2 h-full flex items-center justify-center">
              <div className="bg-jillr-dark/70 rounded-lg shadow-lg p-3 w-full">
                <div className="flex items-start gap-3">
                  <div className="w-1/3 aspect-square bg-cover bg-center rounded-md" 
                       style={{ backgroundImage: `url(${item.imageUrl})` }} />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-300 mt-1">{item.description}</p>
                    <div className="flex items-center mt-2 text-xs text-gray-400">
                      <span className="mr-3">{item.reward}</span>
                      <span>{item.expiresIn}</span>
                    </div>
                    <div className="flex justify-between mt-3">
                      <div className="flex space-x-3">
                        <button className="text-gray-300 hover:text-white">
                          <Heart className="h-4 w-4" />
                        </button>
                        <button className="text-gray-300 hover:text-white">
                          <MessageCircle className="h-4 w-4" />
                        </button>
                        <button className="text-gray-300 hover:text-white">
                          <Share className="h-4 w-4" />
                        </button>
                      </div>
                      <button 
                        className="text-xs bg-jillr-neonPurple text-white px-3 py-1 rounded-full"
                        onClick={() => handleJoinChallenge(item.challengeId)}
                      >
                        Mitmachen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UGCFeed;
