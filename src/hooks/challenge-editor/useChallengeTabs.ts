
import { useState } from 'react';

export type ChallengeTab = 'basics' | 'location' | 'content' | 'kpis' | 'audience' | 'rewards' | 'timing' | 'automation' | 'advanced' | 'preview';

export interface TabConfig {
  id: ChallengeTab;
  label: string;
  description: string;
}

export const useChallengeTabs = () => {
  const [activeTab, setActiveTab] = useState<ChallengeTab>('basics');

  const tabsConfig: TabConfig[] = [
    {
      id: 'basics',
      label: 'Basics',
      description: 'Challenge Grundlagen'
    },
    {
      id: 'location',
      label: 'Location',
      description: 'Standort & Geofencing'
    },
    {
      id: 'content',
      label: 'Content',
      description: 'Inhaltsanforderungen'
    },
    {
      id: 'kpis',
      label: 'KPIs',
      description: 'Leistungskennzahlen'
    },
    {
      id: 'audience',
      label: 'Zielgruppe',
      description: 'Zielgruppendefinition'
    },
    {
      id: 'rewards',
      label: 'Belohnungen',
      description: 'Anreize & Belohnungen'
    },
    {
      id: 'timing',
      label: 'Timing',
      description: 'Zeitpläne & Limits'
    },
    {
      id: 'automation',
      label: 'Automation',
      description: 'Trigger & Workflows'
    },
    {
      id: 'advanced',
      label: 'Erweitert',
      description: 'Erweiterte Einstellungen'
    },
    {
      id: 'preview',
      label: 'Vorschau',
      description: 'Vorschau & Veröffentlichung'
    }
  ];

  const navigateTab = (direction: 'next' | 'prev') => {
    const currentIndex = tabsConfig.findIndex(tab => tab.id === activeTab);
    
    if (direction === 'next') {
      const nextIndex = Math.min(currentIndex + 1, tabsConfig.length - 1);
      setActiveTab(tabsConfig[nextIndex].id);
    } else {
      const prevIndex = Math.max(currentIndex - 1, 0);
      setActiveTab(tabsConfig[prevIndex].id);
    }
  };

  return {
    activeTab,
    setActiveTab,
    tabsConfig,
    navigateTab
  };
};

export default useChallengeTabs;
