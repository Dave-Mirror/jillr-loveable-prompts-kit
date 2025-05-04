
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check, Eye, Save } from 'lucide-react';
import { useForm, FormProvider } from 'react-hook-form';
import ChallengeBasics from '@/components/challenge-editor/ChallengeBasics';
import ContentRequirements from '@/components/challenge-editor/ContentRequirements';
import KpiSettings from '@/components/challenge-editor/KpiSettings';
import TargetAudience from '@/components/challenge-editor/TargetAudience';
import RewardsIncentives from '@/components/challenge-editor/RewardsIncentives';
import TimingLimitations from '@/components/challenge-editor/TimingLimitations';
import AdvancedSettings from '@/components/challenge-editor/AdvancedSettings';
import PreviewPublish from '@/components/challenge-editor/PreviewPublish';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

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

  // Create a form instance for FormProvider
  const methods = useForm();

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

  // Map of tabs with their display names and indices
  const tabsConfig = [
    { id: 'basics', name: '1. Basics' },
    { id: 'content', name: '2. Content' },
    { id: 'kpis', name: '3. KPIs' },
    { id: 'audience', name: '4. Audience' },
    { id: 'rewards', name: '5. Rewards' },
    { id: 'timing', name: '6. Timing' },
    { id: 'advanced', name: '7. Advanced' },
    { id: 'preview', name: '8. Preview' }
  ];

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
          <FormProvider {...methods}>
            {/* Desktop dropdown selector */}
            <div className="hidden md:flex items-center mb-6 gap-2">
              <span className="font-medium">Step:</span>
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-[200px] bg-jillr-darkBlue/10 border-jillr-neonPurple/20">
                  <SelectValue placeholder="Select step" />
                </SelectTrigger>
                <SelectContent className="bg-jillr-darkBlue border-jillr-neonPurple/20 text-white">
                  {tabsConfig.map(tab => (
                    <SelectItem key={tab.id} value={tab.id}>
                      {tab.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Mobile horizontal scrollable tabs */}
            <div className="md:hidden mb-6">
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex space-x-1 p-1">
                  {tabsConfig.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-jillr-neonPurple text-white'
                          : 'bg-jillr-darkBlue/60 text-white/80 hover:bg-jillr-darkBlue/80'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            <div className="mt-6">
              {activeTab === 'basics' && (
                <ChallengeBasics 
                  data={challengeData} 
                  onChange={(data) => handleDataChange('basics', data)} 
                />
              )}
              
              {activeTab === 'content' && (
                <ContentRequirements 
                  data={challengeData} 
                  onChange={(data) => handleDataChange('content', data)} 
                />
              )}
              
              {activeTab === 'kpis' && (
                <KpiSettings 
                  data={challengeData} 
                  onChange={(data) => handleDataChange('kpis', data)} 
                />
              )}
              
              {activeTab === 'audience' && (
                <TargetAudience 
                  data={challengeData} 
                  onChange={(data) => handleDataChange('audience', data)} 
                />
              )}
              
              {activeTab === 'rewards' && (
                <RewardsIncentives 
                  data={challengeData} 
                  onChange={(data) => handleDataChange('rewards', data)} 
                />
              )}
              
              {activeTab === 'timing' && (
                <TimingLimitations 
                  data={challengeData} 
                  onChange={(data) => handleDataChange('timing', data)} 
                />
              )}
              
              {activeTab === 'advanced' && (
                <AdvancedSettings 
                  data={challengeData} 
                  onChange={(data) => handleDataChange('advanced', data)} 
                />
              )}
              
              {activeTab === 'preview' && (
                <PreviewPublish 
                  data={challengeData} 
                  onChange={(data) => handleDataChange('preview', data)} 
                />
              )}
            </div>
            
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
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChallengeEditor;
