
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, Award, Users, BarChart3, Monitor, 
  Settings, Shield, Database, Lock 
} from 'lucide-react';

interface ProfileTabsHeaderProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const ProfileTabsHeader: React.FC<ProfileTabsHeaderProps> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  const tabs = [
    { value: 'activity', icon: <Activity className="h-4 w-4 mr-1.5" />, label: 'Aktivität' },
    { value: 'rewards', icon: <Award className="h-4 w-4 mr-1.5" />, label: 'Belohnungen' },
    { value: 'community', icon: <Users className="h-4 w-4 mr-1.5" />, label: 'Community' },
    { value: 'statistics', icon: <BarChart3 className="h-4 w-4 mr-1.5" />, label: 'Statistiken' },
    { value: 'social', icon: <Monitor className="h-4 w-4 mr-1.5" />, label: 'Social Media' },
    { value: 'data', icon: <Database className="h-4 w-4 mr-1.5" />, label: 'Meine Daten' },
    { value: 'settings', icon: <Settings className="h-4 w-4 mr-1.5" />, label: 'Einstellungen' }
  ];
  
  return (
    <div className="w-full overflow-auto pb-2">
      <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 w-full">
        {tabs.map(tab => (
          <TabsTrigger 
            key={tab.value} 
            value={tab.value} 
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center justify-center ${activeTab === tab.value ? 'bg-jillr-neonPurple/20 text-jillr-neonPurple' : ''}`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.substring(0, 4)}...</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};

export default ProfileTabsHeader;
