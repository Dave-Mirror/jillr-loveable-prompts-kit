
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Share2, Camera, Video } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ChallengeCategory, BrandFilter } from '@/pages/ChallengeExplorer';

interface UgcFeedProps {
  categoryFilter: ChallengeCategory;
  brandFilter: BrandFilter;
}

// Mock UGC data
const mockUgcItems = [
  {
    id: 'ugc1',
    username: 'MariaStyle',
    avatar: '/assets/avatars/user1.jpg',
    type: 'video',
    thumbnail: 'https://source.unsplash.com/random/300x400/?fashion',
    likes: 1243,
    comments: 89,
    title: 'Summer Street Style Challenge',
    brand: 'Nike',
    xp: 500
  },
  {
    id: 'ugc2',
    username: 'FitJohn',
    avatar: '/assets/avatars/user2.jpg',
    type: 'video',
    thumbnail: 'https://source.unsplash.com/random/300x400/?fitness',
    likes: 986,
    comments: 45,
    title: 'Morning Run Challenge',
    brand: 'Adidas',
    xp: 350
  },
  {
    id: 'ugc3',
    username: 'CoffeeLover',
    avatar: '/assets/avatars/user3.jpg',
    type: 'photo',
    thumbnail: 'https://source.unsplash.com/random/300x400/?coffee',
    likes: 1523,
    comments: 124,
    title: 'Coffee Art AR Challenge',
    brand: 'Starbucks',
    xp: 400
  },
  {
    id: 'ugc4',
    username: 'FashionQueen',
    avatar: '/assets/avatars/user4.jpg',
    type: 'video',
    thumbnail: 'https://source.unsplash.com/random/300x400/?makeup',
    likes: 2134,
    comments: 93,
    title: 'Beauty Makeover Challenge',
    brand: 'Sephora',
    xp: 550
  },
  {
    id: 'ugc5',
    username: 'RunnerPro',
    avatar: '/assets/avatars/user5.jpg',
    type: 'photo',
    thumbnail: 'https://source.unsplash.com/random/300x400/?running',
    likes: 732,
    comments: 28,
    title: 'Trail Running Challenge',
    brand: 'Under Armour',
    xp: 450
  }
];

const UgcFeed: React.FC<UgcFeedProps> = ({ categoryFilter, brandFilter }) => {
  const { toast } = useToast();
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Filter UGC items based on category and brand filters
  const filteredUgc = mockUgcItems.filter(item => {
    if (categoryFilter !== 'all' && categoryFilter === 'video' && item.type !== 'video') return false;
    if (brandFilter !== 'all' && item.brand !== brandFilter) return false;
    return true;
  });

  const handleNextItem = () => {
    if (activeIndex < filteredUgc.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };
  
  const handlePrevItem = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleLike = (id: string) => {
    toast({
      description: "Added to your favorites"
    });
  };

  return (
    <div className="w-full backdrop-blur-lg bg-gradient-to-t from-jillr-dark/95 to-jillr-dark/60 py-3 px-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-white px-2">Community Content</h3>
        <div className="flex items-center">
          <button 
            onClick={handlePrevItem}
            disabled={activeIndex === 0}
            className="p-1 text-white/70 hover:text-white disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex space-x-1">
            {filteredUgc.map((_, i) => (
              <button
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${activeIndex === i ? 'bg-jillr-neonPurple' : 'bg-white/30'}`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
          
          <button 
            onClick={handleNextItem}
            disabled={activeIndex === filteredUgc.length - 1 || filteredUgc.length === 0}
            className="p-1 text-white/70 hover:text-white disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {filteredUgc.length > 0 ? (
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${activeIndex * 100 / filteredUgc.length}%)`, width: `${filteredUgc.length * 100}%` }}
          >
            {filteredUgc.map((item) => (
              <div key={item.id} className="p-1" style={{ width: `${100 / filteredUgc.length}%` }}>
                <div className="bg-jillr-darkLight/30 rounded-lg overflow-hidden border border-jillr-border group hover:border-jillr-neonPurple transition-colors">
                  <div className="relative">
                    <AspectRatio ratio={3/4}>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    
                    {/* Content type badge */}
                    <Badge variant="secondary" className="absolute top-2 right-2 bg-jillr-dark/80">
                      {item.type === 'video' ? (
                        <Video className="h-3 w-3 mr-1" />
                      ) : (
                        <Camera className="h-3 w-3 mr-1" />
                      )}
                      {item.type === 'video' ? 'Video' : 'Photo'}
                    </Badge>
                    
                    {/* Brand badge */}
                    <div className="absolute top-2 left-2">
                      <img
                        src={`https://placehold.co/30x30?text=${item.brand?.charAt(0) || 'J'}`}
                        alt={item.brand}
                        className="h-6 w-6 rounded-full border border-white"
                      />
                    </div>

                    {/* Play overlay for video content */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="h-12 w-12 rounded-full bg-jillr-dark/60 flex items-center justify-center">
                          <div className="h-3 w-3 border-t-transparent border-t-8 border-l-8 border-l-white ml-1 rotate-90" />
                        </div>
                      </div>
                    )}
                    
                    {/* Bottom content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-jillr-dark to-transparent pt-8 pb-2 px-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={item.avatar} />
                            <AvatarFallback className="text-xs">
                              {item.username.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-white font-medium">{item.username}</span>
                        </div>
                        <div className="text-xs text-jillr-neonPurple font-medium">
                          +{item.xp} XP
                        </div>
                      </div>
                      
                      <div className="flex mt-2 justify-between">
                        <button onClick={() => handleLike(item.id)} className="flex items-center text-white/80 hover:text-white">
                          <Heart className="h-4 w-4 mr-1" />
                          <span className="text-xs">{item.likes}</span>
                        </button>
                        <button className="flex items-center text-white/80 hover:text-white">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          <span className="text-xs">{item.comments}</span>
                        </button>
                        <button className="flex items-center text-white/80 hover:text-white">
                          <Share2 className="h-4 w-4 mr-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center p-4">
          <p className="text-white/70 text-sm">No content matches your filters</p>
        </div>
      )}
    </div>
  );
};

export default UgcFeed;
