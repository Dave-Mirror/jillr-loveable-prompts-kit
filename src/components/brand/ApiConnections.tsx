
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ShopifyIntegration from './api/ShopifyIntegration';
import TikTokIntegration from './api/TikTokIntegration';
import ApiUsageCard from './api/ApiUsageCard';
import SocialMediaIntegrations from './api/SocialMediaIntegrations';
import ThirdPartyApiIntegrations from './api/ThirdPartyApiIntegrations';
import FilterDropdown, { FilterOption } from '@/components/ui/filter-dropdown';
import { Database, Share2, Layers } from 'lucide-react';

const ApiConnections = () => {
  const [activeTab, setActiveTab] = useState('commerce');
  
  const tabOptions: FilterOption[] = [
    { value: 'commerce', label: 'E-Commerce' },
    { value: 'social', label: 'Social Media' },
    { value: 'thirdparty', label: 'Drittanbieter' },
  ];

  const getIcon = () => {
    switch(activeTab) {
      case "commerce": return <Database className="h-5 w-5 text-jillr-neonBlue mr-2" />;
      case "social": return <Share2 className="h-5 w-5 text-jillr-neonPurple mr-2" />;
      case "thirdparty": return <Layers className="h-5 w-5 text-jillr-neonGreen mr-2" />;
      default: return <Database className="h-5 w-5 text-jillr-neonBlue mr-2" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>API Integrationen</CardTitle>
        <CardDescription>
          Verbinde deine Plattform mit externen Diensten und Social-Media-Plattformen
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            {getIcon()}
            <h3 className="font-medium">
              {activeTab === "commerce" && "E-Commerce Integrationen"}
              {activeTab === "social" && "Social Media Verbindungen"}
              {activeTab === "thirdparty" && "Drittanbieter APIs"}
            </h3>
          </div>
          <FilterDropdown
            options={tabOptions}
            activeValue={activeTab}
            onSelect={setActiveTab}
            label="Kategorie"
          />
        </div>
          
        <div className="mt-4">
          {activeTab === "commerce" && (
            <div className="space-y-6">
              <ShopifyIntegration />
              <TikTokIntegration />
              <ApiUsageCard />
            </div>
          )}
          
          {activeTab === "social" && (
            <div className="space-y-6">
              <SocialMediaIntegrations />
            </div>
          )}
          
          {activeTab === "thirdparty" && (
            <div className="space-y-6">
              <ThirdPartyApiIntegrations />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiConnections;
