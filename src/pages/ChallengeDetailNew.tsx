import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useChallengeLoader } from '@/hooks/useChallengeLoader';
import { ChallengeHeader } from '@/components/challenge/ChallengeHeader';
import { ChallengeDetailContent } from '@/components/challenge/ChallengeDetailContent';
import { ChallengeSidebar } from '@/components/challenge/ChallengeSidebar';
import ChallengeDetailSkeleton from '@/components/challenge/ChallengeDetailSkeleton';
import ChallengeNotFoundPanel from '@/components/challenge/ChallengeNotFoundPanel';
import DataPermissionPrompt from '@/components/challenge/DataPermissionPrompt';
import LiveMapPromotion from '@/components/challenge/LiveMapPromotion';
import { Camera, Map, FileQuestion } from 'lucide-react';
import { VideoModal } from '@/components/home/VideoModal';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const ChallengeDetailNew: React.FC = () => {
  const { slug, id } = useParams<{ slug?: string; id?: string }>();
  const navigate = useNavigate();
  
  // Use the new challenge loader
  const { challenge, isLoading, error, notFound } = useChallengeLoader({ slug, id });
  
  // Local state for UI interactions
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [showDataPermissionPrompt, setShowDataPermissionPrompt] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  // Mock data for demo - in a real app this would come from the challenge loader
  const mockSubmissions = [];
  const mockVerifiedSubmissions = [];
  const mockTopUsers = [];
  const [coachTip, setCoachTip] = useState<string | null>(null);
  const [isLoadingTip, setIsLoadingTip] = useState(false);
  
  // Helper functions
  const getChallengeTypeIcon = (type: string | null | undefined) => {
    const icons: Record<string, { name: string; colorClass: string }> = {
      'photo': { name: 'Camera', colorClass: 'text-jillr-neonCyan' },
      'video': { name: 'Camera', colorClass: 'text-jillr-neonPurple' },
      'geo': { name: 'Map', colorClass: 'text-jillr-neonPink' },
      'ar': { name: 'Badge', colorClass: 'text-jillr-neonCyan' },
      default: { name: 'FileQuestion', colorClass: 'text-jillr-neonPurple' }
    };
    
    return icons[type as string] || icons.default;
  };
  
  const renderIcon = (type: string | null | undefined) => {
    const iconInfo = getChallengeTypeIcon(type);
    switch (iconInfo.name) {
      case 'Camera': return <Camera className={`h-5 w-5 ${iconInfo.colorClass}`} />;
      case 'Map': return <Map className={`h-5 w-5 ${iconInfo.colorClass}`} />;
      case 'Badge': return <FileQuestion className={`h-5 w-5 ${iconInfo.colorClass}`} />;
      default: return <FileQuestion className={`h-5 w-5 ${iconInfo.colorClass}`} />;
    }
  };
  
  const handleJoinClick = () => {
    if (challenge) {
      setShowDataPermissionPrompt(true);
    }
  };
  
  const handleConfirmPermission = async (useLocation: boolean): Promise<boolean> => {
    setShowDataPermissionPrompt(false);
    
    if (challenge) {
      navigate(`/upload/${challenge.id}`);
      toast({
        title: "Challenge beigetreten!",
        description: `Du nimmst jetzt an "${challenge.title}" teil.`,
      });
      return true;
    }
    return false;
  };
  
  const requestCoachTip = () => {
    setIsLoadingTip(true);
    setTimeout(() => {
      setCoachTip("Tipp: Nutze natürliches Licht für bessere Foto-Ergebnisse!");
      setIsLoadingTip(false);
    }, 1500);
  };
  
  const inviteFriends = () => {
    if (navigator.share && challenge) {
      navigator.share({
        title: challenge.title,
        text: challenge.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link kopiert!",
        description: "Challenge-Link wurde in die Zwischenablage kopiert.",
      });
    }
  };
  
  const shareChallenge = (challengeId: string) => {
    inviteFriends();
  };
  
  // Use Intersection Observer to detect when video is visible
  useEffect(() => {
    if (!challenge?.thumbnailUrl || !challenge.thumbnailUrl.includes('video')) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVideoVisible(entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => {
      if (videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current);
      }
    };
  }, [challenge]);
  
  // Handle video autoplay/pause
  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isVideoVisible) {
      videoRef.current.play().catch(error => {
        if (error.name === 'NotAllowedError') {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(e => console.log('Even muted autoplay failed:', e));
          }
        }
      });
    } else {
      videoRef.current.pause();
    }
  }, [isVideoVisible]);

  // Handle loading state
  if (isLoading) {
    return <ChallengeDetailSkeleton />;
  }
  
  // Handle not found
  if (notFound || !challenge) {
    return <ChallengeNotFoundPanel slug={slug} id={id} />;
  }
  
  // Handle network error
  if (error) {
    return (
      <div className="min-h-screen bg-cosmic-dark flex items-center justify-center p-4">
        <div className="glass-card rounded-2xl p-8 max-w-md mx-auto text-center">
          <h3 className="text-xl font-bold text-[var(--txt)] mb-4">Verbindungsfehler</h3>
          <p className="text-sm text-[var(--txt-dim)] mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-jillr-neonCyan/20 to-jillr-neonPurple/20 border border-white/30 backdrop-blur-xl text-white font-semibold px-4 py-2 rounded-lg"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <ChallengeHeader 
        challenge={challenge} 
        submissions={mockSubmissions}
        getChallengeTypeIcon={renderIcon}
      />
      
      {/* Preview Media - if available */}
      {challenge.thumbnailUrl && (
        <div 
          ref={videoContainerRef}
          className="relative aspect-video w-full max-w-4xl mx-auto mt-4 mb-6 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => setIsVideoModalOpen(true)}
        >
          {challenge.category === 'video' ? (
            <video 
              ref={videoRef}
              src={challenge.thumbnailUrl} 
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
            />
          ) : (
            <img 
              src={challenge.thumbnailUrl}
              alt={challenge.thumbnailAlt || challenge.title}
              className="w-full h-full object-cover"
            />
          )}
          
          {challenge.category === 'video' && (
            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
              <div className="rounded-full bg-white/80 p-4">
                <Camera className="h-8 w-8 text-jillr-dark" />
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <ChallengeDetailContent 
            challenge={challenge}
            verifiedSubmissions={mockVerifiedSubmissions}
            coachTip={coachTip}
            isLoadingTip={isLoadingTip}
            requestCoachTip={requestCoachTip}
            inviteFriends={inviteFriends}
          />
          
          <div className="mt-6">
            <LiveMapPromotion />
          </div>
        </div>
        
        <ChallengeSidebar 
          challenge={challenge}
          submissions={mockSubmissions}
          handleJoinClick={handleJoinClick}
          requestCoachTip={requestCoachTip}
          shareChallenge={() => shareChallenge(challenge.id)}
          coachTip={coachTip}
          isLoadingTip={isLoadingTip}
          topUsers={mockTopUsers}
        />
      </div>
      
      <DataPermissionPrompt 
        open={showDataPermissionPrompt} 
        onOpenChange={setShowDataPermissionPrompt}
        dataType="location"
        xpReward={100}
        campaignName={challenge.title}
        onConfirm={async () => await handleConfirmPermission(false)}
      />
      
      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={challenge.title}
        videoUrl={challenge.thumbnailUrl || ''}
      />
    </div>
  );
};

export default ChallengeDetailNew;