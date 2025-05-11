
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, Filter, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import TriggerConfigurator from '@/components/hypocampus/TriggerConfigurator';
import TriggerFilter from '@/components/hypocampus/trigger-management/TriggerFilter';
import TriggerDashboard from '@/components/hypocampus/TriggerDashboard';
import TriggerMatchingSection from '@/components/hypocampus/trigger-management/TriggerMatchingSection';
import TriggerROIAnalysis from '@/components/hypocampus/trigger-management/TriggerROIAnalysis';
import TriggerRecommendations from '@/components/hypocampus/trigger-management/TriggerRecommendations';

const TriggerManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<'personal' | 'brand'>(
    user?.email?.includes('brand') ? 'brand' : 'personal'
  );
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Trigger-Management</h1>
        <p className="text-gray-400">
          Erstelle, verwalte und optimiere Trigger für personalisierte Erlebnisse und bessere Ergebnisse
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Trigger erstellen und verwalten</CardTitle>
                  <CardDescription>
                    Definiere, wann und wie Aktionen ausgelöst werden sollen
                  </CardDescription>
                </div>
                <div className="flex items-center">
                  <div className="border border-gray-600 rounded-md overflow-hidden flex">
                    <Button
                      variant={userRole === 'personal' ? 'default' : 'outline'}
                      onClick={() => setUserRole('personal')}
                      size="sm"
                      className="rounded-none"
                    >
                      Nutzer
                    </Button>
                    <Button
                      variant={userRole === 'brand' ? 'default' : 'outline'}
                      onClick={() => setUserRole('brand')}
                      size="sm"
                      className="rounded-none"
                    >
                      Unternehmen
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="create" className="flex-1">Trigger erstellen</TabsTrigger>
                  <TabsTrigger value="manage" className="flex-1">Meine Trigger</TabsTrigger>
                  <TabsTrigger value="analysis" className="flex-1">Analyse & Optimierung</TabsTrigger>
                </TabsList>
                
                <TabsContent value="create">
                  <TriggerConfigurator triggerType={userRole} />
                </TabsContent>
                
                <TabsContent value="manage">
                  <TriggerDashboard userRole={userRole} />
                </TabsContent>
                
                <TabsContent value="analysis">
                  <TriggerROIAnalysis userRole={userRole} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <TriggerMatchingSection userRole={userRole} />
        </div>
        
        {/* Sidebar */}
        <div className="w-full lg:w-96">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter size={18} />
                Filter & Einstellungen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TriggerFilter userRole={userRole} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info size={18} />
                Empfehlungen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TriggerRecommendations userRole={userRole} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TriggerManagementPage;
