
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useForm, FormProvider } from 'react-hook-form';
import { useChallengeTabs, ChallengeTab } from '@/hooks/challenge-editor/useChallengeTabs';
import ChallengeHeader from '@/components/challenge-editor/ChallengeHeader';
import ChallengeTabContent from '@/components/challenge-editor/ChallengeTabContent';
import ChallengeTabNavigation from '@/components/challenge-editor/ChallengeTabNavigation';
import ChallengeNavButtons from '@/components/challenge-editor/ChallengeNavButtons';

const ChallengeEditor = () => {
  const { activeTab, tabsConfig, navigateTab, setActiveTab } = useChallengeTabs();
  const [challengeData, setChallengeData] = useState({
    // Challenge basics
    type: [],
    title: '',
    description: '',
    // Preview media
    previewMediaType: 'image',
    previewMediaUrl: '',
    // Content requirements
    contentFormats: [],
    platforms: [],
    hashtags: [],
    brandingIntegration: false,
    musicSelection: '',
    // KPIs
    kpis: [],
    minViews: 0,
    minLikes: 0,
    minComments: 0,
    minConversions: 0,
    // Target audience
    ageRange: [18, 65],
    gender: [],
    location: '',
    language: '',
    levelRestriction: 'open',
    // Rewards
    rewardTypes: [],
    instantReward: false,
    kpiBasedReward: false,
    limitedRewards: false,
    rewardExpiration: false,
    // Timing
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    maxParticipants: 0,
    // Automation
    triggers: [],
    // Advanced settings
    formatRequirements: '',
    contentGuidelines: '',
    licenseRights: false,
    // Preview & publish
    livePreview: false,
    abTesting: false,
    socialSharing: false,
    pushNotification: false
  });

  // Create a form instance for FormProvider
  const methods = useForm();

  const handleDataChange = (section, data) => {
    setChallengeData(prev => ({
      ...prev,
      ...data
    }));
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', challengeData);
    // Here you would typically save to localStorage or your database
  };

  // Create a wrapped setActiveTab function that handles string conversion to ChallengeTab
  const handleTabChange = (tab: string) => {
    setActiveTab(tab as ChallengeTab);
  };

  return (
    <div className="container py-8 max-w-5xl">
      <ChallengeHeader onSaveDraft={handleSaveDraft} />

      <Card>
        <CardHeader>
          <CardTitle>Create Your Challenge</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <ChallengeTabNavigation 
              activeTab={activeTab}
              setActiveTab={handleTabChange}
              tabsConfig={tabsConfig}
            />
            
            <div className="mt-6">
              <ChallengeTabContent 
                activeTab={activeTab}
                data={challengeData}
                onChange={handleDataChange}
              />
            </div>
            
            <ChallengeNavButtons 
              activeTab={activeTab}
              navigateTab={navigateTab}
              challengeData={challengeData}
            />
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChallengeEditor;
