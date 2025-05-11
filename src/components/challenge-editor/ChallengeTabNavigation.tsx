
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
  return (
    <div className="border-b pb-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 md:grid-cols-9 gap-1">
          {tabsConfig.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="text-xs md:text-sm"
              title={tab.description}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ChallengeTabNavigation;
