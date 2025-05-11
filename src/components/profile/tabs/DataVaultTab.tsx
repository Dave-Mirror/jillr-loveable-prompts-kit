
import React, { useState } from 'react';
import DataManager from '../data-vault/DataManager';
import TriggerDashboard from '@/components/hypocampus/TriggerDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Database, Zap } from 'lucide-react';
import FilterDropdown, { FilterOption } from '@/components/ui/filter-dropdown';

interface DataVaultTabProps {
  userProfile: any;
}

const DataVaultTab: React.FC<DataVaultTabProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState('permissions');

  const tabOptions: FilterOption[] = [
    { value: 'permissions', label: 'Datenberechtigungen', icon: <Database className="h-4 w-4" /> },
    { value: 'triggers', label: 'Automatisierungen', icon: <Zap className="h-4 w-4" /> },
  ];

  const getIcon = () => {
    switch(activeTab) {
      case "permissions": return <Database className="h-5 w-5 text-jillr-neonBlue mr-2" />;
      case "triggers": return <Zap className="h-5 w-5 text-jillr-neonPurple mr-2" />;
      default: return <Database className="h-5 w-5 text-jillr-neonBlue mr-2" />;
    }
  };

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
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          {getIcon()}
          <h3 className="font-medium">
            {activeTab === "permissions" && "Daten-Einstellungen"}
            {activeTab === "triggers" && "Automatisierte Abläufe"}
          </h3>
        </div>
        <FilterDropdown
          options={tabOptions}
          activeValue={activeTab}
          onSelect={setActiveTab}
          label="Ansicht"
          buttonVariant="default"
        />
      </div>
      
      <div className="mt-4">
        {activeTab === "permissions" && <DataManager />}
        
        {activeTab === "triggers" && (
          <>
            <Card className="border border-jillr-neonPurple/30 mb-6">
              <CardHeader>
                <CardTitle>Datenbasierte Automatisierungen</CardTitle>
                <CardDescription>
                  Definiere, wie die App auf deine Daten reagieren soll. Beispiel: Erhalte Belohnungen für Standortdaten.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <TriggerDashboard userRole="personal" />
          </>
        )}
      </div>
    </div>
  );
};

export default DataVaultTab;
