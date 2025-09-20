
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabConfig } from '@/hooks/challenge-editor/useChallengeTabs';

interface ChallengeTabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabsConfig: TabConfig[];
}

const ChallengeTabNavigation: React.FC<ChallengeTabNavigationProps> = ({
  activeTab,
  setActiveTab,
  tabsConfig
}) => {
  const scrollToActiveTab = () => {
    const activeElement = document.querySelector(`[data-state="active"]`);
    if (activeElement) {
      activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  React.useEffect(() => {
    scrollToActiveTab();
  }, [activeTab]);

  return (
    <div className="border-b pb-4">
      <div className="relative">
        {/* Fade gradients for scroll indication */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Scrollable tab container */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-2">
          {tabsConfig.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-shrink-0 whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                ${activeTab === tab.id 
                  ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-primary shadow-lg' 
                  : 'bg-background/10 border border-border/20 text-muted-foreground hover:bg-background/20 hover:text-foreground backdrop-blur-sm'
                }
              `}
              title={tab.description}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengeTabNavigation;
