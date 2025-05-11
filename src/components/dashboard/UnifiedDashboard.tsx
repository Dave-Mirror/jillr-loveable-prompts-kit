
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { User, Building2, Video, BarChart2, Zap } from 'lucide-react';

// Dashboards
import UserDashboardContent from './dashboards/UserDashboardContent';
import CreatorDashboardContent from './dashboards/CreatorDashboardContent';
import BrandDashboardContent from './dashboards/BrandDashboardContent';
import EnterpriseDashboardContent from './dashboards/EnterpriseDashboardContent';

const UnifiedDashboard = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('user');
  
  // Bestimme die Standardansicht basierend auf der Benutzerrolle
  useEffect(() => {
    if (user) {
      if (user.email?.includes('brand') || userProfile?.accountType === 'brand') {
        setActiveTab('brand');
      } else if (userProfile?.isCreator) {
        setActiveTab('creator');
      } else if (userProfile?.isEnterprise) {
        setActiveTab('enterprise');
      }
    }
  }, [user, userProfile]);

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Verwalte deine Aktivitäten und Inhalte</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            onClick={() => navigate('/challenge-editor')}
            className="flex items-center gap-2"
          >
            <Video className="h-4 w-4" /> Challenge erstellen
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-background mb-4">
          <TabsTrigger value="user" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Nutzer
          </TabsTrigger>
          <TabsTrigger value="creator" className="flex items-center gap-2">
            <Zap className="h-4 w-4" /> Creator
          </TabsTrigger>
          <TabsTrigger value="brand" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" /> Brand
          </TabsTrigger>
          <TabsTrigger value="enterprise" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" /> Enterprise
          </TabsTrigger>
        </TabsList>

        <TabsContent value="user">
          <UserDashboardContent />
        </TabsContent>

        <TabsContent value="creator">
          <CreatorDashboardContent />
        </TabsContent>

        <TabsContent value="brand">
          <BrandDashboardContent />
        </TabsContent>

        <TabsContent value="enterprise">
          <EnterpriseDashboardContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnifiedDashboard;
