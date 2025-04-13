
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from '@/hooks/use-toast';
import { Copy, Code, Key, Webhook } from 'lucide-react';

const ThirdPartyApiIntegrations = () => {
  const [apiKeys, setApiKeys] = useState({
    public: 'jillr_public_test_key_xxx',
    private: 'jillr_private_key_•••••••••••••'
  });
  
  const [webhookUrl, setWebhookUrl] = useState('');
  
  const regenerateKeys = (keyType: 'public' | 'private') => {
    // Simuliert Schlüsselregeneration
    const newKey = keyType === 'public' 
      ? `jillr_public_${Math.random().toString(36).substring(2, 10)}_${Date.now().toString(36)}`
      : `jillr_private_${Math.random().toString(36).substring(2, 15)}`;
      
    setApiKeys({
      ...apiKeys,
      [keyType]: newKey
    });
    
    toast({
      title: "API-Schlüssel regeneriert",
      description: `Dein ${keyType === 'public' ? 'öffentlicher' : 'privater'} API-Schlüssel wurde erfolgreich regeneriert.`
    });
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Kopiert!",
      description: "Der API-Schlüssel wurde in die Zwischenablage kopiert."
    });
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
      description: "Dein API-Webhook wurde erfolgreich gespeichert."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API-Schlüssel
          </CardTitle>
          <CardDescription>
            Verwalte API-Schlüssel für den Zugriff auf die Jillr API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="public-key" className="text-sm font-medium">Öffentlicher Schlüssel</Label>
              <div className="flex mt-1.5">
                <Input 
                  id="public-key"
                  value={apiKeys.public} 
                  readOnly 
                  className="flex-1 font-mono text-sm"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => copyToClipboard(apiKeys.public)}
                  className="ml-2"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => regenerateKeys('public')}
                  className="ml-2"
                >
                  Neu generieren
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                Dieser Schlüssel kann öffentlich verwendet werden, z.B. für Authentifizierung von Client-Anfragen.
              </p>
            </div>
            
            <div>
              <Label htmlFor="private-key" className="text-sm font-medium">Privater Schlüssel</Label>
              <div className="flex mt-1.5">
                <Input 
                  id="private-key"
                  value={apiKeys.private} 
                  type="password" 
                  readOnly 
                  className="flex-1 font-mono text-sm"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => copyToClipboard(apiKeys.private)}
                  className="ml-2"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => regenerateKeys('private')}
                  className="ml-2 text-red-500 hover:text-red-600"
                >
                  Neu generieren
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                <strong>Achtung:</strong> Dieser Schlüssel sollte geheim gehalten werden. Er bietet vollen Zugriff auf deine API.
              </p>
            </div>
          </div>
          
          <Alert variant="destructive" className="bg-red-500/10 text-red-600 border-red-600/20">
            <AlertDescription>
              Teile niemals deinen privaten API-Schlüssel. Bei Verdacht auf Kompromittierung regeneriere ihn sofort.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="h-5 w-5" />
            API Webhooks
          </CardTitle>
          <CardDescription>
            Konfiguriere Webhooks, um Benachrichtigungen über API-Ereignisse zu erhalten
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              placeholder="https://api.yourdomain.com/jillr-webhook" 
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={saveWebhook}>Speichern</Button>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="event-types">
              <AccordionTrigger>Ereignistypen konfigurieren</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                  {['challenge.created', 'submission.received', 'reward.claimed', 'user.joined', 'brand.mentioned'].map((event) => (
                    <div key={event} className="flex items-center space-x-2">
                      <input type="checkbox" id={event} className="rounded" />
                      <Label htmlFor={event}>{event}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            API-Dokumentation
          </CardTitle>
          <CardDescription>
            Beispiele und Anleitung zur Verwendung der Jillr API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="rest">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="rest">REST API</TabsTrigger>
              <TabsTrigger value="sdk">JavaScript SDK</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rest" className="mt-4 space-y-4">
              <div className="bg-muted p-4 rounded-md overflow-x-auto">
                <pre className="text-xs">
                  {`// Beispiel: Challenges abrufen
fetch('https://api.jillr.com/v1/challenges', {
  headers: {
    'Authorization': 'Bearer ' + API_KEY
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
                </pre>
              </div>
              
              <Button variant="outline" size="sm">
                Vollständige REST API-Dokumentation
              </Button>
            </TabsContent>
            
            <TabsContent value="sdk" className="mt-4 space-y-4">
              <div className="bg-muted p-4 rounded-md overflow-x-auto">
                <pre className="text-xs">
                  {`// Jillr SDK installieren
npm install jillr-sdk

// SDK initialisieren
import { JillrSDK } from 'jillr-sdk';

const jillr = new JillrSDK({
  apiKey: 'YOUR_API_KEY'
});

// Challenges abrufen
jillr.challenges.list()
  .then(challenges => console.log(challenges));`}
                </pre>
              </div>
              
              <Button variant="outline" size="sm">
                SDK-Dokumentation
              </Button>
            </TabsContent>
            
            <TabsContent value="webhooks" className="mt-4 space-y-4">
              <div className="bg-muted p-4 rounded-md overflow-x-auto">
                <pre className="text-xs">
                  {`// Beispiel für einen Webhook-Empfänger (Express.js)
app.post('/jillr-webhook', (req, res) => {
  const event = req.body;
  
  switch(event.type) {
    case 'challenge.created':
      // Neue Challenge erstellt
      break;
    case 'submission.received':
      // Neue Einreichung erhalten
      break;
  }
  
  res.sendStatus(200);
});`}
                </pre>
              </div>
              
              <Button variant="outline" size="sm">
                Webhook-Dokumentation
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThirdPartyApiIntegrations;
