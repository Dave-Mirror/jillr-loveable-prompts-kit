
import React from 'react';
import TriggerConfigurator from '@/components/hypocampus/TriggerConfigurator';
import TriggerDashboard from '@/components/hypocampus/TriggerDashboard';
import TriggerRewardHistory from '@/components/hypocampus/TriggerRewardHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';

const HypocampusPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="py-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Anmeldung erforderlich</h2>
          <p>Bitte melde dich an, um das Hypocampus-System zu nutzen.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Hypocampus-System</h1>
        <p className="text-gray-400">
          Definiere und verwalte kontextbasierte Trigger, die automatisch auf dein Verhalten reagieren
        </p>
      </div>
      
      <Tabs defaultValue="my-triggers" className="space-y-8">
        <TabsList className="w-full border-b border-gray-800 mb-4">
          <TabsTrigger value="my-triggers" className="flex-1">Meine Trigger</TabsTrigger>
          <TabsTrigger value="new-trigger" className="flex-1">Neuer Trigger</TabsTrigger>
          <TabsTrigger value="statistics" className="flex-1">Statistiken</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-triggers" className="pt-4">
          <TriggerDashboard />
        </TabsContent>
        
        <TabsContent value="new-trigger" className="pt-4">
          <TriggerConfigurator />
        </TabsContent>
        
        <TabsContent value="statistics" className="pt-4">
          <TriggerRewardHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HypocampusPage;
