
import React from 'react';
import { useParams } from 'react-router-dom';
import { ChallengeHeader } from '@/components/challenge/ChallengeHeader';
import { ChallengeDetailContent } from '@/components/challenge/ChallengeDetailContent';
import { ChallengeSidebar } from '@/components/challenge/ChallengeSidebar';
import { ChallengeLoading } from '@/components/challenge/ChallengeLoading';
import { ChallengeNotFound } from '@/components/challenge/ChallengeNotFound';
import DataPermissionPrompt from '@/components/challenge/DataPermissionPrompt';
import useChallengeDetailPage from '@/hooks/useChallengeDetailPage';
import { Camera, Map, FileQuestion } from 'lucide-react';

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
  
  const renderIcon = (type: string | null | undefined) => {
    const iconInfo = getChallengeTypeIcon(type);
    switch (iconInfo.name) {
      case 'Camera': return <Camera className={`h-5 w-5 ${iconInfo.colorClass}`} />;
      case 'Map': return <Map className={`h-5 w-5 ${iconInfo.colorClass}`} />;
      case 'Badge': return <FileQuestion className={`h-5 w-5 ${iconInfo.colorClass}`} />;
      default: return <FileQuestion className={`h-5 w-5 ${iconInfo.colorClass}`} />;
    }
  };

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
    </div>
  );
};

export default ChallengeDetail;
