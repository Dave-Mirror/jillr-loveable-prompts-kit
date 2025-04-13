
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Link, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useShopifyConnection } from '@/hooks/useShopifyConnection';
import ShopifyConnectionForm from './ShopifyConnectionForm';
import ShopifyConnectionStatus from './ShopifyConnectionStatus';

const ShopifyIntegration = () => {
  const {
    shopifyConnected,
    shopifyApiKey,
    shopifySecretKey,
    shopifyStoreUrl,
    shopifyStorefrontToken,
    productCount,
    loading,
    setShopifyApiKey,
    setShopifySecretKey,
    setShopifyStoreUrl,
    setShopifyStorefrontToken,
    connectShopify,
    disconnectShopify,
    fetchProductCount
  } = useShopifyConnection();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-jillr-neonGreen" />
            <CardTitle>Shopify Integration</CardTitle>
          </div>
          {shopifyConnected && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Check className="h-3 w-3" /> Connected
            </Badge>
          )}
        </div>
        <CardDescription>
          Connect your Shopify store to track sales from challenges and manage products
        </CardDescription>
      </CardHeader>
      <CardContent>
        {shopifyConnected ? (
          <ShopifyConnectionStatus
            shopifyStoreUrl={shopifyStoreUrl}
            productCount={productCount}
            loading={loading}
            fetchProductCount={fetchProductCount}
          />
        ) : (
          <ShopifyConnectionForm
            shopifyApiKey={shopifyApiKey}
            shopifySecretKey={shopifySecretKey}
            shopifyStoreUrl={shopifyStoreUrl}
            shopifyStorefrontToken={shopifyStorefrontToken}
            setShopifyApiKey={setShopifyApiKey}
            setShopifySecretKey={setShopifySecretKey}
            setShopifyStoreUrl={setShopifyStoreUrl}
            setShopifyStorefrontToken={setShopifyStorefrontToken}
            connectShopify={connectShopify}
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('https://shopify.dev/docs/api/storefront', '_blank')}
          >
            <Link className="h-4 w-4 mr-1" /> API Docs
          </Button>
        </div>
        <div>
          {shopifyConnected ? (
            <Button
              variant="destructive"
              onClick={disconnectShopify}
            >
              Disconnect
            </Button>
          ) : (
            <Button
              onClick={connectShopify}
            >
              Connect Shopify
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ShopifyIntegration;
