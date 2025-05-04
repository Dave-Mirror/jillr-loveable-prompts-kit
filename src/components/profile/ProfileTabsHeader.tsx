
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Activity, 
  Award, 
  Users, 
  BarChart3, 
  Share2, 
  Settings 
} from 'lucide-react';
import MobileProfileNavigation from './MobileProfileNavigation';

interface ProfileTabsHeaderProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const ProfileTabsHeader: React.FC<ProfileTabsHeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabOptions = [
    { value: 'activity', label: 'Challenge Activity', icon: Activity },
    { value: 'rewards', label: 'Rewards & XP', icon: Award },
    { value: 'community', label: 'Community', icon: Users },
    { value: 'statistics', label: 'Statistics', icon: BarChart3 },
    { value: 'social', label: 'Social Media', icon: Share2 },
    { value: 'settings', label: 'Settings', icon: Settings }
  ];

  // Get current tab data
  const currentTab = tabOptions.find(tab => tab.value === activeTab) || tabOptions[0];
  const CurrentIcon = currentTab.icon;

  return (
    <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm py-3 border-b">
      <div className="container max-w-4xl">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-lg font-medium">
            <CurrentIcon size={20} className="text-jillr-neonPurple" />
            <span>{currentTab.label}</span>
          </div>
          
          <div className="hidden md:block">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-[180px] bg-jillr-darkBlue/10 border-jillr-neonPurple/20">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent className="bg-jillr-darkBlue border-jillr-neonPurple/20 text-white z-50">
                {tabOptions.map(tab => {
                  const TabIcon = tab.icon;
                  return (
                    <SelectItem 
                      key={tab.value} 
                      value={tab.value}
                      className="focus:bg-jillr-neonPurple/20 focus:text-white"
                    >
                      <div className="flex items-center gap-2">
                        <TabIcon size={16} />
                        <span>{tab.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <MobileProfileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default ProfileTabsHeader;
