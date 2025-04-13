
import React, { useState, useEffect } from 'react';
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
import { Check, ExternalLink, Link, ShoppingBag, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import shopifyClient, { getProducts } from '@/utils/shopify';

const ShopifyIntegration = () => {
  const { toast } = useToast();
  const [shopifyConnected, setShopifyConnected] = useState(false);
  const [shopifyApiKey, setShopifyApiKey] = useState('');
  const [shopifySecretKey, setShopifySecretKey] = useState('');
  const [shopifyStoreUrl, setShopifyStoreUrl] = useState('');
  const [shopifyStorefrontToken, setShopifyStorefrontToken] = useState('');
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Check if we have stored credentials
  useEffect(() => {
    const storedShopifyData = localStorage.getItem('shopifyCredentials');
    if (storedShopifyData) {
      const parsedData = JSON.parse(storedShopifyData);
      setShopifyStoreUrl(parsedData.storeUrl);
      setShopifyApiKey(parsedData.apiKey);
      setShopifySecretKey(parsedData.secretKey);
      setShopifyStorefrontToken(parsedData.storefrontToken);
      setShopifyConnected(true);
      
      // Fetch product count
      fetchProductCount();
    }
  }, []);

  const fetchProductCount = async () => {
    try {
      setLoading(true);
      const products = await getProducts();
      setProductCount(products.length);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectShopify = () => {
    if (!shopifyApiKey || !shopifySecretKey || !shopifyStoreUrl || !shopifyStorefrontToken) {
      toast({
        title: "Missing Information",
        description: "Please fill in all Shopify connection fields",
        variant: "destructive",
      });
      return;
    }
    
    // Store credentials in localStorage (in a real app, these would be stored securely)
    const shopifyCredentials = {
      apiKey: shopifyApiKey,
      secretKey: shopifySecretKey,
      storeUrl: shopifyStoreUrl,
      storefrontToken: shopifyStorefrontToken
    };
    
    localStorage.setItem('shopifyCredentials', JSON.stringify(shopifyCredentials));
    
    // In a real implementation, we would set up the client with the new credentials
    setShopifyConnected(true);
    toast({
      title: "Shopify Connected",
      description: "Your Shopify store has been successfully connected",
    });
    
    // Fetch product count
    fetchProductCount();
  };

  const disconnectShopify = () => {
    localStorage.removeItem('shopifyCredentials');
    setShopifyConnected(false);
    setProductCount(0);
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
        ) : (
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
