import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trash2, Plus, Eye, Sparkles, Target, Filter, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TriggerCondition {
  field: string;
  op: string;
  value: any;
}

interface TriggerAction {
  action: string;
  params: Record<string, any>;
}

interface Trigger {
  id: string;
  name: string;
  mode: 'basic' | 'advanced';
  if: TriggerCondition[];
  then: TriggerAction[];
  description: string;
  active: boolean;
}

interface AudienceMatch {
  segment: string;
  score: number;
  badge?: string;
}

interface TriggersTargetingProps {
  data: any;
  onChange: (data: any) => void;
}

const fieldOptions = [
  { value: 'user.age_group', label: 'Altersgruppe' },
  { value: 'user.city', label: 'Stadt' },
  { value: 'user.interest', label: 'Interessen' },
  { value: 'user.xp_level', label: 'XP Level' },
  { value: 'geo.within_radius', label: 'Umkreis (Meter)' },
  { value: 'time.day_of_week', label: 'Wochentag' },
  { value: 'engagement.likes', label: 'Likes' },
  { value: 'engagement.completions', label: 'Abschlüsse' }
];

const operatorOptions = [
  { value: '=', label: 'Gleich' },
  { value: '!=', label: 'Ungleich' },
  { value: '>', label: 'Größer als' },
  { value: '>=', label: 'Größer gleich' },
  { value: '<', label: 'Kleiner als' },
  { value: '<=', label: 'Kleiner gleich' },
  { value: 'IN', label: 'Enthalten in' },
  { value: 'NOT IN', label: 'Nicht enthalten in' },
  { value: 'CONTAINS', label: 'Enthält' },
  { value: 'EXISTS', label: 'Existiert' }
];

const actionOptions = [
  { value: 'send_push', label: 'Push-Benachrichtigung senden' },
  { value: 'send_email', label: 'E-Mail senden' },
  { value: 'show_banner', label: 'Banner anzeigen' },
  { value: 'grant_xp', label: 'XP vergeben' },
  { value: 'apply_discount', label: 'Rabatt anwenden' },
  { value: 'unlock_badge', label: 'Badge freischalten' },
  { value: 'auto_join_challenge', label: 'Challenge automatisch beitreten' },
  { value: 'webhook.post', label: 'Webhook aufrufen' }
];

const mockAudienceData: AudienceMatch[] = [
  { segment: 'Gen Z', score: 0.89, badge: 'Empfohlen' },
  { segment: 'Millennials', score: 0.72, badge: 'Empfohlen' },
  { segment: 'Fashion Enthusiasts', score: 0.68, badge: 'Empfohlen' },
  { segment: 'Tech Early Adopters', score: 0.55 },
  { segment: 'Fitness Enthusiasts', score: 0.43 },
  { segment: 'Travel Lovers', score: 0.32 }
];

