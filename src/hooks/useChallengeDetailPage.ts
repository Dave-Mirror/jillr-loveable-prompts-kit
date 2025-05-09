
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { useDataPermissionPrompt } from '@/hooks/useDataPermissionPrompt';
import { Challenge, Submission, ChallengeType } from '@/components/challenge/types';
import { formatSubmissions } from '@/utils/challenge/formatting';
import { getCoachTip } from '@/utils/challenge/coachTips';
import { shareChallenge } from '@/utils/challenge';
import useChallengeData from '@/hooks/useChallengeData';

const useChallengeDetailPage = (challengeId: string | undefined) => {
  const { challenge, isLoading } = useChallengeData(challengeId);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [verifiedSubmissions, setVerifiedSubmissions] = useState<Submission[]>([]);
  const [coachTip, setCoachTip] = useState<string>('');
  const [isLoadingTip, setIsLoadingTip] = useState<boolean>(false);
  const { isDialogOpen, setIsDialogOpen, handleConfirmPermission, xpReward } = useDataPermissionPrompt(challengeId || '', challenge?.title || '');
  const [showDataPermissionPrompt, setShowDataPermissionPrompt] = useState(false);
  const [topUsers, setTopUsers] = useState([
    { id: '1', user_id: '123', username: 'TikTokPro', views: 5600, likes: 890 },
    { id: '2', user_id: '456', username: 'DanceQueen', views: 3200, likes: 654 },
    { id: '3', user_id: '789', username: 'CreatorX', views: 2800, likes: 420 },
  ]);

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
            challenge_id: challengeId,
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
    
    if (challengeId) {
      loadSubmissions();
    }
  }, [challengeId]);

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
        return { name: 'Camera', colorClass: 'text-jillr-neonPurple' };
      case 'geofencing':
        return { name: 'Map', colorClass: 'text-jillr-neonGreen' };
      case 'ar':
        return { name: 'Badge', colorClass: 'text-jillr-neonBlue' };
      default:
        return { name: 'FileQuestion', colorClass: 'text-jillr-neonPink' };
    }
  };

  return {
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
  };
};

export default useChallengeDetailPage;
