
import React from 'react';
import { Activity, Award, Users, BarChart3, Monitor, Database, Settings } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

interface MobileProfileNavigationProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const MobileProfileNavigation: React.FC<MobileProfileNavigationProps> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  const tabs = [
    { value: 'activity', label: 'Aktivität', icon: Activity },
    { value: 'rewards', label: 'Belohnungen', icon: Award },
    { value: 'community', label: 'Community', icon: Users },
    { value: 'statistics', label: 'Statistik', icon: BarChart3 },
    { value: 'social', label: 'Social Media', icon: Monitor },
    { value: 'data', label: 'Meine Daten', icon: Database },
    { value: 'settings', label: 'Einstellungen', icon: Settings }
  ];

  return (
    <div className="md:hidden mb-4">
      <ScrollArea className="w-full hide-scrollbar">
        <div className="flex space-x-1 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3 py-2 rounded-xl flex flex-col items-center justify-center transition-colors ${
                activeTab === tab.value
                  ? 'bg-jillr-neonPurple text-white'
                  : 'bg-jillr-darkBlue/60 text-white/80 hover:bg-jillr-darkBlue/80'
              }`}
            >
              <tab.icon size={18} className={activeTab === tab.value ? 'mb-1' : 'mb-1 opacity-70'} />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {activeTab === tab.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-1 w-1 h-1 rounded-full bg-white"
                />
              )}
              {tab.value === 'data' && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-jillr-neonGreen text-[8px] text-white">
                  XP
                </span>
              )}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MobileProfileNavigation;
