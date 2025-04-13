
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart2, ChevronDown, Settings, Video, Wrench } from 'lucide-react';
import ChallengeBuilder from '@/components/brand/ChallengeBuilder';
import KpiDashboard from '@/components/brand/KpiDashboard';
import NotificationCenter from '@/components/brand/NotificationCenter';
import ApiConnections from '@/components/brand/ApiConnections';

const BrandDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Brand Dashboard</h1>
          <p className="text-muted-foreground">Manage your challenges, track performance, and access UGC</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Settings
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          <Button className="bg-jillr-neonPurple hover:bg-jillr-neonPurple/80 flex items-center gap-2">
            <Video className="h-4 w-4" />
            Create Challenge
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Welcome back, Brand Partner</CardTitle>
              <CardDescription>
                Here's what's happening with your challenges today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-8">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Active Challenges</span>
                  <span className="text-3xl font-bold">5</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Total Participants</span>
                  <span className="text-3xl font-bold">1,255</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">UGC Created</span>
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span>Create Challenge</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Integrations</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-8">
          <KpiDashboard />
        </TabsContent>
        
        <TabsContent value="create">
          <ChallengeBuilder />
        </TabsContent>
        
        <TabsContent value="integrations">
          <ApiConnections />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrandDashboard;
