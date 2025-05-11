
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DataManager from '../data-vault/DataManager';
import TriggerDashboard from '@/components/hypocampus/TriggerDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Database, Zap } from 'lucide-react';

interface DataVaultTabProps {
  userProfile: any;
}

const DataVaultTab: React.FC<DataVaultTabProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState('permissions');

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-jillr-neonPurple" />
        <h2 className="text-xl font-bold">Meine Daten & Berechtigungen</h2>
      </div>

      <p className="text-muted-foreground mb-6">
        Verwalte deine Daten, Berechtigungen und automatisierten Reaktionen auf Basis deiner Daten.
        Je mehr Daten du freigibst, desto personalisierter wird dein Erlebnis mit Jillr.
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Datenberechtigungen</span>
          </TabsTrigger>
          <TabsTrigger value="triggers" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>Automatisierungen</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="permissions" className="mt-2">
          <DataManager />
        </TabsContent>
        
        <TabsContent value="triggers" className="mt-2">
          <Card className="border border-jillr-neonPurple/30 mb-6">
            <CardHeader>
              <CardTitle>Datenbasierte Automatisierungen</CardTitle>
              <CardDescription>
                Definiere, wie die App auf deine Daten reagieren soll. Beispiel: Erhalte Belohnungen für Standortdaten.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <TriggerDashboard userRole="personal" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataVaultTab;
