
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Zap, Clock, Upload, ExternalLink, Share2, Users, Award, MapPin, Video, Map, Camera, Coins, Star, Trophy, ThumbsUp, MessageCircle, Instagram, Facebook, Smartphone } from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

type Submission = {
  id: string;
  user_id: string;
  username?: string;
  profile_image?: string;
  video_url?: string;
  views: number;
  likes: number;
  status: string;
};

type Reward = {
  type: 'coins' | 'xp' | 'product' | 'ticket' | 'voucher';
  description: string;
  image?: string;
  level?: number;
  immediate: boolean;
  viral_bonus?: boolean;
};

const ChallengeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<any>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [topUsers, setTopUsers] = useState<any[]>([]);
  const [verifiedSubmissions, setVerifiedSubmissions] = useState<Submission[]>([]);
  const [coachTip, setCoachTip] = useState<string>('');
  const [isLoadingTip, setIsLoadingTip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock rewards for now
  const mockRewards: Reward[] = [
    { type: 'coins', description: '250 Coins sofort nach Upload', immediate: true },
    { type: 'xp', description: '500 XP für verifizierte Teilnahme', immediate: false },
    { type: 'product', description: 'T-Shirt bei über 1000 Views', level: 1000, immediate: false, viral_bonus: true },
    { type: 'voucher', description: '10% Rabatt-Code', immediate: true },
  ];

  useEffect(() => {
    const fetchChallengeDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        // Fetch challenge data
        const { data, error } = await supabase
          .from('challenges')
          .select('*')
          .filter('id', 'eq', id)
          .maybeSingle();
          
        if (error) {
          console.error('Error fetching challenge:', error);
          throw error;
        }
        
        if (!data) {
          setIsLoading(false);
          return;
        }
        
        setChallenge(data);
        
        // Fetch submissions for this challenge
        const { data: submissionsData, error: submissionsError } = await supabase
          .from('uploads')
          .select('*')
          .eq('challenge_id', id);
          
        if (submissionsError) throw submissionsError;
        
        // Fetch top users based on views/likes for the leaderboard
        // For now using mock data, would need a more complex query in production
        const topSubmissions = Array.isArray(submissionsData) 
          ? [...submissionsData].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3)
          : [];
          
        setTopUsers(topSubmissions.map(sub => ({
          id: sub.id,
          user_id: sub.user_id,
          username: `User_${sub.user_id.substring(0, 5)}`, // Placeholder
          views: sub.views || 0,
          likes: sub.likes || 0
        })));
        
        // Filter verified submissions for the gallery
        const verified = Array.isArray(submissionsData)
          ? submissionsData.filter(sub => sub.verified === true)
          : [];
          
        setVerifiedSubmissions(verified);
        setSubmissions(submissionsData || []);
      } catch (error) {
        console.error('Error fetching challenge details:', error);
        toast({
          title: "Fehler",
          description: "Die Challenge-Details konnten nicht geladen werden.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChallengeDetails();
  }, [id, toast]);

  const handleJoinClick = () => {
    if (!user) {
      toast({
        title: "Login erforderlich",
        description: "Bitte melde dich an, um an dieser Challenge teilzunehmen",
        variant: "destructive"
      });
      navigate('/auth', { state: { from: { pathname: `/challenge/${id}` } } });
      return;
    }
    
    navigate(`/upload/${id}`);
  };
  
  const requestCoachTip = async () => {
    if (!challenge) return;
    
    setIsLoadingTip(true);
    try {
      // Mock API call since the edge function isn't implemented yet
      // In a real implementation, this would call the coachTip edge function
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCoachTip(
        `Für diese "${challenge.type || 'Video'}" Challenge empfehle ich dir: ` +
        `1. Achte auf gute Beleuchtung und Tonqualität. ` +
        `2. Halte dich an die Hashtags: ${challenge.hashtags?.join(', ') || '#jillr'}. ` +
        `3. Zeige Authentizität und Kreativität in deinem Content.`
      );
    } catch (error) {
      console.error('Error fetching coach tip:', error);
      toast({
        title: "Fehler",
        description: "Tipp konnte nicht geladen werden.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingTip(false);
    }
  };
  
  const shareChallenge = () => {
    if (navigator.share) {
      navigator.share({
        title: challenge?.title,
        text: `Check out this challenge: ${challenge?.title}`,
        url: window.location.href,
      })
      .then(() => {
        toast({
          title: "Geteilt!",
          description: "Du erhältst 50 XP für das Teilen!",
        });
      })
      .catch(console.error);
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link kopiert!",
        description: "Der Challenge-Link wurde in die Zwischenablage kopiert.",
      });
    }
  };
  
  const inviteFriends = () => {
    const message = `Hey! Schau dir diese Challenge auf Jillr an: ${challenge?.title} ${window.location.href}`;
    
    if (navigator.share) {
      navigator.share({
        title: "Freunde zu Jillr einladen",
        text: message,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(message);
      toast({
        title: "Einladungstext kopiert!",
        description: "Die Einladung wurde in die Zwischenablage kopiert.",
      });
    }
  };

  const getChallengeTypeIcon = (type: string | null | undefined) => {
    switch(type?.toLowerCase()) {
      case 'video': return <Video size={24} />;
      case 'geofencing': return <MapPin size={24} />;
      case 'ar': return <Camera size={24} />;
      default: return <Video size={24} />;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="glassmorphism p-8">
          <h1 className="text-2xl font-bold mb-6">Challenge wird geladen...</h1>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="glassmorphism p-8">
          <h1 className="text-2xl font-bold mb-6">Challenge nicht gefunden</h1>
          <p>Die gesuchte Challenge existiert nicht oder wurde entfernt.</p>
          <Link to="/explore" className="mt-4 inline-block">
            <Button>
              Zurück zur Übersicht
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Set dynamic accent color from challenge branding (fallback to default)
  const accentColor = challenge.brand_color || '#9b87f5';
  const accentStyle = {
    '--accent-color': accentColor,
    '--accent-color-light': `${accentColor}20` // 20% opacity version
  } as React.CSSProperties;

  return (
    <div className="container mx-auto px-4 py-6 md:py-12" style={accentStyle}>
      {/* 1. Header Section */}
      <div className="neon-card mb-8" style={{borderColor: accentColor}}>
        <div className="neon-card-content p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-jillr-neonPurple/20 text-jillr-neonPurple">
                  {getChallengeTypeIcon(challenge.type)}
                  <span className="ml-1">{challenge.type || 'Challenge'}</span>
                </span>
                {challenge.brand_logo && (
                  <img 
                    src={challenge.brand_logo} 
                    alt="Brand logo" 
                    className="h-6 w-auto object-contain" 
                  />
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{challenge.title}</h1>
            </div>
            
            <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
              <div className="flex items-center">
                <div className="flex items-center p-2 rounded-lg bg-jillr-darkBlue/50">
                  <Users size={18} className="text-jillr-neonGreen" />
                  <span className="ml-2 text-sm font-medium">
                    {submissions.length || 0} Teilnehmer
                  </span>
                </div>
              </div>
              
              <div>
                <span className="text-sm">Endet in:</span>
                <CountdownTimer endDate={challenge.end_date} />
              </div>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground mb-6">{challenge.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {challenge.hashtags && challenge.hashtags.map((tag: string, index: number) => (
              <span key={index} className="px-2 py-1 rounded-full bg-jillr-darkBlue text-jillr-neonBlue text-xs">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* 2. Challenge Description & Requirements */}
          <Accordion type="single" collapsible className="w-full mb-6">
            <AccordionItem value="details">
              <AccordionTrigger className="text-xl font-semibold">
                Details & Anforderungen
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 p-2">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <Clock size={20} className="text-jillr-neonPink" />
                      <div>
                        <div className="font-semibold">Zeitraum</div>
                        <div className="text-sm">
                          {new Date(challenge.start_date).toLocaleDateString()} bis {new Date(challenge.end_date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    {challenge.location && (
                      <div className="flex items-center gap-3">
                        <MapPin size={20} className="text-jillr-neonPink" />
                        <div>
                          <div className="font-semibold">Ort</div>
                          <div className="text-sm">{challenge.location}</div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3">
                      <Award size={20} className="text-jillr-neonPink" />
                      <div>
                        <div className="font-semibold">Belohnung</div>
                        <div className="text-sm">{challenge.coin_reward || 0} Coins</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Video size={20} className="text-jillr-neonPink" />
                      <div>
                        <div className="font-semibold">Format</div>
                        <div className="text-sm">
                          {challenge.required_format || 'Video (empfohlen: 9:16 Verhältnis für TikTok)'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {/* Live Leaderboard */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy size={20} className="text-yellow-500" />
                Leaderboard
              </CardTitle>
              <CardDescription>Die Top-Teilnehmer dieser Challenge</CardDescription>
            </CardHeader>
            <CardContent>
              {topUsers.length > 0 ? (
                <div className="space-y-4">
                  {topUsers.map((user, index) => (
                    <div key={user.id} className="flex items-center justify-between p-3 rounded-lg glassmorphism">
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center h-8 w-8 rounded-full ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-700'} text-black font-bold`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{user.username}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="flex items-center"><Star size={12} className="mr-1" /> {user.views} Views</span>
                            <span className="flex items-center"><ThumbsUp size={12} className="mr-1" /> {user.likes} Likes</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-jillr-neonGreen font-semibold">
                        {index === 0 ? '+1000 XP' : index === 1 ? '+750 XP' : '+500 XP'}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  Noch keine Teilnehmer in dieser Challenge. Sei der Erste!
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* 3. CTA & Content Interaction */}
          <div className="flex flex-col gap-4 sticky bottom-0 md:relative bg-gradient-to-t from-background to-transparent pb-4 pt-2 md:bg-none">
            <Button 
              className="neon-button w-full py-6 text-lg"
              onClick={handleJoinClick}
            >
              <Upload size={20} className="mr-2" />
              Jetzt an der Challenge teilnehmen
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={requestCoachTip}
                  >
                    <MessageCircle size={18} className="mr-2" />
                    Tipp vom KI-Coach
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tipp vom KI-Coach</DialogTitle>
                    <DialogDescription>
                      Persönliche Empfehlungen für diese Challenge
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    {isLoadingTip ? (
                      <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-jillr-neonPurple"></div>
                      </div>
                    ) : (
                      <p className="text-md">{coachTip}</p>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={shareChallenge}
              >
                <Share2 size={18} className="mr-2" />
                Teilen & XP verdienen
              </Button>
            </div>
          </div>
          
          {/* 6. Community & Social Sharing */}
          {verifiedSubmissions.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users size={20} className="text-jillr-neonPurple" />
                  Community Einreichungen
                </CardTitle>
                <CardDescription>
                  Verifizierte Einreichungen von anderen Teilnehmern
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {verifiedSubmissions.map((submission) => (
                    <div key={submission.id} className="neon-card overflow-hidden">
                      <div className="neon-card-content p-3">
                        <div className="aspect-video bg-black/50 rounded-md mb-2 flex items-center justify-center">
                          {submission.video_url ? (
                            <video 
                              src={submission.video_url} 
                              controls 
                              className="w-full h-full object-cover rounded-md"
                            ></video>
                          ) : (
                            <div className="text-center text-muted-foreground">Video nicht verfügbar</div>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm font-medium">User_{submission.user_id.substring(0, 5)}</div>
                          <div className="flex items-center gap-3">
                            <button className="flex items-center text-sm text-muted-foreground hover:text-jillr-neonPink">
                              <ThumbsUp size={14} className="mr-1" />
                              {submission.likes || 0}
                            </button>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Star size={14} className="mr-1" />
                              {submission.views || 0}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={inviteFriends}>
                  <Users size={18} className="mr-2" />
                  Freunde einladen
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          {/* 4. Rewards Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award size={20} className="text-yellow-500" />
                Belohnungen
              </CardTitle>
              <CardDescription>
                Das kannst du in dieser Challenge gewinnen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRewards.map((reward, index) => {
                  const isReachable = reward.immediate || (reward.level && reward.level <= 1000);
                  
                  return (
                    <div 
                      key={index} 
                      className={`flex items-center p-3 rounded-lg border ${
                        isReachable 
                          ? 'border-green-500/30 bg-green-500/5' 
                          : 'glassmorphism'
                      }`}
                    >
                      <div className="mr-4">
                        {reward.type === 'coins' && <Coins size={24} className="text-yellow-500" />}
                        {reward.type === 'xp' && <Zap size={24} className="text-jillr-neonPurple" />}
                        {reward.type === 'product' && <Trophy size={24} className="text-amber-500" />}
                        {reward.type === 'ticket' && <Smartphone size={24} className="text-jillr-neonBlue" />}
                        {reward.type === 'voucher' && <Award size={24} className="text-jillr-neonPink" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{reward.description}</div>
                        <div className="text-xs text-muted-foreground">
                          {reward.immediate 
                            ? 'Sofort nach Upload' 
                            : reward.level 
                              ? `Ab ${reward.level} Views` 
                              : 'Nach Verifikation'
                          }
                        </div>
                      </div>
                      {isReachable && (
                        <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded">
                          Erreichbar
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          {/* 5. Interactive Features */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Dein aktueller Stand</CardTitle>
              <CardDescription>
                Deine XP und Coins für diese Challenge
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg glassmorphism">
                    <div className="flex items-center">
                      <Zap size={20} className="text-jillr-neonPurple mr-2" />
                      <span>XP für diese Challenge</span>
                    </div>
                    <div className="font-bold text-jillr-neonPurple">+250 XP</div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 rounded-lg glassmorphism">
                    <div className="flex items-center">
                      <Coins size={20} className="text-yellow-500 mr-2" />
                      <span>Coins für diese Challenge</span>
                    </div>
                    <div className="font-bold text-yellow-500">+100 Coins</div>
                  </div>
                  
                  {submissions.length === 0 && (
                    <div className="text-center py-3 text-muted-foreground text-sm">
                      Du hast noch nicht an dieser Challenge teilgenommen.
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="mb-4 text-muted-foreground">
                    Melde dich an, um deine Belohnungen zu sehen
                  </p>
                  <Link to="/auth">
                    <Button>Anmelden</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* 8. Security & Validation */}
          <div className="p-4 rounded-lg bg-jillr-darkBlue/30 border border-jillr-darkBlue">
            <div className="flex items-start mb-2">
              <div className="mt-1 mr-3 bg-jillr-neonBlue/20 p-1.5 rounded-full">
                <Camera size={16} className="text-jillr-neonBlue" />
              </div>
              <div>
                <h3 className="font-medium mb-1">AR/Geofencing Validierung</h3>
                <p className="text-sm text-muted-foreground">
                  Deine Teilnahme wird automatisch geprüft – bleib fair!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
