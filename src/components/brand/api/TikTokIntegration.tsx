
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
import { Check, ExternalLink, Link, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';

const TikTokIntegration = () => {
  const { toast } = useToast();
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const [tiktokApiKey, setTiktokApiKey] = useState('');
  const [tiktokSecretKey, setTiktokSecretKey] = useState('');
  const [tiktokBusinessAccount, setTiktokBusinessAccount] = useState('');

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
  
  const disconnectTikTok = () => {
    setTiktokConnected(false);
    toast({
      title: "TikTok Disconnected",
      description: "Your TikTok Business account has been disconnected",
    });
  };

  return (
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
  );
};

export default TikTokIntegration;
