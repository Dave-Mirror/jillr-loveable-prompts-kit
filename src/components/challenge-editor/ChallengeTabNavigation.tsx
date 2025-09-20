
import React, { useRef } from 'react';
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToActiveTab = () => {
    const activeButton = document.querySelector(`button[data-tab="${activeTab}"]`);
    if (activeButton && scrollContainerRef.current) {
      activeButton.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest', 
        inline: 'center' 
      });
    }
  };

  React.useEffect(() => {
    scrollToActiveTab();
  }, [activeTab]);

  return (
    <div className="mb-6 -mx-6 px-6">
      <div className="relative overflow-hidden">
        {/* Soft gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background/90 via-background/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background/90 via-background/60 to-transparent z-10 pointer-events-none" />
        
        {/* Scrollable tab container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide py-3 px-2"
          style={{ 
            scrollSnapType: 'x mandatory',
            scrollPaddingLeft: '1rem',
            scrollPaddingRight: '1rem'
          }}
        >
          {tabsConfig.map((tab) => (
            <button
              key={tab.id}
              data-tab={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-shrink-0 h-10 px-5 rounded-full text-sm font-medium 
                leading-none flex items-center justify-center transition-all duration-300 
                backdrop-blur-xl whitespace-nowrap
                max-[360px]:max-w-[60vw] max-[360px]:text-ellipsis max-[360px]:overflow-hidden
                ${activeTab === tab.id 
                  ? 'bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-2 border-primary/40 text-primary shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]' 
                  : 'bg-background/8 border border-border/25 text-muted-foreground hover:bg-background/12 hover:border-border/40 hover:text-foreground'
                }
              `}
              style={{ scrollSnapAlign: 'center' }}
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
