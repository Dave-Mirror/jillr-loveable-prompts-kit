
import React from 'react';
import TriggerConfigurator from '@/components/hypocampus/TriggerConfigurator';
import TriggerDashboard from '@/components/hypocampus/TriggerDashboard';
import TriggerRewardHistory from '@/components/hypocampus/TriggerRewardHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HypocampusPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Hypocampus-System</h1>
        <p className="text-gray-400">
          Definiere und verwalte kontextbasierte Trigger, die automatisch auf dein Verhalten reagieren
        </p>
      </div>
      
      {!user ? (
        <div className="py-12 text-center bg-jillr-darkBlue/30 rounded-xl border border-jillr-border/20 p-8">
          <h2 className="text-2xl font-semibold mb-4">Vorschau des Hypocampus-Systems</h2>
          <p className="mb-8 max-w-lg mx-auto">
            Das Hypocampus-System erlaubt es dir, kontextbasierte Trigger zu definieren,
            die automatisch auf dein Verhalten reagieren. 
            Für vollständigen Zugriff auf alle Funktionen ist eine Anmeldung empfohlen.
          </p>
          <Link to="/auth">
            <Button className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80">
              Anmelden für mehr Funktionen
            </Button>
          </Link>
        </div>
      ) : null}
      
      <Tabs defaultValue="my-triggers" className="space-y-8 mt-8">
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
