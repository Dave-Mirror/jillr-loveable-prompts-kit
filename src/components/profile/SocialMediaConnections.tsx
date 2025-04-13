
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Instagram, Youtube, Facebook, Twitter, Globe, Share2, Upload, CheckCircle2, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialMediaConnectionsProps {
  userProfile: any;
}

type SocialPlatform = {
  id: string;
  name: string;
  connected: boolean;
  username?: string;
  icon: React.ReactNode;
  autoShare: boolean;
  color: string;
};

const SocialMediaConnections: React.FC<SocialMediaConnectionsProps> = ({ userProfile }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('connected');
  
  // Mock data for social connections - would come from database in real app
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    { 
      id: 'tiktok', 
      name: 'TikTok', 
      connected: true, 
      username: '@jillruser', 
      icon: <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M19.321 5.562a5.124 5.124 0 0 1-3.085-2.5 5.086 5.086 0 0 1-.607-2.437h-3.89v13.75c0 .725-.16 1.356-.48 1.893a3.152 3.152 0 0 1-1.29 1.29 3.354 3.354 0 0 1-1.693.48c-.602 0-1.164-.16-1.685-.48a3.374 3.374 0 0 1-1.29-1.29 3.366 3.366 0 0 1-.48-1.694c0-.601.16-1.163.48-1.684.32-.522.763-.964 1.29-1.29a3.374 3.374 0 0 1 1.694-.48c.24 0 .441.02.682.08v-3.89a6.954 6.954 0 0 0-2.724.562 6.91 6.91 0 0 0-2.321 1.624 7.48 7.48 0 0 0-1.624 2.321 6.957 6.957 0 0 0-.562 2.724c0 .963.16 1.886.562 2.724a7.295 7.295 0 0 0 1.624 2.32 7.631 7.631 0 0 0 2.32 1.626 6.94 6.94 0 0 0 2.725.56 6.94 6.94 0 0 0 2.724-.56 7.631 7.631 0 0 0 2.321-1.626 7.48 7.48 0 0 0 1.624-2.32 6.957 6.957 0 0 0 .562-2.724V9.329a8.723 8.723 0 0 0 2.083.28 8.9 8.9 0 0 0 1.743-.2 8.892 8.892 0 0 0 1.643-.521v-3.89a5.104 5.104 0 0 1-2.725.562Z"></path></svg>, 
      autoShare: true, 
      color: 'bg-black' 
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      connected: true, 
      username: '@jillr_user', 
      icon: <Instagram className="h-5 w-5" />, 
      autoShare: false, 
      color: 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500' 
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      connected: false, 
      icon: <Youtube className="h-5 w-5" />, 
      autoShare: false, 
      color: 'bg-red-600' 
    },
    { 
      id: 'facebook', 
      name: 'Facebook', 
      connected: false, 
      icon: <Facebook className="h-5 w-5" />, 
      autoShare: false, 
      color: 'bg-blue-600' 
    },
    { 
      id: 'twitter', 
      name: 'X (Twitter)', 
      connected: false, 
      icon: <Twitter className="h-5 w-5" />, 
      autoShare: false, 
      color: 'bg-black' 
    },
  ]);

  const handleConnect = (platformId: string) => {
    // In a real app, this would open OAuth flow for the platform
    setPlatforms(platforms.map(p => 
      p.id === platformId ? { ...p, connected: !p.connected, username: p.connected ? undefined : '@jillr_user' } : p
    ));
    
    const platform = platforms.find(p => p.id === platformId);
    
    if (platform) {
      toast({
        title: platform.connected ? `${platform.name} disconnected` : `${platform.name} connected`,
        description: platform.connected 
          ? `Your ${platform.name} account has been disconnected.` 
          : `Your ${platform.name} account has been successfully connected.`,
      });
    }
  };

  const toggleAutoShare = (platformId: string) => {
    setPlatforms(platforms.map(p => 
      p.id === platformId ? { ...p, autoShare: !p.autoShare } : p
    ));
    
    const platform = platforms.find(p => p.id === platformId);
    
    if (platform) {
      toast({
        title: `Auto-sharing ${platform.autoShare ? 'disabled' : 'enabled'}`,
        description: `Auto-sharing for ${platform.name} has been ${platform.autoShare ? 'disabled' : 'enabled'}.`,
      });
    }
  };

  const connectedPlatforms = platforms.filter(p => p.connected);
  const availablePlatforms = platforms.filter(p => !p.connected);

  return (
    <div className="space-y-6 col-span-full">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-jillr-neonPurple" />
            Connected Accounts
          </CardTitle>
          <CardDescription>
            Connect your social media accounts to automatically share challenges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="connected">Connected ({connectedPlatforms.length})</TabsTrigger>
              <TabsTrigger value="available">Available ({availablePlatforms.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="connected">
              {connectedPlatforms.length === 0 ? (
                <div className="text-center py-6 bg-jillr-darkBlue/10 rounded-md">
                  <Share2 className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-lg font-medium mb-1">No Connected Accounts</h3>
                  <p className="text-sm text-muted-foreground mb-4">Connect your social media accounts to share challenges</p>
                  <Button variant="outline" onClick={() => setActiveTab('available')}>
                    Connect an Account
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {connectedPlatforms.map((platform) => (
                    <div key={platform.id} className="flex items-center justify-between p-3 rounded-md bg-jillr-darkBlue/10">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full ${platform.color} mr-3 flex items-center justify-center`}>
                          {platform.icon}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium">{platform.name}</h4>
                            <CheckCircle2 className="h-4 w-4 text-green-500 ml-2" />
                          </div>
                          <p className="text-xs text-muted-foreground">{platform.username}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Switch 
                            id={`share-${platform.id}`}
                            checked={platform.autoShare}
                            onCheckedChange={() => toggleAutoShare(platform.id)}
                          />
                          <Label htmlFor={`share-${platform.id}`} className="text-sm">Auto-Share</Label>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleConnect(platform.id)}
                        >
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Alert className="mt-4 bg-jillr-darkBlue/5">
                    <CheckCircle2 className="h-4 w-4 text-jillr-neonPurple" />
                    <AlertDescription>
                      When auto-share is enabled, your challenge submissions will be automatically posted to your connected accounts.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="available">
              {availablePlatforms.length === 0 ? (
                <div className="text-center py-6 bg-jillr-darkBlue/10 rounded-md">
                  <CheckCircle2 className="h-10 w-10 text-jillr-neonGreen mx-auto mb-2" />
                  <h3 className="text-lg font-medium">All Platforms Connected</h3>
                  <p className="text-sm text-muted-foreground">You've connected all available social platforms.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {availablePlatforms.map((platform) => (
                    <div key={platform.id} className="flex items-center justify-between p-3 rounded-md bg-jillr-darkBlue/10">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full ${platform.color} mr-3 flex items-center justify-center`}>
                          {platform.icon}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium">{platform.name}</h4>
                            <XCircle className="h-4 w-4 text-muted-foreground ml-2" />
                          </div>
                          <p className="text-xs text-muted-foreground">Not connected</p>
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleConnect(platform.id)}
                      >
                        Connect
                      </Button>
                    </div>
                  ))}
                  
                  <Alert className="mt-4 bg-jillr-darkBlue/5">
                    <Upload className="h-4 w-4 text-jillr-neonBlue" />
                    <AlertDescription>
                      Connecting your social media accounts allows Jillr to share your content and track engagement.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-jillr-neonBlue" />
            Cross-Platform Settings
          </CardTitle>
          <CardDescription>
            Manage how Jillr interacts with your social media platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-md bg-jillr-darkBlue/10">
              <div>
                <h4 className="font-medium">Default Content Sharing</h4>
                <p className="text-xs text-muted-foreground">Automatically share your challenge achievements</p>
              </div>
              <Switch id="default-sharing" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-md bg-jillr-darkBlue/10">
              <div>
                <h4 className="font-medium">Mention Jillr</h4>
                <p className="text-xs text-muted-foreground">Include @JillrApp in your shared posts</p>
              </div>
              <Switch id="mention-jillr" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-md bg-jillr-darkBlue/10">
              <div>
                <h4 className="font-medium">Include Challenge Hashtags</h4>
                <p className="text-xs text-muted-foreground">Add challenge hashtags to your shared posts</p>
              </div>
              <Switch id="challenge-hashtags" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-md bg-jillr-darkBlue/10">
              <div>
                <h4 className="font-medium">Engagement Analytics</h4>
                <p className="text-xs text-muted-foreground">Allow Jillr to collect engagement data from shares</p>
              </div>
              <Switch id="engagement-analytics" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaConnections;
