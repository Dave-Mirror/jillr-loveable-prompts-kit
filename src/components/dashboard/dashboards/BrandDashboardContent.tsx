
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BarChart2, ChevronDown, Settings, Video, Wrench, Zap } from 'lucide-react';
import KpiDashboard from '@/components/brand/KpiDashboard';
import NotificationCenter from '@/components/brand/NotificationCenter';
import ApiConnections from '@/components/brand/ApiConnections';
import BrandHypocampusDashboard from '@/components/brand/BrandHypocampusDashboard';
import FilterDropdown, { FilterOption } from '@/components/ui/filter-dropdown';

const BrandDashboardContent = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabOptions: FilterOption[] = [
    { value: 'overview', label: 'Overview' },
    { value: 'create', label: 'Create Challenge' },
    { value: 'hypocampus', label: 'Automatisierung' },
    { value: 'integrations', label: 'Integrations' },
  ];
  
  const getIcon = () => {
    switch(activeTab) {
      case "overview": return <BarChart2 className="h-5 w-5 text-jillr-neonBlue mr-2" />;
      case "create": return <Video className="h-5 w-5 text-jillr-neonPurple mr-2" />;
      case "hypocampus": return <Zap className="h-5 w-5 text-jillr-neonGreen mr-2" />;
      case "integrations": return <Settings className="h-5 w-5 text-gray-400 mr-2" />;
      default: return <BarChart2 className="h-5 w-5 text-jillr-neonBlue mr-2" />;
    }
  };
  
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Willkommen zurück, Brand Partner</CardTitle>
              <CardDescription>
                Hier ist, was mit deinen Challenges heute passiert
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-8">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Aktive Challenges</span>
                  <span className="text-3xl font-bold">5</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Teilnehmer gesamt</span>
                  <span className="text-3xl font-bold">1,255</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">UGC erstellt</span>
                  <span className="text-3xl font-bold">426</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Downloads</span>
                  <span className="text-3xl font-bold">178</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <NotificationCenter />
        </div>
      </div>
      
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center">
          {getIcon()}
          <h3 className="text-xl font-bold">
            {activeTab === "overview" && "Dashboard Overview"}
            {activeTab === "create" && "Challenge erstellen"}
            {activeTab === "hypocampus" && "Automatisierung"}
            {activeTab === "integrations" && "API Integrationen"}
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
      
      {activeTab === "overview" && <KpiDashboard />}
      
      {activeTab === "create" && (
        <div className="p-8 text-center bg-jillr-darkAccent/40 rounded-xl border border-jillr-border/20">
          <h3 className="text-xl font-semibold mb-4">Challenge erstellen</h3>
          <p className="text-muted-foreground mb-6">
            Nutze unseren Challenge-Editor, um eine neue Marketing-Challenge für deine Zielgruppe zu erstellen.
          </p>
          <Link to="/challenge-editor">
            <Button className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80">
              Zum Challenge-Editor
            </Button>
          </Link>
        </div>
      )}
      
      {activeTab === "hypocampus" && <BrandHypocampusDashboard />}
      
      {activeTab === "integrations" && <ApiConnections />}
    </div>
  );
};

export default BrandDashboardContent;
