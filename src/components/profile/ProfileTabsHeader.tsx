
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, Award, Users, BarChart3, Monitor, 
  Settings, Database, Heart, Lock
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    <div className="space-y-4 w-full">
      <ScrollArea className="w-full pb-2 hide-scrollbar">
        <TabsList className="flex items-start justify-start p-1 h-auto min-w-max">
          {tabs.map(tab => (
            <TabsTrigger 
              key={tab.value} 
              value={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center justify-center px-4 py-2 h-auto transition-all ${
                activeTab === tab.value 
                  ? 'bg-jillr-neonPurple text-white font-medium' 
                  : 'bg-jillr-dark/50 text-white/70 hover:text-white hover:bg-jillr-dark'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.value === 'data' && (
                <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-jillr-neonGreen text-[10px] text-white">
                  +XP
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </ScrollArea>
      
      <div className="flex items-center justify-center gap-2 md:hidden px-4">
        <button 
          onClick={() => {
            const prev = tabs.findIndex(tab => tab.value === activeTab) - 1;
            if (prev >= 0) setActiveTab(tabs[prev].value);
          }}
          className={`p-1 rounded-full ${
            tabs.findIndex(tab => tab.value === activeTab) === 0 
              ? 'text-white/40' 
              : 'text-white'
          }`}
          disabled={tabs.findIndex(tab => tab.value === activeTab) === 0}
        >
          ◀
        </button>
        <div className="text-sm text-white/70 flex-1 text-center">
          {tabs.findIndex(tab => tab.value === activeTab) + 1} / {tabs.length}
        </div>
        <button 
          onClick={() => {
            const next = tabs.findIndex(tab => tab.value === activeTab) + 1;
            if (next < tabs.length) setActiveTab(tabs[next].value);
          }}
          className={`p-1 rounded-full ${
            tabs.findIndex(tab => tab.value === activeTab) === tabs.length - 1 
              ? 'text-white/40' 
              : 'text-white'
          }`}
          disabled={tabs.findIndex(tab => tab.value === activeTab) === tabs.length - 1}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default ProfileTabsHeader;
