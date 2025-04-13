
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ChallengeHeader } from '@/components/challenge/ChallengeHeader';
import { ChallengeDetails } from '@/components/challenge/ChallengeDetails';
import { LeaderboardCard } from '@/components/challenge/LeaderboardCard';
import { ChallengeActions } from '@/components/challenge/ChallengeActions';
import { CommunitySubmissions } from '@/components/challenge/CommunitySubmissions';
import { RewardsCard } from '@/components/challenge/RewardsCard';
import { UserProgressCard } from '@/components/challenge/UserProgressCard';
import { SecurityInfo } from '@/components/challenge/SecurityInfo';
import { Challenge, Submission } from '@/components/challenge/types';
import { challengeTypeImages, coachTips, rewardsData } from '@/utils/challengeData';
import { 
  shareChallenge, 
  inviteFriends, 
  joinChallenge, 
  generateCoachTip, 
  getChallengeTypeIcon, 
  getChallengeRewards,
  fetchChallengeDetails
} from '@/utils/challengeUtils';

const ChallengeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
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
    if (id) {
      fetchChallengeDetails(
        id, 
        setChallenge, 
        setSubmissions, 
        setTopUsers, 
        setVerifiedSubmissions, 
        challengeTypeImages,
        setIsLoading
      );
    }
  }, [id, toast]);

  const handleJoinClick = () => {
    if (!id) return;
    joinChallenge(id, user, navigate);
  };
  
  const handleShareChallenge = () => {
    if (challenge) {
      shareChallenge(challenge);
    }
  };
  
  const handleInviteFriends = () => {
    if (challenge) {
      inviteFriends(challenge);
    }
  };
  
  const requestCoachTip = async () => {
    if (!challenge) return;
    
    setIsLoadingTip(true);
    try {
      const tip = await generateCoachTip(challenge, user, coachTips);
      setCoachTip(tip);
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

  // Get challenge-specific rewards
  const challengeRewards = getChallengeRewards(challenge, rewardsData);

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
            shareChallenge={handleShareChallenge}
            coachTip={coachTip}
            isLoadingTip={isLoadingTip}
            challenge={challenge}
          />
          
          {/* 6. Community & Social Sharing */}
          {verifiedSubmissions.length > 0 && (
            <CommunitySubmissions 
              verifiedSubmissions={verifiedSubmissions} 
              inviteFriends={handleInviteFriends} 
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
