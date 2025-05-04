
import { useState } from 'react';

export function useChallengeTabs() {
  const [activeTab, setActiveTab] = useState('basics');

  // Map of tabs with their display names and indices
  const tabsConfig = [
    { id: 'basics', name: '1. Basics' },
    { id: 'content', name: '2. Content' },
    { id: 'kpis', name: '3. KPIs' },
    { id: 'audience', name: '4. Audience' },
    { id: 'rewards', name: '5. Rewards' },
    { id: 'timing', name: '6. Timing' },
    { id: 'advanced', name: '7. Advanced' },
    { id: 'preview', name: '8. Preview' }
  ];

  const navigateTab = (direction) => {
    const tabs = tabsConfig.map(tab => tab.id);
    const currentIndex = tabs.indexOf(activeTab);
    const newIndex = direction === 'next' 
      ? Math.min(currentIndex + 1, tabs.length - 1) 
      : Math.max(currentIndex - 1, 0);
    setActiveTab(tabs[newIndex]);
  };

  return {
    activeTab,
    setActiveTab,
    tabsConfig,
    navigateTab
  };
}
