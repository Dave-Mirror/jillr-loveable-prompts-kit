import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { ChallengeHeader } from '@/components/challenge/ChallengeHeader';
import { ChallengeDetails } from '@/components/challenge/ChallengeDetails';
import { LeaderboardCard } from '@/components/challenge/LeaderboardCard';
import { RewardsCard } from '@/components/challenge/RewardsCard';
import { CommunitySubmissions } from '@/components/challenge/CommunitySubmissions';
import { UserProgressCard } from '@/components/challenge/UserProgressCard';
import LiveMapPromotion from '@/components/challenge/LiveMapPromotion';
import DataPermissionPrompt from '@/components/challenge/DataPermissionPrompt';
import { SecurityInfo } from '@/components/challenge/SecurityInfo';
import { ChallengeActions } from '@/components/challenge/ChallengeActions';
import CoachTipSection from '@/components/challenge/CoachTipSection';
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
  
  if (isLoading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-64 w-full mb-6 rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-20 w-2/3" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-60 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!challenge) {
    return (
      <div className="container py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Challenge nicht gefunden</h2>
        <p className="text-muted-foreground mb-8">Die gesuchte Challenge konnte nicht gefunden werden.</p>
        <Button variant="default" asChild>
          <a href="/explore">Zurück zur Übersicht</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <ChallengeHeader 
        challenge={challenge} 
        submissions={submissions}
        getChallengeTypeIcon={getChallengeTypeIcon}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <ChallengeDetails challenge={challenge} />
          
          <CommunitySubmissions 
            verifiedSubmissions={verifiedSubmissions}
            inviteFriends={inviteFriends}
          />
          
          <CoachTipSection
            coachTip={coachTip}
            isLoadingTip={isLoadingTip}
            requestCoachTip={requestCoachTip}
          />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <ChallengeActions
                handleJoinClick={handleJoinClick}
                requestCoachTip={requestCoachTip}
                shareChallenge={() => shareChallenge(challenge.id)}
                coachTip={coachTip}
                isLoadingTip={isLoadingTip}
                challenge={challenge}
              />
            </CardContent>
          </Card>
          
          <RewardsCard 
            challengeRewards={[
              { 
                type: 'xp', 
                value: challenge.xp_reward || 100, 
                icon: '⭐',
                immediate: true,
                description: `${challenge.xp_reward || 100} XP für deinen Account` 
              },
              { 
                type: 'coins', 
                value: challenge.coin_reward || 50, 
                icon: '🪙',
                immediate: false,
                description: `${challenge.coin_reward || 50} Coins für deinen Wallet`,
                level: 500
              },
            ]} 
          />
          
          <LeaderboardCard 
            topUsers={[
              { id: '1', user_id: '123', username: 'TikTokPro', views: 5600, likes: 890 },
              { id: '2', user_id: '456', username: 'DanceQueen', views: 3200, likes: 654 },
              { id: '3', user_id: '789', username: 'CreatorX', views: 2800, likes: 420 },
            ]}
          />
          
          <UserProgressCard 
            user={{ id: '123', name: 'User', submissions: 0 }}
            challenge={challenge}
            submissions={submissions.filter(s => s.user_id === '123')}
          />
          
          <LiveMapPromotion />
          
          <SecurityInfo />
        </div>
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
