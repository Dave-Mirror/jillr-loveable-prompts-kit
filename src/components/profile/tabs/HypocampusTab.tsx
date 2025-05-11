
import React, { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import TriggerDashboard from '@/components/hypocampus/TriggerDashboard';
import TriggerConfigurator from '@/components/hypocampus/TriggerConfigurator';
import HypocampusAnalytics from '@/components/hypocampus/HypocampusAnalytics';
import TriggerRewardHistory from '@/components/hypocampus/TriggerRewardHistory';
import FilterDropdown, { FilterOption } from '@/components/ui/filter-dropdown';
import { Zap, Plus, BarChart3, Gift } from 'lucide-react';

interface HypocampusTabProps {
  userProfile: any;
}

const HypocampusTab: React.FC<HypocampusTabProps> = ({ userProfile }) => {
  const [activeHypocampusTab, setActiveHypocampusTab] = useState('dashboard');
  
  const tabOptions: FilterOption[] = [
    { value: 'dashboard', label: 'Meine Trigger', icon: <Zap className="h-4 w-4" /> },
    { value: 'create', label: 'Trigger erstellen', icon: <Plus className="h-4 w-4" /> },
    { value: 'stats', label: 'Statistiken', icon: <BarChart3 className="h-4 w-4" /> },
    { value: 'rewards', label: 'Belohnungen', icon: <Gift className="h-4 w-4" /> },
  ];
  
  const getIcon = () => {
    switch(activeHypocampusTab) {
      case "dashboard": return <Zap className="h-5 w-5 text-jillr-neonBlue mr-2" />;
      case "create": return <Plus className="h-5 w-5 text-jillr-neonPurple mr-2" />;
      case "stats": return <BarChart3 className="h-5 w-5 text-jillr-neonGreen mr-2" />;
      case "rewards": return <Gift className="h-5 w-5 text-jillr-neonBlue mr-2" />;
      default: return <Zap className="h-5 w-5 text-jillr-neonBlue mr-2" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          {getIcon()}
          <h3 className="font-medium">
            {activeHypocampusTab === "dashboard" && "Meine Trigger"}
            {activeHypocampusTab === "create" && "Trigger erstellen"}
            {activeHypocampusTab === "stats" && "Trigger-Statistiken"}
            {activeHypocampusTab === "rewards" && "Erhaltene Belohnungen"}
          </h3>
        </div>
        <FilterDropdown
          options={tabOptions}
          activeValue={activeHypocampusTab}
          onSelect={setActiveHypocampusTab}
          label="Ansicht"
          buttonVariant="default"
        />
      </div>
      
      <TabsContent value="dashboard" className="mt-0">
        <TriggerDashboard userRole="personal" />
      </TabsContent>
      
      <TabsContent value="create" className="mt-0">
        <TriggerConfigurator triggerType="personal" />
      </TabsContent>
      
      <TabsContent value="stats" className="mt-0">
        <HypocampusAnalytics />
      </TabsContent>
      
      <TabsContent value="rewards" className="mt-0">
        <TriggerRewardHistory />
      </TabsContent>
    </div>
  );
};

export default HypocampusTab;
