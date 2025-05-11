
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import TriggerDashboard from '@/components/hypocampus/TriggerDashboard';
import HypocampusAnalytics from '@/components/hypocampus/HypocampusAnalytics';
import BrandTriggerConfigurator from '@/components/hypocampus/BrandTriggerConfigurator';
import FilterDropdown, { FilterOption } from '@/components/ui/filter-dropdown';
import { BarChart2, Settings, Zap } from 'lucide-react';

const BrandHypocampusDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  const tabOptions: FilterOption[] = [
    { value: 'analytics', label: 'Analytics' },
    { value: 'triggers', label: 'Marken-Trigger' },
    { value: 'create', label: 'Trigger erstellen' },
  ];

  const getIcon = () => {
    switch(activeTab) {
      case "analytics": return <BarChart2 className="h-5 w-5 text-jillr-neonBlue mr-2" />;
      case "triggers": return <Zap className="h-5 w-5 text-jillr-neonPurple mr-2" />;
      case "create": return <Settings className="h-5 w-5 text-jillr-neonGreen mr-2" />;
      default: return <BarChart2 className="h-5 w-5 text-jillr-neonBlue mr-2" />;
    }
  };

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
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              {getIcon()}
              <h3 className="font-medium">
                {activeTab === "analytics" && "Analytics Dashboard"}
                {activeTab === "triggers" && "Marken-Trigger Übersicht"}
                {activeTab === "create" && "Neuen Trigger erstellen"}
              </h3>
            </div>
            <FilterDropdown
              options={tabOptions}
              activeValue={activeTab}
              onSelect={setActiveTab}
              label="Ansicht"
            />
          </div>
          
          <div className="mt-4">
            {activeTab === "analytics" && <HypocampusAnalytics />}
            {activeTab === "triggers" && <TriggerDashboard userRole="brand" />}
            {activeTab === "create" && <BrandTriggerConfigurator />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandHypocampusDashboard;
