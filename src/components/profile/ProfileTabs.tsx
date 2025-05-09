
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ActivityTab from './tabs/ActivityTab';
import RewardsTab from './tabs/RewardsTab';
import CommunityTab from './tabs/CommunityTab';
import StatsTab from './tabs/StatsTab';
import SocialTab from './tabs/SocialTab';
import SettingsTab from './tabs/SettingsTab';
import DataVaultTab from './tabs/DataVaultTab';
import ProfileTabsHeader from './ProfileTabsHeader';

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
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
      <ProfileTabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
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
      
      <TabsContent value="data" className="mt-6">
        <DataVaultTab userProfile={userProfile} />
      </TabsContent>
      
      <TabsContent value="settings" className="mt-6">
        <SettingsTab userProfile={userProfile} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
