
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MobileProfileNavigationProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const MobileProfileNavigation: React.FC<MobileProfileNavigationProps> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  const tabs = [
    { value: 'activity', label: 'Activity' },
    { value: 'rewards', label: 'Rewards' },
    { value: 'community', label: 'Community' },
    { value: 'statistics', label: 'Stats' },
    { value: 'social', label: 'Social' },
    { value: 'settings', label: 'Settings' }
  ];

  return (
    <div className="md:hidden mb-4">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-1 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.value
                  ? 'bg-jillr-neonPurple text-white'
                  : 'bg-jillr-darkBlue/60 text-white/80 hover:bg-jillr-darkBlue/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MobileProfileNavigation;
