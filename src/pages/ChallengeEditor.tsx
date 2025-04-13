
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check, Eye, Save } from 'lucide-react';
import ChallengeBasics from '@/components/challenge-editor/ChallengeBasics';
import ContentRequirements from '@/components/challenge-editor/ContentRequirements';
import KpiSettings from '@/components/challenge-editor/KpiSettings';
import TargetAudience from '@/components/challenge-editor/TargetAudience';
import RewardsIncentives from '@/components/challenge-editor/RewardsIncentives';
import TimingLimitations from '@/components/challenge-editor/TimingLimitations';
import AdvancedSettings from '@/components/challenge-editor/AdvancedSettings';
import PreviewPublish from '@/components/challenge-editor/PreviewPublish';

const ChallengeEditor = () => {
  const [activeTab, setActiveTab] = useState('basics');
  const [challengeData, setChallengeData] = useState({
    // Challenge basics
    type: [],
    title: '',
    description: '',
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

  const handleDataChange = (section, data) => {
    setChallengeData(prev => ({
      ...prev,
      ...data
    }));
  };

  const navigateTab = (direction) => {
    const tabs = ['basics', 'content', 'kpis', 'audience', 'rewards', 'timing', 'advanced', 'preview'];
    const currentIndex = tabs.indexOf(activeTab);
    const newIndex = direction === 'next' 
      ? Math.min(currentIndex + 1, tabs.length - 1) 
      : Math.max(currentIndex - 1, 0);
    setActiveTab(tabs[newIndex]);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', challengeData);
    // Here you would typically save to localStorage or your database
  };

  return (
    <div className="container py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Challenge Editor</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Your Challenge</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-8 mb-8">
              <TabsTrigger value="basics">1. Basics</TabsTrigger>
              <TabsTrigger value="content">2. Content</TabsTrigger>
              <TabsTrigger value="kpis">3. KPIs</TabsTrigger>
              <TabsTrigger value="audience">4. Audience</TabsTrigger>
              <TabsTrigger value="rewards">5. Rewards</TabsTrigger>
              <TabsTrigger value="timing">6. Timing</TabsTrigger>
              <TabsTrigger value="advanced">7. Advanced</TabsTrigger>
              <TabsTrigger value="preview">8. Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basics">
              <ChallengeBasics 
                data={challengeData} 
                onChange={(data) => handleDataChange('basics', data)} 
              />
            </TabsContent>
            
            <TabsContent value="content">
              <ContentRequirements 
                data={challengeData} 
                onChange={(data) => handleDataChange('content', data)} 
              />
            </TabsContent>
            
            <TabsContent value="kpis">
              <KpiSettings 
                data={challengeData} 
                onChange={(data) => handleDataChange('kpis', data)} 
              />
            </TabsContent>
            
            <TabsContent value="audience">
              <TargetAudience 
                data={challengeData} 
                onChange={(data) => handleDataChange('audience', data)} 
              />
            </TabsContent>
            
            <TabsContent value="rewards">
              <RewardsIncentives 
                data={challengeData} 
                onChange={(data) => handleDataChange('rewards', data)} 
              />
            </TabsContent>
            
            <TabsContent value="timing">
              <TimingLimitations 
                data={challengeData} 
                onChange={(data) => handleDataChange('timing', data)} 
              />
            </TabsContent>
            
            <TabsContent value="advanced">
              <AdvancedSettings 
                data={challengeData} 
                onChange={(data) => handleDataChange('advanced', data)} 
              />
            </TabsContent>
            
            <TabsContent value="preview">
              <PreviewPublish 
                data={challengeData} 
                onChange={(data) => handleDataChange('preview', data)} 
              />
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={() => navigateTab('prev')}
              disabled={activeTab === 'basics'}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Step
            </Button>
            
            {activeTab === 'preview' ? (
              <Button 
                className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80"
                onClick={() => console.log('Publishing challenge:', challengeData)}
              >
                <Check className="mr-2 h-4 w-4" />
                Publish Challenge
              </Button>
            ) : (
              <Button 
                variant="default" 
                onClick={() => navigateTab('next')}
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChallengeEditor;
