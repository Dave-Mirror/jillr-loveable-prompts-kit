
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { ChallengeHeader } from '@/components/challenge/ChallengeHeader';
import { ChallengeDetailContent } from '@/components/challenge/ChallengeDetailContent';
import { ChallengeSidebar } from '@/components/challenge/ChallengeSidebar';
import { ChallengeLoading } from '@/components/challenge/ChallengeLoading';
import { ChallengeNotFound } from '@/components/challenge/ChallengeNotFound';
import DataPermissionPrompt from '@/components/challenge/DataPermissionPrompt';
import useChallengeData from '@/hooks/useChallengeData';
import { useDataPermissionPrompt } from '@/hooks/useDataPermissionPrompt';
import { Camera, Map, FileQuestion } from 'lucide-react';
import { formatSubmissions } from '@/utils/challenge/formatting';
import { getCoachTip } from '@/utils/challenge/coachTips';
import { ChallengeType, Submission } from '@/components/challenge/types';
import { shareChallenge } from '@/utils/challenge';

const ChallengeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { challenge, isLoading } = useChallengeData(id);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [verifiedSubmissions, setVerifiedSubmissions] = useState<Submission[]>([]);
  const [coachTip, setCoachTip] = useState<string>('');
  const [isLoadingTip, setIsLoadingTip] = useState<boolean>(false);
  const { isDialogOpen, setIsDialogOpen, handleConfirmPermission, xpReward } = useDataPermissionPrompt(id || '', challenge?.title || '');
  const [showDataPermissionPrompt, setShowDataPermissionPrompt] = useState(false);
  
  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        // This would normally be an API call
        const mockSubmissions = [
          {
            id: '1',
            user_id: '123',
            username: 'creator123',
            profile_image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=123',
            video_url: 'https://example.com/video1.mp4',
            views: 1200,
            likes: 234,
            status: 'verified',
            challenge_id: id,
            submitted_at: '2023-09-01T12:00:00Z'
          },
          // More mock submissions...
        ];
        
        const formatted = formatSubmissions(mockSubmissions);
        setSubmissions(formatted);
        setVerifiedSubmissions(formatted.filter(sub => sub.verified));
      } catch (error) {
        console.error('Failed to load submissions:', error);
      }
    };
    
    if (id) {
      loadSubmissions();
    }
  }, [id]);
  
  const requestCoachTip = () => {
    setIsLoadingTip(true);
    
    // Simulate API request delay
    setTimeout(() => {
      const tip = getCoachTip(challenge?.type as ChallengeType || 'Video');
      setCoachTip(tip);
      setIsLoadingTip(false);
    }, 1500);
  };
  
  const handleJoinClick = () => {
    setShowDataPermissionPrompt(true);
  };
  
  const inviteFriends = () => {
    toast({
      title: "Friends invited!",
      description: "Invite sent to your friends."
    });
  };
  
  const getChallengeTypeIcon = (type: string | null | undefined) => {
    switch (type?.toLowerCase()) {
      case 'video':
        return <Camera className="h-5 w-5 text-jillr-neonPurple" />;
      case 'geofencing':
        return <Map className="h-5 w-5 text-jillr-neonGreen" />;
      case 'ar':
        return <Badge className="h-5 w-5 text-jillr-neonBlue" />;
      default:
        return <FileQuestion className="h-5 w-5 text-jillr-neonPink" />;
    }
  };

  const topUsers = [
    { id: '1', user_id: '123', username: 'TikTokPro', views: 5600, likes: 890 },
    { id: '2', user_id: '456', username: 'DanceQueen', views: 3200, likes: 654 },
    { id: '3', user_id: '789', username: 'CreatorX', views: 2800, likes: 420 },
  ];
  
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
        getChallengeTypeIcon={getChallengeTypeIcon}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <ChallengeDetailContent 
          challenge={challenge}
          verifiedSubmissions={verifiedSubmissions}
          coachTip={coachTip}
          isLoadingTip={isLoadingTip}
          requestCoachTip={requestCoachTip}
          inviteFriends={inviteFriends}
        />
        
        <ChallengeSidebar 
          challenge={challenge}
          submissions={submissions}
          handleJoinClick={handleJoinClick}
          requestCoachTip={requestCoachTip}
          shareChallenge={shareChallenge}
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
    </div>
  );
};

export default ChallengeDetail;
