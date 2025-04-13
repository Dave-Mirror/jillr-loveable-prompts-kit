
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Facebook, Instagram, Twitter, Share2, Youtube, LinkIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';

type SocialPlatform = {
  id: string;
  name: string;
  connected: boolean;
  icon: React.ReactNode;
  shareEnabled: boolean;
};

const SocialMediaIntegrations = () => {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    { id: 'instagram', name: 'Instagram', connected: false, icon: <Instagram className="h-5 w-5" />, shareEnabled: false },
    { id: 'facebook', name: 'Facebook', connected: false, icon: <Facebook className="h-5 w-5" />, shareEnabled: false },
    { id: 'twitter', name: 'X (Twitter)', connected: false, icon: <Twitter className="h-5 w-5" />, shareEnabled: false },
    { id: 'youtube', name: 'YouTube', connected: false, icon: <Youtube className="h-5 w-5" />, shareEnabled: false },
  ]);
  
  const [webhookUrl, setWebhookUrl] = useState('');

  const handleConnect = (platformId: string) => {
    // Simuliert eine Verbindung zur Plattform
    setPlatforms(platforms.map(p => 
      p.id === platformId ? { ...p, connected: !p.connected } : p
    ));
    
    const platform = platforms.find(p => p.id === platformId);
    toast({
      title: platform?.connected ? `${platform.name} getrennt` : `${platform.name} verbunden`,
      description: platform?.connected 
        ? `Du hast die Verbindung zu ${platform.name} getrennt.` 
        : `Du hast ${platform.name} erfolgreich mit deinem Konto verbunden.`,
    });
  };

  const toggleShareEnabled = (platformId: string) => {
    setPlatforms(platforms.map(p => 
      p.id === platformId ? { ...p, shareEnabled: !p.shareEnabled } : p
    ));
  };

  const saveWebhook = () => {
    if (!webhookUrl) {
      toast({
        title: "Fehler",
        description: "Bitte gib eine gültige Webhook-URL ein",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Webhook gespeichert",
      description: "Dein Social-Media-Webhook wurde erfolgreich gespeichert."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Social Media Plattformen
          </CardTitle>
          <CardDescription>
            Verbinde deine Social-Media-Konten für automatisches Teilen von Challenges und Inhalten
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {platforms.map((platform) => (
            <div key={platform.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                {platform.icon}
                <div>
                  <p className="font-medium">{platform.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {platform.connected ? 'Verbunden' : 'Nicht verbunden'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {platform.connected && (
                  <div className="flex items-center gap-2">
                    <Switch 
                      id={`share-${platform.id}`}
                      checked={platform.shareEnabled}
                      onCheckedChange={() => toggleShareEnabled(platform.id)}
                    />
                    <Label htmlFor={`share-${platform.id}`}>Auto-Share</Label>
                  </div>
                )}
                <Button 
                  variant={platform.connected ? "outline" : "default"}
                  onClick={() => handleConnect(platform.id)}
                >
                  {platform.connected ? 'Trennen' : 'Verbinden'}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            Webhooks für Social Sharing
          </CardTitle>
          <CardDescription>
            Richte Webhooks ein, um automatisch Inhalte auf Social-Media-Plattformen zu teilen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              Webhooks ermöglichen die automatische Ausführung von Aktionen, wenn bestimmte Ereignisse eintreten, 
              wie z.B. das Erstellen einer neuen Challenge oder das Erreichen eines Meilensteins.
            </AlertDescription>
          </Alert>
          
          <div className="flex gap-2">
            <Input 
              placeholder="https://hooks.zapier.com/hooks/catch/..." 
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={saveWebhook}>Speichern</Button>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Du kannst Webhooks nutzen, um mit Zapier, IFTTT oder ähnlichen Diensten zu integrieren.
        </CardFooter>
      </Card>
    </div>
  );
};

export default SocialMediaIntegrations;
