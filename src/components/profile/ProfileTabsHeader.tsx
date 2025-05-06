
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Trophy, Gift, Users, BarChart, Settings } from 'lucide-react';

interface ProfileTabsHeaderProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const ProfileTabsHeader: React.FC<ProfileTabsHeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <TabsList className="grid grid-cols-6 w-full">
      <TabsTrigger value="activity" className="flex items-center gap-2">
        <Activity size={16} />
        <span className="hidden sm:inline">Activity</span>
      </TabsTrigger>
      
      <TabsTrigger value="challenges" className="flex items-center gap-2">
        <Trophy size={16} />
        <span className="hidden sm:inline">Challenges</span>
      </TabsTrigger>
      
      <TabsTrigger value="rewards" className="flex items-center gap-2">
        <Gift size={16} />
        <span className="hidden sm:inline">Rewards</span>
      </TabsTrigger>
      
      <TabsTrigger value="community" className="flex items-center gap-2">
        <Users size={16} />
        <span className="hidden sm:inline">Community</span>
      </TabsTrigger>
      
      <TabsTrigger value="statistics" className="flex items-center gap-2">
        <BarChart size={16} />
        <span className="hidden sm:inline">Stats</span>
      </TabsTrigger>
      
      <TabsTrigger value="settings" className="flex items-center gap-2">
        <Settings size={16} />
        <span className="hidden sm:inline">Settings</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default ProfileTabsHeader;
