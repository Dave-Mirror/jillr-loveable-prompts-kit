
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Award, Users, BarChart3, Monitor, Settings, Shield } from 'lucide-react';

interface ProfileTabsHeaderProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const ProfileTabsHeader: React.FC<ProfileTabsHeaderProps> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  const tabs = [
    { value: 'activity', icon: <Activity className="h-4 w-4 mr-2" />, label: 'Aktivität' },
    { value: 'rewards', icon: <Award className="h-4 w-4 mr-2" />, label: 'Belohnungen' },
    { value: 'community', icon: <Users className="h-4 w-4 mr-2" />, label: 'Community' },
    { value: 'statistics', icon: <BarChart3 className="h-4 w-4 mr-2" />, label: 'Statistiken' },
    { value: 'social', icon: <Monitor className="h-4 w-4 mr-2" />, label: 'Social Media' },
    { value: 'data', icon: <Shield className="h-4 w-4 mr-2" />, label: 'Meine Daten' },
    { value: 'settings', icon: <Settings className="h-4 w-4 mr-2" />, label: 'Einstellungen' }
  ];
  
  return (
    <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
      {tabs.map(tab => (
        <TabsTrigger 
          key={tab.value} 
          value={tab.value} 
          onClick={() => setActiveTab(tab.value)}
          className={`flex items-center ${activeTab === tab.value ? 'bg-jillr-neonPurple/20 text-jillr-neonPurple' : ''}`}
        >
          {tab.icon}
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default ProfileTabsHeader;
