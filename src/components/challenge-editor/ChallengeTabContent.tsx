
import React from 'react';
import ChallengeBasics from '@/components/challenge-editor/ChallengeBasics';
import ContentRequirements from '@/components/challenge-editor/ContentRequirements';
import KpiSettings from '@/components/challenge-editor/KpiSettings';
import TargetAudience from '@/components/challenge-editor/TargetAudience';
import RewardsIncentives from '@/components/challenge-editor/RewardsIncentives';
import TimingLimitations from '@/components/challenge-editor/TimingLimitations';
import AdvancedSettings from '@/components/challenge-editor/AdvancedSettings';
import PreviewPublish from '@/components/challenge-editor/PreviewPublish';

interface ChallengeTabContentProps {
  activeTab: string;
  data: any;
  onChange: (section: string, data: any) => void;
}

const ChallengeTabContent: React.FC<ChallengeTabContentProps> = ({
  activeTab,
  data,
  onChange
}) => {
  return (
    <>
      {activeTab === 'basics' && (
        <ChallengeBasics 
          data={data} 
          onChange={(data) => onChange('basics', data)} 
        />
      )}
      
      {activeTab === 'content' && (
        <ContentRequirements 
          data={data} 
          onChange={(data) => onChange('content', data)} 
        />
      )}
      
      {activeTab === 'kpis' && (
        <KpiSettings 
          data={data} 
          onChange={(data) => onChange('kpis', data)} 
        />
      )}
      
      {activeTab === 'audience' && (
        <TargetAudience 
          data={data} 
          onChange={(data) => onChange('audience', data)} 
        />
      )}
      
      {activeTab === 'rewards' && (
        <RewardsIncentives 
          data={data} 
          onChange={(data) => onChange('rewards', data)} 
        />
      )}
      
      {activeTab === 'timing' && (
        <TimingLimitations 
          data={data} 
          onChange={(data) => onChange('timing', data)} 
        />
      )}
      
      {activeTab === 'advanced' && (
        <AdvancedSettings 
          data={data} 
          onChange={(data) => onChange('advanced', data)} 
        />
      )}
      
      {activeTab === 'preview' && (
        <PreviewPublish 
          data={data} 
          onChange={(data) => onChange('preview', data)} 
        />
      )}
    </>
  );
};

export default ChallengeTabContent;
