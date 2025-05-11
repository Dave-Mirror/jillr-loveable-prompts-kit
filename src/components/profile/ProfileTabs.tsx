
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ActivityTab from './tabs/ActivityTab';
import RewardsTab from './tabs/RewardsTab';
import CommunityTab from './tabs/CommunityTab';
import StatsTab from './tabs/StatsTab';
import SocialTab from './tabs/SocialTab';
import DataVaultTab from './tabs/DataVaultTab';
import SettingsTab from './tabs/SettingsTab';
import HypocampusTab from './tabs/HypocampusTab';
import { useNavigate, useLocation } from 'react-router-dom';
import FilterDropdown, { FilterOption } from '@/components/ui/filter-dropdown';
import { Activity, Award, Users, BarChart3, Monitor, Database, Settings, Zap } from 'lucide-react';

interface ProfileTabsProps {
  userProfile: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole?: string;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ userProfile, activeTab, setActiveTab, userRole = 'user' }) => {
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

  // Get tab options based on user role
  const getTabOptions = (): FilterOption[] => {
    const baseOptions: FilterOption[] = [
      { value: 'activity', label: 'Aktivität' },
      { value: 'rewards', label: 'Belohnungen' }
    ];
    
    // Add role-specific tabs
    if (userRole === 'user') {
      baseOptions.push({ value: 'hypocampus', label: 'Automatisierung' });
    } else if (userRole === 'creator') {
      baseOptions.push(
        { value: 'community', label: 'Community' },
        { value: 'statistics', label: 'Statistiken' },
        { value: 'social', label: 'Social Media' }
      );
    } else if (userRole === 'brand' || userRole === 'enterprise') {
      baseOptions.push(
        { value: 'statistics', label: 'Statistiken' },
        { value: 'hypocampus', label: 'Automatisierung' }
      );
    }
    
    // Common tabs for all roles
    baseOptions.push(
      { value: 'data', label: 'Meine Daten' },
      { value: 'settings', label: 'Einstellungen' }
    );
    
    return baseOptions;
  };

  const tabOptions = getTabOptions();

  // Get icon for the current tab
  const getIcon = () => {
    switch(activeTab) {
      case "activity": return <Activity className="h-5 w-5 text-jillr-neonBlue mr-2" />;
      case "rewards": return <Award className="h-5 w-5 text-jillr-neonPurple mr-2" />;
      case "hypocampus": return <Zap className="h-5 w-5 text-jillr-neonGreen mr-2" />;
      case "community": return <Users className="h-5 w-5 text-jillr-neonBlue mr-2" />;
      case "statistics": return <BarChart3 className="h-5 w-5 text-jillr-neonPurple mr-2" />;
      case "social": return <Monitor className="h-5 w-5 text-jillr-neonGreen mr-2" />;
      case "data": return <Database className="h-5 w-5 text-jillr-neonBlue mr-2" />;
      case "settings": return <Settings className="h-5 w-5 text-jillr-neonPurple mr-2" />;
      default: return <Activity className="h-5 w-5 text-jillr-neonBlue mr-2" />;
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          {getIcon()}
          <h3 className="font-medium">
            {activeTab === "activity" && "Aktivität"}
            {activeTab === "rewards" && "Belohnungen"}
            {activeTab === "hypocampus" && "Automatisierung"}
            {activeTab === "community" && "Community"}
            {activeTab === "statistics" && "Statistiken"}
            {activeTab === "social" && "Social Media"}
            {activeTab === "data" && "Meine Daten"}
            {activeTab === "settings" && "Einstellungen"}
          </h3>
        </div>
        <FilterDropdown
          options={tabOptions}
          activeValue={activeTab}
          onSelect={handleTabChange}
          label="Ansicht"
          buttonVariant="default"
        />
      </div>
      
      <div className="w-full px-1">
        <TabsContent value="activity">
          <ActivityTab userProfile={userProfile} userRole={userRole} />
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
          <StatsTab userProfile={userProfile} userRole={userRole} />
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
