
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
import { Reward } from '@/types/dashboard';
import { challengeTypeImages, coachTips, rewardsData } from '@/utils/challengeData';
import { ChallengeHeader } from '@/components/challenge/ChallengeHeader';
import { ChallengeDetails } from '@/components/challenge/ChallengeDetails';
import { LeaderboardCard } from '@/components/challenge/LeaderboardCard';
import { ChallengeActions } from '@/components/challenge/ChallengeActions';
import { CommunitySubmissions } from '@/components/challenge/CommunitySubmissions';
import { RewardsCard } from '@/components/challenge/RewardsCard';
import { UserProgressCard } from '@/components/challenge/UserProgressCard';
import { SecurityInfo } from '@/components/challenge/SecurityInfo';

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
        
        // Füge das passende Bild basierend auf dem Challenge-Typ hinzu
        const challengeWithImage = {
          ...data,
          imageUrl: challengeTypeImages[data.type] || challengeTypeImages['default']
        };
        
        setChallenge(challengeWithImage);
        
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
      // In einer realen Implementierung würde hier die KI-Edge-Funktion aufgerufen werden
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Wähle spezifischen Tipp basierend auf dem Challenge-Typ
      const specificTips = coachTips[challenge.type] || coachTips['default'];
      
      // Füge Hashtags und persönliche Anrede hinzu
      const personalizedTip = `Hey ${user?.email?.split('@')[0] || 'Creator'}! 

Hier sind meine Tipps für deine "${challenge.title}" (${challenge.type || 'Video'})-Challenge:

${specificTips}

Wichtig: Vergiss nicht die Hashtags ${challenge.hashtags?.map((tag: string) => '#' + tag).join(' ') || '#jillr'} zu verwenden!

Viel Erfolg! 🚀`;
      
      setCoachTip(personalizedTip);
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

  // Ermittle die passenden Belohnungen basierend auf dem Challenge-Typ
  const getRewards = (): Reward[] => {
    if (!challenge?.type) return rewardsData['default'];
    return rewardsData[challenge.type] || rewardsData['default'];
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

  // Verwende die Challenge-spezifischen Belohnungen
  const challengeRewards = getRewards();

  // Set dynamic accent color from challenge branding (fallback to default)
  const accentColor = challenge.brand_color || '#9b87f5';
  const accentStyle = {
    '--accent-color': accentColor,
    '--accent-color-light': `${accentColor}20` // 20% opacity version
  } as React.CSSProperties;

  return (
    <div className="container mx-auto px-4 py-6 md:py-12" style={accentStyle}>
      {/* 1. Header Section */}
      <ChallengeHeader 
        challenge={challenge} 
        submissions={submissions}
        getChallengeTypeIcon={getChallengeTypeIcon}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* 2. Challenge Description & Requirements */}
          <ChallengeDetails challenge={challenge} />
          
          {/* Live Leaderboard */}
          <LeaderboardCard topUsers={topUsers} />
          
          {/* 3. CTA & Content Interaction */}
          <ChallengeActions 
            handleJoinClick={handleJoinClick}
            requestCoachTip={requestCoachTip}
            shareChallenge={shareChallenge}
            coachTip={coachTip}
            isLoadingTip={isLoadingTip}
            challenge={challenge}
          />
          
          {/* 6. Community & Social Sharing */}
          {verifiedSubmissions.length > 0 && (
            <CommunitySubmissions 
              verifiedSubmissions={verifiedSubmissions} 
              inviteFriends={inviteFriends} 
            />
          )}
        </div>
        
        <div className="space-y-6">
          {/* 4. Rewards Overview */}
          <RewardsCard challengeRewards={challengeRewards} />
          
          {/* 5. Interactive Features */}
          <UserProgressCard 
            user={user} 
            challenge={challenge} 
            submissions={submissions} 
          />
          
          {/* 8. Security & Validation */}
          <SecurityInfo />
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
