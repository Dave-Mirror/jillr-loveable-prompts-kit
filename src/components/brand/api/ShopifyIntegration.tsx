
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ExternalLink, Link, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';

const ShopifyIntegration = () => {
  const { toast } = useToast();
  const [shopifyConnected, setShopifyConnected] = useState(false);
  const [shopifyApiKey, setShopifyApiKey] = useState('');
  const [shopifySecretKey, setShopifySecretKey] = useState('');
  const [shopifyStoreUrl, setShopifyStoreUrl] = useState('');

  const connectShopify = () => {
    if (!shopifyApiKey || !shopifySecretKey || !shopifyStoreUrl) {
      toast({
        title: "Missing Information",
        description: "Please fill in all Shopify connection fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, this would make an API call to validate and store credentials
    setTimeout(() => {
      setShopifyConnected(true);
      toast({
        title: "Shopify Connected",
        description: "Your Shopify store has been successfully connected",
      });
    }, 1500);
  };

  const disconnectShopify = () => {
    setShopifyConnected(false);
    toast({
      title: "Shopify Disconnected",
      description: "Your Shopify store has been disconnected",
    });
  };

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
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Connected to Shopify Store</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://shopify.com/admin', '_blank')}
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
                <span>237</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Sync:</span>
                <span>2 hours ago</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shopify-api-key">API Key</Label>
              <Input 
                id="shopify-api-key" 
                value={shopifyApiKey}
                onChange={(e) => setShopifyApiKey(e.target.value)}
                placeholder="Your Shopify API key"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shopify-secret-key">Secret Key</Label>
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
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('https://shopify.dev/docs/api', '_blank')}
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
