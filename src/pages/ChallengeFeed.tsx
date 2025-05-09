
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Heart, MessageSquare, Share, Award, Star, Flame, 
  Info, ChevronDown, ChevronUp, Flag 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  fetchFeedData, 
  likeContent, 
  shareContent, 
  supportCause, 
  joinChallenge,
  FeedItem 
} from '@/utils/challenge/feed';

const ChallengeFeed = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Load feed items
  useEffect(() => {
    const loadFeed = async () => {
      setLoading(true);
      try {
        const data = await fetchFeedData();
        setFeedItems(data);
      } catch (error) {
        console.error('Failed to fetch feed:', error);
        toast({
          title: "Fehler beim Laden",
          description: "Feed konnte nicht geladen werden.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadFeed();
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

  // Handle join challenge action
  const handleJoinChallenge = async (challengeId: string, challengeTitle: string) => {
    try {
      await joinChallenge(challengeId);
      // Optional: Navigate to challenge page or upload page
      // navigate(`/challenge/${challengeId}`);
    } catch (error) {
      console.error('Failed to join challenge:', error);
      toast({
        title: "Fehler",
        description: "Beitritt zur Challenge fehlgeschlagen.",
        variant: "destructive"
      });
    }
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
            
            {/* Challenge Join Button - New addition */}
            <div className="flex flex-col items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-jillr-neonPurple/30 backdrop-blur-md text-white"
                onClick={() => handleJoinChallenge(item.challenge.id, item.challenge.title)}
              >
                <Flag className="h-7 w-7" />
              </Button>
              <span className="text-white text-xs mt-1">Teilnehmen</span>
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

          {/* Challenge Participation Button - Floating action button */}
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
            <Button 
              onClick={() => handleJoinChallenge(item.challenge.id, item.challenge.title)}
              className="bg-gradient-to-r from-jillr-neonPurple to-jillr-neonPink px-6 py-2 rounded-full text-white font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <Flag className="h-5 w-5" />
              Challenge teilnehmen
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
