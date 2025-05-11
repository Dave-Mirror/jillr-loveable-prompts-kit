
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import TriggerDashboard from '@/components/hypocampus/TriggerDashboard';
import HypocampusAnalytics from '@/components/hypocampus/HypocampusAnalytics';
import BrandTriggerConfigurator from '@/components/hypocampus/BrandTriggerConfigurator';

const BrandHypocampusDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Kontext-basiertes Marketing</CardTitle>
          <CardDescription>
            Nutze das Hypocampus-System für kontextbezogene Interaktionen mit deinen Nutzern
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="triggers">Marken-Trigger</TabsTrigger>
              <TabsTrigger value="create">Trigger erstellen</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analytics" className="mt-2">
              <HypocampusAnalytics />
            </TabsContent>
            
            <TabsContent value="triggers" className="mt-2">
              <TriggerDashboard userRole="brand" />
            </TabsContent>
            
            <TabsContent value="create" className="mt-2">
              <BrandTriggerConfigurator />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandHypocampusDashboard;
