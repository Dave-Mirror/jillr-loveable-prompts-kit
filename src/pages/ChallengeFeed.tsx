
import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageSquare, Share, Award, Star, Flame, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

// Types for feed items
interface FeedItem {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  challenge: {
    id: string;
    title: string;
    brand?: string;
    brandLogo?: string;
  };
  content: {
    type: 'video' | 'image';
    url: string;
    aspectRatio: number; // For proper sizing
  };
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  // Unique feature: Impact Points - shows how much positive impact this UGC has made
  impactPoints: number;
  liked: boolean;
  // Tags for the content
  tags: string[];
  // Achievements unlocked by this content
  achievements?: { 
    id: string; 
    name: string; 
    icon: string;
    points: number;
  }[];
}

const ChallengeFeed = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  // Mock data for feed
  const mockFeedItems: FeedItem[] = [
    {
      id: '1',
      user: {
        id: 'u1',
        name: 'Sarah Meyer',
        username: 'sarahcreates',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256'
      },
      challenge: {
        id: 'c1',
        title: 'Summer Beach Cleanups',
        brand: 'OceanGuard',
        brandLogo: 'https://via.placeholder.com/40'
      },
      content: {
        type: 'video',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-happily-1228-large.mp4',
        aspectRatio: 9/16
      },
      caption: 'Just finished my beach cleanup challenge! Collected over 5kg of plastic! 🌊 #OceanGuard #SaveTheOcean',
      likes: 1243,
      comments: 89,
      shares: 32,
      impactPoints: 120,
      liked: false,
      tags: ['beachcleanup', 'environment', 'sustainability'],
      achievements: [
        { 
          id: 'a1', 
          name: 'Beach Hero', 
          icon: '🏆',
          points: 50
        },
        { 
          id: 'a2', 
          name: 'Influencer', 
          icon: '⭐',
          points: 25
        }
      ]
    },
    {
      id: '2',
      user: {
        id: 'u2',
        name: 'Marco Wirtz',
        username: 'marcowirtz',
        avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=256&h=256'
      },
      challenge: {
        id: 'c2',
        title: 'Urban Photography',
        brand: 'CityLens',
        brandLogo: 'https://via.placeholder.com/40'
      },
      content: {
        type: 'video',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-urban-trendy-people-dancing-near-a-house-4814-large.mp4',
        aspectRatio: 9/16
      },
      caption: 'Exploring the hidden corners of Berlin with my new CityLens camera! #UrbanExploration',
      likes: 876,
      comments: 45,
      shares: 21,
      impactPoints: 75,
      liked: false,
      tags: ['photography', 'urban', 'berlin'],
      achievements: [
        { 
          id: 'a3', 
          name: 'Urban Explorer', 
          icon: '🏙️',
          points: 35
        }
      ]
    },
    {
      id: '3',
      user: {
        id: 'u3',
        name: 'Leila Khan',
        username: 'leilakfitness',
        avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=256&h=256'
      },
      challenge: {
        id: 'c3',
        title: 'Green Smoothie Week',
        brand: 'GreenBlend',
        brandLogo: 'https://via.placeholder.com/40'
      },
      content: {
        type: 'video',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-taking-a-selfie-with-her-smartphone-standing-47069-large.mp4',
        aspectRatio: 9/16
      },
      caption: 'Day 5 of the @GreenBlend challenge! This kale and mango smoothie is 🔥 #SmoothieWeek',
      likes: 1012,
      comments: 67,
      shares: 15,
      impactPoints: 90,
      liked: false,
      tags: ['fitness', 'health', 'smoothie'],
      achievements: [
        { 
          id: 'a4', 
          name: 'Health Guru', 
          icon: '🥑',
          points: 40
        }
      ]
    }
  ];

  // Load feed items
  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      setFeedItems(mockFeedItems);
      setLoading(false);
    }, 1500);
  }, []);

  // Handle scroll to play/pause videos
  useEffect(() => {
    const handleScroll = () => {
      if (feedRef.current) {
        const items = feedRef.current.querySelectorAll('.feed-item');
        if (items.length === 0) return;
        
        let newActiveIndex = activeIndex;
        
        items.forEach((item, index) => {
          const rect = item.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
          
          if (isVisible && newActiveIndex !== index) {
            newActiveIndex = index;
          }
        });
        
        if (newActiveIndex !== activeIndex) {
          setActiveIndex(newActiveIndex);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  // Handle like interaction
  const handleLike = (id: string) => {
    setFeedItems(items => 
      items.map(item => 
        item.id === id 
          ? { 
              ...item, 
              liked: !item.liked, 
              likes: item.liked ? item.likes - 1 : item.likes + 1,
              impactPoints: item.liked ? item.impactPoints - 2 : item.impactPoints + 2
            } 
          : item
      )
    );
  };

  // Handle comment interaction
  const handleComment = (id: string) => {
    toast({
      title: "Comments",
      description: "Comments feature coming soon!",
    });
  };

  // Handle share interaction
  const handleShare = (id: string) => {
    toast({
      title: "Share",
      description: "Share feature coming soon!",
    });
    
    setFeedItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, shares: item.shares + 1, impactPoints: item.impactPoints + 5 }
          : item
      )
    );
  };

  // Handle showing achievement details
  const toggleAchievement = (id: string | null) => {
    setShowAchievement(showAchievement === id ? null : id);
  };

  // Show unique feature: Support the cause
  const handleSupportCause = (id: string) => {
    toast({
      title: "Impact Made!",
      description: "Thank you for supporting this cause! +25 impact points awarded.",
      className: "bg-jillr-neonGreen/20"
    });
    
    setFeedItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, impactPoints: item.impactPoints + 25 }
          : item
      )
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-t-jillr-neonPurple border-r-transparent border-b-jillr-neonPurple border-l-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-jillr-neonPurple">Loading challenge feed...</p>
      </div>
    );
  }

  return (
    <div ref={feedRef} className="pb-20">
      {feedItems.map((item, index) => (
        <div 
          key={item.id}
          className={`feed-item relative h-screen w-full flex items-center justify-center bg-black overflow-hidden snap-center`}
        >
          {/* Video/Image Content */}
          {item.content.type === 'video' ? (
            <video
              src={item.content.url}
              className="absolute inset-0 w-full h-full object-cover"
              loop
              muted
              playsInline
              autoPlay={index === activeIndex}
              controls={false}
            />
          ) : (
            <img
              src={item.content.url}
              className="absolute inset-0 w-full h-full object-cover"
              alt={item.caption}
            />
          )}
          
          {/* Overlay gradient for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          
          {/* User & Challenge Info */}
          <div className="absolute top-4 left-4 flex items-center">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={item.user.avatar} alt={item.user.name} />
              <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <p className="font-semibold text-white">{item.user.name}</p>
              <p className="text-xs text-gray-300">@{item.user.username}</p>
            </div>
            
            {item.challenge.brand && (
              <Badge className="ml-2 bg-jillr-neonPurple/80 hover:bg-jillr-neonPurple">
                {item.challenge.title}
              </Badge>
            )}
          </div>
          
          {/* Caption & Tags */}
          <div className="absolute bottom-24 left-4 right-12 max-w-[80%]">
            <p className="text-white mb-2">{item.caption}</p>
            <div className="flex flex-wrap gap-1">
              {item.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs bg-white/10">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Right side interactions */}
          <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-4">
            <div className="flex flex-col items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`rounded-full bg-black/30 backdrop-blur-md ${item.liked ? 'text-red-500' : 'text-white'}`}
                onClick={() => handleLike(item.id)}
              >
                <Heart className={`h-7 w-7 ${item.liked ? 'fill-red-500' : ''}`} />
              </Button>
              <span className="text-white text-xs mt-1">{item.likes}</span>
            </div>
            
            <div className="flex flex-col items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-black/30 backdrop-blur-md"
                onClick={() => handleComment(item.id)}
              >
                <MessageSquare className="h-7 w-7" />
              </Button>
              <span className="text-white text-xs mt-1">{item.comments}</span>
            </div>
            
            <div className="flex flex-col items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-black/30 backdrop-blur-md"
                onClick={() => handleShare(item.id)}
              >
                <Share className="h-7 w-7" />
              </Button>
              <span className="text-white text-xs mt-1">{item.shares}</span>
            </div>
            
            {/* Unique Feature: Impact Points */}
            <div className="flex flex-col items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-jillr-neonGreen/20 backdrop-blur-md text-jillr-neonGreen"
                onClick={() => handleSupportCause(item.id)}
              >
                <Flame className="h-7 w-7" />
              </Button>
              <span className="text-jillr-neonGreen text-xs mt-1">{item.impactPoints} IP</span>
            </div>
            
            {/* Achievement showcase */}
            {item.achievements && item.achievements.length > 0 && (
              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-jillr-neonPurple/20 backdrop-blur-md text-jillr-neonPurple"
                  onClick={() => toggleAchievement(item.id)}
                >
                  <Award className="h-7 w-7" />
                </Button>
                <span className="text-jillr-neonPurple text-xs mt-1">
                  {showAchievement === item.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </span>
              </div>
            )}
          </div>
          
          {/* Achievement details panel - slides up when toggled */}
          <AnimatePresence>
            {showAchievement === item.id && item.achievements && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-4 rounded-t-xl"
              >
                <h4 className="text-white font-semibold mb-2 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-jillr-neonPurple" />
                  Achievements Unlocked
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.achievements.map(achievement => (
                    <div key={achievement.id} className="bg-jillr-dark p-3 rounded-lg flex items-center space-x-2">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <p className="text-white font-medium">{achievement.name}</p>
                        <p className="text-jillr-neonPurple text-xs">+{achievement.points} points</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-2 text-white/70"
                  onClick={() => toggleAchievement(null)}
                >
                  Close
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Indicator for scrolling */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-6 w-6 text-white/50" />
          </div>
          
          {/* Tooltip for the Impact Points feature */}
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/30 backdrop-blur-md h-8 w-8"
              onClick={() => toast({
                title: "Impact Points",
                description: "Support content that makes a positive difference! When you engage with this content, you help amplify its reach and impact.",
              })}
            >
              <Info className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      ))}
      
      {/* End of feed indicator */}
      {feedItems.length > 0 && (
        <div className="h-24 flex items-center justify-center text-center">
          <p className="text-gray-400">You've reached the end. Come back later for more content!</p>
        </div>
      )}
    </div>
  );
};

export default ChallengeFeed;
