
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
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="hidden">
          <TabsTrigger value="user">Nutzer</TabsTrigger>
          <TabsTrigger value="creator">Creator</TabsTrigger>
          <TabsTrigger value="brand">Brand</TabsTrigger>
          <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
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
