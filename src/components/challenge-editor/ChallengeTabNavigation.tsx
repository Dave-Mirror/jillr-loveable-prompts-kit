
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TabConfig } from '@/hooks/challenge-editor/useChallengeTabs';
import { Button } from '@/components/ui/button';

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

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    scrollToActiveTab();
  }, [activeTab]);

  return (
    <div className="mb-6">
      <div className="relative group">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none" />
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none" />
        
        {/* Left scroll button (desktop only) */}
        <Button
          variant="ghost"
          size="sm"
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 p-0 rounded-full bg-background/80 backdrop-blur-sm border border-border/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:flex"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        {/* Right scroll button (desktop only) */}
        <Button
          variant="ghost"
          size="sm"
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 p-0 rounded-full bg-background/80 backdrop-blur-sm border border-border/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:flex"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        
        {/* Scrollable tab container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-2"
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
                flex-shrink-0 whitespace-nowrap h-10 px-5 rounded-full text-sm font-medium 
                leading-none flex items-center justify-center transition-all duration-300 
                backdrop-blur-xl
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
