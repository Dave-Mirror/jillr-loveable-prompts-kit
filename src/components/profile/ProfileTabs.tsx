
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActivityTab from './tabs/ActivityTab';
import RewardsTab from './tabs/RewardsTab';
import CommunityTab from './tabs/CommunityTab';
import StatsTab from './tabs/StatsTab';
import SocialTab from './tabs/SocialTab';
import SettingsTab from './tabs/SettingsTab';

interface ProfileTabsProps {
  userProfile: any;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ 
  userProfile, 
  activeTab, 
  setActiveTab 
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
      <TabsList className="grid grid-cols-6 w-full">
        <TabsTrigger value="activity">Challenge Activity</TabsTrigger>
        <TabsTrigger value="rewards">Rewards & XP</TabsTrigger>
        <TabsTrigger value="community">Community</TabsTrigger>
        <TabsTrigger value="statistics">Statistics</TabsTrigger>
        <TabsTrigger value="social">Social Media</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="activity" className="mt-6">
        <ActivityTab userProfile={userProfile} />
      </TabsContent>
      
      <TabsContent value="rewards" className="mt-6">
        <RewardsTab userProfile={userProfile} />
      </TabsContent>
      
      <TabsContent value="community" className="mt-6">
        <CommunityTab userProfile={userProfile} />
      </TabsContent>
      
      <TabsContent value="statistics" className="mt-6">
        <StatsTab userProfile={userProfile} />
      </TabsContent>
      
      <TabsContent value="social" className="mt-6">
        <SocialTab userProfile={userProfile} />
      </TabsContent>
      
      <TabsContent value="settings" className="mt-6">
        <SettingsTab userProfile={userProfile} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
