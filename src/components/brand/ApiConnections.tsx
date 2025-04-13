
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ShopifyIntegration from './api/ShopifyIntegration';
import TikTokIntegration from './api/TikTokIntegration';
import ApiUsageCard from './api/ApiUsageCard';
import SocialMediaIntegrations from './api/SocialMediaIntegrations';
import ThirdPartyApiIntegrations from './api/ThirdPartyApiIntegrations';

const ApiConnections = () => {
  const [activeTab, setActiveTab] = useState('commerce');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>API Integrationen</CardTitle>
        <CardDescription>
          Verbinde deine Plattform mit externen Diensten und Social-Media-Plattformen
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="commerce">E-Commerce</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="thirdparty">Drittanbieter</TabsTrigger>
          </TabsList>
          
          <TabsContent value="commerce" className="space-y-6">
            <ShopifyIntegration />
            <TikTokIntegration />
            <ApiUsageCard />
          </TabsContent>
          
          <TabsContent value="social" className="space-y-6">
            <SocialMediaIntegrations />
          </TabsContent>
          
          <TabsContent value="thirdparty" className="space-y-6">
            <ThirdPartyApiIntegrations />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ApiConnections;
