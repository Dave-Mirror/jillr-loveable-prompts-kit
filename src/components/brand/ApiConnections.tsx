
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
import { 
  Check, 
  ExternalLink, 
  Link, 
  ShoppingBag, 
  AlertCircle,
  Video
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';

const ApiConnections = () => {
  const { toast } = useToast();
  const [shopifyConnected, setShopifyConnected] = useState(false);
  const [tiktokConnected, setTiktokConnected] = useState(false);
  
  const [shopifyApiKey, setShopifyApiKey] = useState('');
  const [shopifySecretKey, setShopifySecretKey] = useState('');
  const [shopifyStoreUrl, setShopifyStoreUrl] = useState('');
  
  const [tiktokApiKey, setTiktokApiKey] = useState('');
  const [tiktokSecretKey, setTiktokSecretKey] = useState('');
  const [tiktokBusinessAccount, setTiktokBusinessAccount] = useState('');

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
  
  const connectTikTok = () => {
    if (!tiktokApiKey || !tiktokSecretKey || !tiktokBusinessAccount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all TikTok connection fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, this would make an API call to validate and store credentials
    setTimeout(() => {
      setTiktokConnected(true);
      toast({
        title: "TikTok Connected",
        description: "Your TikTok Business account has been successfully connected",
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
  
  const disconnectTikTok = () => {
    setTiktokConnected(false);
    toast({
      title: "TikTok Disconnected",
      description: "Your TikTok Business account has been disconnected",
    });
  };

  return (
    <div className="space-y-6">
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

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Video className="h-5 w-5 text-jillr-neonPurple" />
              <CardTitle>TikTok Ads API</CardTitle>
            </div>
            {tiktokConnected && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Check className="h-3 w-3" /> Connected
              </Badge>
            )}
          </div>
          <CardDescription>
            Connect to TikTok Ads API to track campaign performance and manage ad content
          </CardDescription>
        </CardHeader>
        <CardContent>
          {tiktokConnected ? (
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Connected to TikTok Business</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('https://ads.tiktok.com/', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-1" /> Open TikTok Ads
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Business Account:</span>
                  <span>{tiktokBusinessAccount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Campaigns:</span>
                  <span>5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Sync:</span>
                  <span>1 hour ago</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tiktok-api-key">API Key</Label>
                <Input 
                  id="tiktok-api-key" 
                  value={tiktokApiKey}
                  onChange={(e) => setTiktokApiKey(e.target.value)}
                  placeholder="Your TikTok API key"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tiktok-secret-key">Secret Key</Label>
                <Input 
                  id="tiktok-secret-key" 
                  type="password"
                  value={tiktokSecretKey}
                  onChange={(e) => setTiktokSecretKey(e.target.value)}
                  placeholder="Your TikTok Secret key"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tiktok-business-account">Business Account</Label>
                <Input 
                  id="tiktok-business-account" 
                  value={tiktokBusinessAccount}
                  onChange={(e) => setTiktokBusinessAccount(e.target.value)}
                  placeholder="Your TikTok Business Account"
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
              onClick={() => window.open('https://ads.tiktok.com/marketing_api/docs', '_blank')}
            >
              <Link className="h-4 w-4 mr-1" /> API Docs
            </Button>
          </div>
          <div>
            {tiktokConnected ? (
              <Button
                variant="destructive"
                onClick={disconnectTikTok}
              >
                Disconnect
              </Button>
            ) : (
              <Button
                onClick={connectTikTok}
              >
                Connect TikTok
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <CardTitle>API Usage & Limits</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Shopify API Calls</span>
                <span>2,450 / 10,000</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-jillr-neonGreen h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>TikTok API Calls</span>
                <span>1,280 / 5,000</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-jillr-neonPurple h-2 rounded-full" style={{ width: '26%' }}></div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              API usage resets in 16 days. Need more? <Button variant="link" className="p-0 h-auto text-jillr-neonPurple">Upgrade your plan</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiConnections;
