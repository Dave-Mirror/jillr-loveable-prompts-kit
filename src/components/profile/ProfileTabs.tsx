
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import ActivityTab from './tabs/ActivityTab';
import ChallengesTab from './tabs/ChallengesTab';
import RewardsTab from './tabs/RewardsTab';
import CommunityTab from './tabs/CommunityTab';
import StatsTab from './tabs/StatsTab';
import SettingsTab from './tabs/SettingsTab';
import ProfileTabsHeader from './ProfileTabsHeader';
import MobileProfileNavigation from './MobileProfileNavigation';

interface ProfileTabsProps {
  userProfile: any;
  activeTab: string;
  setActiveTab: (value: string) => void;
  isOwnProfile: boolean;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ 
  userProfile, 
  activeTab, 
  setActiveTab,
  isOwnProfile
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
      <MobileProfileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="hidden md:block">
        <ProfileTabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      <TabsContent value="activity" className="mt-6">
        <ActivityTab userProfile={userProfile} />
      </TabsContent>
      
      <TabsContent value="challenges" className="mt-6">
        <ChallengesTab userProfile={userProfile} isOwnProfile={isOwnProfile} />
      </TabsContent>
      
      <TabsContent value="rewards" className="mt-6">
        <RewardsTab userProfile={userProfile} isOwnProfile={isOwnProfile} />
      </TabsContent>
      
      <TabsContent value="community" className="mt-6">
        <CommunityTab userProfile={userProfile} />
      </TabsContent>
      
      <TabsContent value="statistics" className="mt-6">
        <StatsTab userProfile={userProfile} />
      </TabsContent>
      
      {isOwnProfile && (
        <TabsContent value="settings" className="mt-6">
          <SettingsTab userProfile={userProfile} />
        </TabsContent>
      )}
    </Tabs>
  );
};

export default ProfileTabs;
