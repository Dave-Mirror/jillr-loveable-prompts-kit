
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import ActivityTab from './tabs/ActivityTab';
import RewardsTab from './tabs/RewardsTab';
import CommunityTab from './tabs/CommunityTab';
import StatsTab from './tabs/StatsTab';
import SocialTab from './tabs/SocialTab';
import DataVaultTab from './tabs/DataVaultTab';
import SettingsTab from './tabs/SettingsTab';
import AvatarTab from './tabs/AvatarTab';
import { User, Brain } from 'lucide-react';

interface ProfileTabsProps {
  userProfile: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ userProfile, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Special case for hypocampus tab
    if (value === 'hypocampus') {
      navigate('/hypocampus');
      return;
    }
    
    navigate(`/profile?tab=${value}`);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
      <TabsList className="overflow-x-auto flex-nowrap w-full bg-jillr-darkBlue/50 p-1">
        <TabsTrigger value="activity">Aktivitäten</TabsTrigger>
        <TabsTrigger value="rewards">Belohnungen</TabsTrigger>
        <TabsTrigger value="community">Community</TabsTrigger>
        <TabsTrigger value="statistics">Statistiken</TabsTrigger>
        <TabsTrigger value="social">Social</TabsTrigger>
        <TabsTrigger value="data">Datentresor</TabsTrigger>
        <TabsTrigger value="avatar">
          <User className="w-4 h-4 mr-1" />
          Avatar
        </TabsTrigger>
        <TabsTrigger value="hypocampus">
          <Brain className="w-4 h-4 mr-1" />
          Trigger
        </TabsTrigger>
        <TabsTrigger value="settings">Einstellungen</TabsTrigger>
      </TabsList>

      <div className="mt-6">
        <TabsContent value="activity">
          <ActivityTab userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="rewards">
          <RewardsTab userProfile={userProfile} />
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
        
        <TabsContent value="avatar">
          <AvatarTab userProfile={userProfile} />
        </TabsContent>
        
        <TabsContent value="settings">
          <SettingsTab userProfile={userProfile} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ProfileTabs;
