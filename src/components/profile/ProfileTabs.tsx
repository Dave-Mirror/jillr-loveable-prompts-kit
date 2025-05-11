
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActivityTab from './tabs/ActivityTab';
import RewardsTab from './tabs/RewardsTab';
import CommunityTab from './tabs/CommunityTab';
import StatsTab from './tabs/StatsTab';
import SocialTab from './tabs/SocialTab';
import DataVaultTab from './tabs/DataVaultTab';
import SettingsTab from './tabs/SettingsTab';
import HypocampusTab from './tabs/HypocampusTab';
import { useNavigate, useLocation } from 'react-router-dom';

interface ProfileTabsProps {
  userProfile: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ userProfile, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle tab changes and update URL
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Update URL with the tab parameter
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('tab', value);
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-8">
        <TabsTrigger value="activity">Aktivität</TabsTrigger>
        <TabsTrigger value="rewards">Belohnungen</TabsTrigger>
        <TabsTrigger value="hypocampus">Automatisierung</TabsTrigger>
        <TabsTrigger value="community">Community</TabsTrigger>
        <TabsTrigger value="statistics">Statistiken</TabsTrigger>
        <TabsTrigger value="social">Social</TabsTrigger>
        <TabsTrigger value="data">Meine Daten</TabsTrigger>
        <TabsTrigger value="settings">Einstellungen</TabsTrigger>
      </TabsList>
      
      <div className="w-full px-1">
        <TabsContent value="activity">
          <ActivityTab userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="rewards">
          <RewardsTab userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="hypocampus">
          <HypocampusTab userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="community">
          <CommunityTab userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="statistics">
          <StatsTab userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="social">
          <SocialTab userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="data">
          <DataVaultTab userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="settings">
          <SettingsTab userProfile={userProfile} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ProfileTabs;
