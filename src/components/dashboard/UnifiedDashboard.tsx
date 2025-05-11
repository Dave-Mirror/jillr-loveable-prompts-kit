
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

interface UnifiedDashboardProps {
  initialActiveTab?: string;
}

const UnifiedDashboard = ({ initialActiveTab = 'user' }: UnifiedDashboardProps) => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  
  // Update active tab when initialActiveTab changes
  useEffect(() => {
    setActiveTab(initialActiveTab);
  }, [initialActiveTab]);

  // Handler for dashboard tab clicks to navigate to profile with appropriate tab
  const handleDashboardClick = (tabType: string) => {
    if (tabType === 'user') {
      navigate('/profile?tab=activity');
    } else if (tabType === 'creator') {
      navigate('/profile?tab=community');
    } else if (tabType === 'brand' || tabType === 'enterprise') {
      navigate('/profile?tab=statistics');
    }
  };

  // Navigation handler for creating triggers
  const handleCreateTrigger = () => {
    navigate('/trigger-management', { state: { initialTab: 'create' } });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/challenge-editor')}
          className="flex items-center gap-2"
        >
          <Video className="h-4 w-4" /> Challenge erstellen
        </Button>
        <Button 
          variant="outline" 
          onClick={handleCreateTrigger}
          className="flex items-center gap-2"
        >
          <Zap className="h-4 w-4" /> Trigger erstellen
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="hidden">
          <TabsTrigger value="user">Nutzer</TabsTrigger>
          <TabsTrigger value="creator">Creator</TabsTrigger>
          <TabsTrigger value="brand">Brand</TabsTrigger>
          <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
        </TabsList>

        <TabsContent value="user">
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              onClick={() => handleDashboardClick('user')}
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" /> Profil Übersicht anzeigen
            </Button>
          </div>
          <UserDashboardContent />
        </TabsContent>

        <TabsContent value="creator">
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              onClick={() => handleDashboardClick('creator')}
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" /> Creator Übersicht anzeigen
            </Button>
          </div>
          <CreatorDashboardContent />
        </TabsContent>

        <TabsContent value="brand">
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              onClick={() => handleDashboardClick('brand')}
              className="flex items-center gap-2"
            >
              <BarChart2 className="h-4 w-4" /> Brand Übersicht anzeigen
            </Button>
          </div>
          <BrandDashboardContent />
        </TabsContent>

        <TabsContent value="enterprise">
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              onClick={() => handleDashboardClick('enterprise')}
              className="flex items-center gap-2"
            >
              <Building2 className="h-4 w-4" /> Enterprise Übersicht anzeigen
            </Button>
          </div>
          <EnterpriseDashboardContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnifiedDashboard;
