
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ChallengeHeader } from '@/components/challenge/ChallengeHeader';
import { ChallengeDetailContent } from '@/components/challenge/ChallengeDetailContent';
import { ChallengeSidebar } from '@/components/challenge/ChallengeSidebar';
import { ChallengeLoading } from '@/components/challenge/ChallengeLoading';
import { ChallengeNotFound } from '@/components/challenge/ChallengeNotFound';
import DataPermissionPrompt from '@/components/challenge/DataPermissionPrompt';
import LiveMapPromotion from '@/components/challenge/LiveMapPromotion';
import useChallengeDetailPage from '@/hooks/useChallengeDetailPage';
import { Camera, Map, FileQuestion } from 'lucide-react';
import { VideoModal } from '@/components/home/VideoModal';

const ChallengeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    challenge,
    isLoading,
    submissions,
    verifiedSubmissions,
    coachTip,
    isLoadingTip,
    showDataPermissionPrompt,
    setShowDataPermissionPrompt,
    handleConfirmPermission,
    topUsers,
    requestCoachTip,
    handleJoinClick,
    inviteFriends,
    getChallengeTypeIcon,
    shareChallenge
  } = useChallengeDetailPage(id);
  
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  
  const renderIcon = (type: string | null | undefined) => {
    const iconInfo = getChallengeTypeIcon(type);
    switch (iconInfo.name) {
      case 'Camera': return <Camera className={`h-5 w-5 ${iconInfo.colorClass}`} />;
      case 'Map': return <Map className={`h-5 w-5 ${iconInfo.colorClass}`} />;
      case 'Badge': return <FileQuestion className={`h-5 w-5 ${iconInfo.colorClass}`} />;
      default: return <FileQuestion className={`h-5 w-5 ${iconInfo.colorClass}`} />;
    }
  };
  
  // Use Intersection Observer to detect when video is visible
  useEffect(() => {
    if (!challenge?.previewMediaUrl || challenge?.previewMediaType !== 'video') return;
    
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

  if (isLoading) {
    return <ChallengeLoading />;
  }
  
  if (!challenge) {
    return <ChallengeNotFound />;
  }

  return (
    <div className="container py-6">
      <ChallengeHeader 
        challenge={challenge} 
        submissions={submissions}
        getChallengeTypeIcon={renderIcon}
      />
      
      {/* Preview Media - if available */}
      {(challenge.previewMediaUrl) && (
        <div 
          ref={videoContainerRef}
          className="relative aspect-video w-full max-w-4xl mx-auto mt-4 mb-6 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => setIsVideoModalOpen(true)}
        >
          {challenge.previewMediaType === 'video' ? (
            <video 
              ref={videoRef}
              src={challenge.previewMediaUrl} 
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
            />
          ) : (
            <img 
              src={challenge.previewMediaUrl}
              alt={challenge.title}
              className="w-full h-full object-cover"
            />
          )}
          
          {challenge.previewMediaType === 'video' && (
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
            verifiedSubmissions={verifiedSubmissions}
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
          submissions={submissions}
          handleJoinClick={handleJoinClick}
          requestCoachTip={requestCoachTip}
          shareChallenge={() => shareChallenge(challenge.id)}
          coachTip={coachTip}
          isLoadingTip={isLoadingTip}
          topUsers={topUsers}
        />
      </div>
      
      <DataPermissionPrompt 
        open={showDataPermissionPrompt} 
        onOpenChange={setShowDataPermissionPrompt}
        dataType="location"
        xpReward={100}
        campaignName={challenge.title}
        onConfirm={async () => handleConfirmPermission(false)}
      />
      
      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={challenge.title}
        videoUrl={challenge.previewMediaUrl || ''}
      />
    </div>
  );
};

export default ChallengeDetail;
