
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TabConfig {
  id: string;
  name: string;
}

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
    <>
      {/* Desktop dropdown selector */}
      <div className="hidden md:flex items-center mb-6 gap-2">
        <span className="font-medium">Step:</span>
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="w-[200px] bg-jillr-darkBlue/10 border-jillr-neonPurple/20">
            <SelectValue placeholder="Select step" />
          </SelectTrigger>
          <SelectContent className="bg-jillr-darkBlue border-jillr-neonPurple/20 text-white">
            {tabsConfig.map(tab => (
              <SelectItem key={tab.id} value={tab.id}>
                {tab.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Mobile horizontal scrollable tabs */}
      <div className="md:hidden mb-6">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-1 p-1">
            {tabsConfig.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-jillr-neonPurple text-white'
                    : 'bg-jillr-darkBlue/60 text-white/80 hover:bg-jillr-darkBlue/80'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default ChallengeTabNavigation;
