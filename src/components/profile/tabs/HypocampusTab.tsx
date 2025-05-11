
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TriggerDashboard from '@/components/hypocampus/TriggerDashboard';
import TriggerConfigurator from '@/components/hypocampus/TriggerConfigurator';
import HypocampusAnalytics from '@/components/hypocampus/HypocampusAnalytics';
import TriggerRewardHistory from '@/components/hypocampus/TriggerRewardHistory';

interface HypocampusTabProps {
  userProfile: any;
}

const HypocampusTab: React.FC<HypocampusTabProps> = ({ userProfile }) => {
  const [activeHypocampusTab, setActiveHypocampusTab] = useState('dashboard');

  return (
    <div className="space-y-6">
      <Tabs value={activeHypocampusTab} onValueChange={setActiveHypocampusTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="dashboard">Meine Trigger</TabsTrigger>
          <TabsTrigger value="create">Trigger erstellen</TabsTrigger>
          <TabsTrigger value="stats">Statistiken</TabsTrigger>
          <TabsTrigger value="rewards">Belohnungen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-2">
          <TriggerDashboard userRole="personal" />
        </TabsContent>
        
        <TabsContent value="create" className="mt-2">
          <TriggerConfigurator triggerType="personal" />
        </TabsContent>
        
        <TabsContent value="stats" className="mt-2">
          <HypocampusAnalytics />
        </TabsContent>
        
        <TabsContent value="rewards" className="mt-2">
          <TriggerRewardHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HypocampusTab;
