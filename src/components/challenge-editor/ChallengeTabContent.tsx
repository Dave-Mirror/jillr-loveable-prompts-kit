
import React from 'react';
import ChallengeBasics from './ChallengeBasics';
import LocationSection from './LocationSection';
import ContentRequirements from './ContentRequirements';
import KpiSettings from './KpiSettings';
import TargetAudience from './TargetAudience';
import RewardsIncentives from './RewardsIncentives';
import TimingLimitations from './TimingLimitations';
import AdvancedSettings from './AdvancedSettings';
import AutomationTab from './AutomationTab';
import PreviewPublish from './PreviewPublish';

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
  // Helper function to handle data changes for specific sections
  const handleSectionChange = (sectionData: any) => {
    onChange(activeTab, sectionData);
  };

  switch (activeTab) {
    case 'basics':
      return <ChallengeBasics data={data} onChange={handleSectionChange} />;
    case 'location':
      return <LocationSection data={data} onChange={handleSectionChange} />;
    case 'content':
      return <ContentRequirements data={data} onChange={handleSectionChange} />;
    case 'kpis':
      return <KpiSettings data={data} onChange={handleSectionChange} />;
    case 'audience':
      return <TargetAudience data={data} onChange={handleSectionChange} />;
    case 'rewards':
      return <RewardsIncentives data={data} onChange={handleSectionChange} />;
    case 'timing':
      return <TimingLimitations data={data} onChange={handleSectionChange} />;
    case 'automation':
      return <AutomationTab data={data} onChange={handleSectionChange} />;
    case 'advanced':
      return <AdvancedSettings data={data} onChange={handleSectionChange} />;
    case 'preview':
      return <PreviewPublish data={data} onChange={handleSectionChange} />;
    default:
      return <div>Tab nicht gefunden: {activeTab}</div>;
  }
};

export default ChallengeTabContent;
