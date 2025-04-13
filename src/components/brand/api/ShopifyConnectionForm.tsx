
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ShopifyConnectionFormProps {
  shopifyApiKey: string;
  shopifySecretKey: string;
  shopifyStoreUrl: string;
  shopifyStorefrontToken: string;
  setShopifyApiKey: (value: string) => void;
  setShopifySecretKey: (value: string) => void;
  setShopifyStoreUrl: (value: string) => void;
  setShopifyStorefrontToken: (value: string) => void;
  connectShopify: () => void;
}

const ShopifyConnectionForm: React.FC<ShopifyConnectionFormProps> = ({
  shopifyApiKey,
  shopifySecretKey,
  shopifyStoreUrl,
  shopifyStorefrontToken,
  setShopifyApiKey,
  setShopifySecretKey,
  setShopifyStoreUrl,
  setShopifyStorefrontToken,
  connectShopify
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="shopify-api-key">Admin API Key</Label>
        <Input 
          id="shopify-api-key" 
          value={shopifyApiKey}
          onChange={(e) => setShopifyApiKey(e.target.value)}
          placeholder="Your Shopify API key"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="shopify-secret-key">Admin API Secret Key</Label>
        <Input 
          id="shopify-secret-key" 
          type="password"
          value={shopifySecretKey}
          onChange={(e) => setShopifySecretKey(e.target.value)}
          placeholder="Your Shopify Secret key"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="shopify-store-url">Store URL</Label>
        <Input 
          id="shopify-store-url" 
          value={shopifyStoreUrl}
          onChange={(e) => setShopifyStoreUrl(e.target.value)}
          placeholder="yourstorename.myshopify.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="shopify-storefront-token">Storefront Access Token</Label>
        <Input 
          id="shopify-storefront-token" 
          value={shopifyStorefrontToken}
          onChange={(e) => setShopifyStorefrontToken(e.target.value)}
          placeholder="Your Storefront Access Token"
        />
        <p className="text-xs text-muted-foreground mt-1">
          You can generate this token in your Shopify admin under Apps &gt; Develop apps &gt; Create an app &gt; Configure Storefront API &gt; Create a token
        </p>
      </div>
    </div>
  );
};

export default ShopifyConnectionForm;
