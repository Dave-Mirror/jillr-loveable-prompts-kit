
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink, RefreshCw } from "lucide-react";

interface ShopifyConnectionStatusProps {
  shopifyStoreUrl: string;
  productCount: number;
  loading: boolean;
  fetchProductCount: () => void;
}

const ShopifyConnectionStatus: React.FC<ShopifyConnectionStatusProps> = ({
  shopifyStoreUrl,
  productCount,
  loading,
  fetchProductCount
}) => {
  return (
    <div className="bg-muted p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <span className="font-medium">Connected to Shopify Store</span>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.open(`https://${shopifyStoreUrl}/admin`, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-1" /> Open Shopify
        </Button>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Store URL:</span>
          <span>{shopifyStoreUrl}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Products:</span>
          <div className="flex items-center gap-2">
            <span>{productCount}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 rounded-full"
              onClick={fetchProductCount}
              disabled={loading}
            >
              <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Last Sync:</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ShopifyConnectionStatus;