const TriggersTargeting: React.FC<TriggersTargetingProps> = ({ data, onChange }) => {
  const { toast } = useToast();
  const [currentTrigger, setCurrentTrigger] = useState<Trigger>({
    id: crypto.randomUUID(),
    name: '',
    mode: 'basic',
    if: [{ field: '', op: '', value: '' }],
    then: [{ action: '', params: {} }],
    description: '',
    active: true
  });
  
  const [triggerMode, setTriggerMode] = useState<'basic' | 'advanced'>('basic');
  const [effectiveness, setEffectiveness] = useState([30]);
  const [category, setCategory] = useState('Alle Kategorien');
  const [audience, setAudience] = useState('Alle Zielgruppen');
  const [activeSubNav, setActiveSubNav] = useState<'create' | 'manage' | 'analyze'>('create');

  const triggers = data?.triggers || [];
  const audienceMatch = data?.audience_match || mockAudienceData;

  const addCondition = () => {
    setCurrentTrigger(prev => ({
      ...prev,
      if: [...prev.if, { field: '', op: '', value: '' }]
    }));
  };

  const removeCondition = (index: number) => {
    setCurrentTrigger(prev => ({
      ...prev,
      if: prev.if.filter((_, i) => i !== index)
    }));
  };

  const updateCondition = (index: number, updates: Partial<TriggerCondition>) => {
    setCurrentTrigger(prev => ({
      ...prev,
      if: prev.if.map((condition, i) => 
        i === index ? { ...condition, ...updates } : condition
      )
    }));
  };

  const addAction = () => {
    setCurrentTrigger(prev => ({
      ...prev,
      then: [...prev.then, { action: '', params: {} }]
    }));
  };

  const removeAction = (index: number) => {
    setCurrentTrigger(prev => ({
      ...prev,
      then: prev.then.filter((_, i) => i !== index)
    }));
  };

  const updateAction = (index: number, updates: Partial<TriggerAction>) => {
    setCurrentTrigger(prev => ({
      ...prev,
      then: prev.then.map((action, i) => 
        i === index ? { ...action, ...updates } : action
      )
    }));
  };

  const saveTrigger = () => {
    if (!currentTrigger.name || currentTrigger.if.some(c => !c.field || !c.op) || 
        currentTrigger.then.some(a => !a.action)) {
      toast({
        title: "Validation Error",
        description: "Bitte füllen Sie alle erforderlichen Felder aus.",
        variant: "destructive"
      });
      return;
    }

    const updatedTriggers = [...triggers, { ...currentTrigger, id: crypto.randomUUID() }];
    onChange({
      ...data,
      triggers: updatedTriggers
    });

    setCurrentTrigger({
      id: crypto.randomUUID(),
      name: '',
      mode: 'basic',
      if: [{ field: '', op: '', value: '' }],
      then: [{ action: '', params: {} }],
      description: '',
      active: true
    });

    toast({
      title: "Trigger gespeichert",
      description: "Der Trigger wurde erfolgreich erstellt."
    });
  };

  const testTrigger = () => {
    toast({
      title: "Trigger getestet",
      description: "Vorschau: 3 von 4 Bedingungen erfüllt. 2 Aktionen würden ausgeführt."
    });
  };

  const estimatedReach = Math.floor(12400 * (effectiveness[0] / 100));

  const toggleTrigger = (triggerId: string) => {
    const updatedTriggers = triggers.map((trigger: Trigger) => 
      trigger.id === triggerId ? { ...trigger, active: !trigger.active } : trigger
    );
    onChange({ ...data, triggers: updatedTriggers });
  };

  const deleteTrigger = (triggerId: string) => {
    const updatedTriggers = triggers.filter((trigger: Trigger) => trigger.id !== triggerId);
    onChange({ ...data, triggers: updatedTriggers });
    toast({
      title: "Trigger gelöscht",
      description: "Der Trigger wurde erfolgreich entfernt."
    });
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation */}
      <div className="flex gap-1 p-1 bg-background/10 rounded-full backdrop-blur-sm border border-border/20">
        <button
          onClick={() => setActiveSubNav('create')}
          className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeSubNav === 'create'
              ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-primary shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Trigger erstellen
        </button>
        <button
          onClick={() => setActiveSubNav('manage')}
          className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeSubNav === 'manage'
              ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-primary shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Meine Trigger
        </button>
        <button
          onClick={() => setActiveSubNav('analyze')}
          className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeSubNav === 'analyze'
              ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-primary shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Analyse & Optimierung
        </button>
      </div>

      {/* Trigger Creation View */}
      {activeSubNav === 'create' && (
        <Card className="bg-background/5 border-border/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Trigger erstellen und verwalten
            </CardTitle>
          </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={triggerMode} onValueChange={(v) => setTriggerMode(v as 'basic' | 'advanced')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basis</TabsTrigger>
              <TabsTrigger value="advanced">Erweitert</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <div>
                <Label htmlFor="trigger-name">Trigger Name</Label>
                <Input
                  id="trigger-name"
                  value={currentTrigger.name}
                  onChange={(e) => setCurrentTrigger(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="z.B. Gen Z Reminder"
                />
              </div>

              {/* WENN Section */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">WENN...</Label>
                {currentTrigger.if.map((condition, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-background/10">
                    <Select
                      value={condition.field}
                      onValueChange={(value) => updateCondition(index, { field: value })}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Feld auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={condition.op}
                      onValueChange={(value) => updateCondition(index, { op: value })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Op" />
                      </SelectTrigger>
                      <SelectContent>
                        {operatorOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Input
                      value={condition.value}
                      onChange={(e) => updateCondition(index, { value: e.target.value })}
                      placeholder="Wert"
                      className="flex-1"
                    />

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCondition(index)}
                      disabled={currentTrigger.if.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addCondition} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Bedingung hinzufügen
                </Button>
              </div>

              {/* DANN Section */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">DANN...</Label>
                {currentTrigger.then.map((action, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-background/10">
                    <Select
                      value={action.action}
                      onValueChange={(value) => updateAction(index, { action: value })}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Aktion auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {actionOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {action.action === 'grant_xp' && (
                      <Input
                        type="number"
                        placeholder="XP Betrag"
                        value={action.params.amount || ''}
                        onChange={(e) => updateAction(index, { 
                          params: { ...action.params, amount: parseInt(e.target.value) || 0 }
                        })}
                        className="w-24"
                      />
                    )}

                    {action.action === 'apply_discount' && (
                      <Input
                        placeholder="Rabattcode"
                        value={action.params.code || ''}
                        onChange={(e) => updateAction(index, { 
                          params: { ...action.params, code: e.target.value }
                        })}
                        className="w-32"
                      />
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAction(index)}
                      disabled={currentTrigger.then.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addAction} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Aktion hinzufügen
                </Button>
              </div>

              <div>
                <Label htmlFor="description">Beschreibung (Optional)</Label>
                <Textarea
                  id="description"
                  value={currentTrigger.description}
                  onChange={(e) => setCurrentTrigger(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Beschreiben Sie den Zweck dieses Triggers..."
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={saveTrigger} className="flex-1">
                  Trigger speichern
                </Button>
                <Button variant="outline" onClick={testTrigger}>
                  <Eye className="w-4 h-4 mr-2" />
                  Vorschau testen
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="advanced">
              <div className="p-8 text-center text-muted-foreground">
                <p>Erweiterte Trigger-Konfiguration</p>
                <p className="text-sm mt-2">Hier können komplexere Regeln und JSON-basierte Trigger erstellt werden</p>
              </div>
            </TabsContent>
          </Tabs>

        </CardContent>
      </Card>
      )}

      {/* Trigger Management View */}
      {activeSubNav === 'manage' && (
        <Card className="bg-background/5 border-border/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Meine Trigger
            </CardTitle>
          </CardHeader>
          <CardContent>
            {triggers.length === 0 ? (
              <div className="text-center py-12">
                <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Keine Trigger vorhanden</h3>
                <p className="text-muted-foreground mb-4">
                  Erstellen Sie Ihren ersten Trigger, um automatisierte Aktionen zu definieren.
                </p>
                <Button onClick={() => setActiveSubNav('create')}>
                  Neuen Trigger erstellen
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-6 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                  <div>Name</div>
                  <div>Bedingungen</div>
                  <div>Aktionen</div>
                  <div>Aktiv</div>
                  <div>Zuletzt ausgelöst</div>
                  <div>Aktionen</div>
                </div>
                {triggers.map((trigger: Trigger) => (
                  <div key={trigger.id} className="grid grid-cols-6 gap-4 items-center p-3 rounded-lg bg-background/10">
                    <div>
                      <p className="font-medium">{trigger.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{trigger.description}</p>
                    </div>
                    <div className="text-sm">
                      <Badge variant="outline">{trigger.if.length}</Badge>
                    </div>
                    <div className="text-sm">
                      <Badge variant="outline">{trigger.then.length}</Badge>
                    </div>
                    <div>
                      <Switch 
                        checked={trigger.active} 
                        onCheckedChange={() => toggleTrigger(trigger.id)}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      vor 2 Std.
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setActiveSubNav('create')}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteTrigger(trigger.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Analytics View */}
      {activeSubNav === 'analyze' && (
        <Card className="bg-background/5 border-border/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Analyse & Optimierung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center p-6 rounded-lg bg-background/10">
                <div className="text-2xl font-bold text-primary">1,247</div>
                <div className="text-sm text-muted-foreground">Ausführungen (7T)</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/10">
                <div className="text-2xl font-bold text-primary">23.4%</div>
                <div className="text-sm text-muted-foreground">Click-Through-Rate</div>
              </div>
              <div className="text-center p-6 rounded-lg bg-background/10">
                <div className="text-2xl font-bold text-primary">8.7%</div>
                <div className="text-sm text-muted-foreground">Conversion Rate</div>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <h3 className="font-medium">Top Performing Trigger</h3>
              {triggers.length > 0 ? (
                <div className="p-4 rounded-lg bg-background/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{triggers[0].name}</p>
                      <p className="text-sm text-muted-foreground">{triggers[0].description}</p>
                    </div>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      Top Performer
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm mt-3">
                    <div>
                      <div className="font-medium">467</div>
                      <div className="text-muted-foreground">Ausführungen</div>
                    </div>
                    <div>
                      <div className="font-medium">31.2%</div>
                      <div className="text-muted-foreground">CTR</div>
                    </div>
                    <div>
                      <div className="font-medium">12.1%</div>
                      <div className="text-muted-foreground">Conversion</div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Keine Daten verfügbar. Erstellen Sie erst einen Trigger.</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Section B: Audience Matching */}
      <Card className="bg-background/5 border-border/20 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Zielgruppen-Matching
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {audienceMatch.map((match, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/10">
                <div className="flex items-center gap-3 flex-1">
                  <span className="font-medium min-w-0 flex-1">{match.segment}</span>
                  {match.badge && (
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                      {match.badge}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Progress 
                    value={match.score * 100} 
                    className="h-2 flex-1"
                  />
                  <span className="text-sm font-medium min-w-0">
                    {Math.round(match.score * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Basierend auf der Analyse von Nutzerinteraktionen und Trigger-Performance
          </p>
        </CardContent>
      </Card>

      {/* Section C: Filters */}
      <Card className="bg-background/5 border-border/20 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Filter & Einstellungen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="category-filter">Kategorie</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alle Kategorien">Alle Kategorien</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Tech">Tech</SelectItem>
                  <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="audience-filter">Zielgruppe</Label>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alle Zielgruppen">Alle Zielgruppen</SelectItem>
                  <SelectItem value="Gen Z">Gen Z</SelectItem>
                  <SelectItem value="Millennials">Millennials</SelectItem>
                  <SelectItem value="Gen X">Gen X</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Effektivität (mind. {effectiveness[0]}%)</Label>
            <Slider
              value={effectiveness}
              onValueChange={setEffectiveness}
              max={100}
              min={0}
              step={5}
              className="mt-2"
            />
          </div>

          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm font-medium">
              Erwartete Reichweite: ~{estimatedReach.toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TriggersTargeting;
