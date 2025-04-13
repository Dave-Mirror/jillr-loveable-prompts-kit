
import React from 'react';
import ShopifyIntegration from './api/ShopifyIntegration';
import TikTokIntegration from './api/TikTokIntegration';
import ApiUsageCard from './api/ApiUsageCard';

const ApiConnections = () => {
  return (
    <div className="space-y-6">
      <ShopifyIntegration />
      <TikTokIntegration />
      <ApiUsageCard />
    </div>
  );
};

export default ApiConnections;
