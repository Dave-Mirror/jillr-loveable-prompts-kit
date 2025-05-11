
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';

// This component would be used in the brand dashboard
// For demo purposes, we'll include brand selection in this component

const whenOptions = [
  { value: 'store_visit', label: 'Store besucht' },
  { value: 'app_open_time', label: 'App zu bestimmter Zeit geöffnet' },
  { value: 'level_reached', label: 'Level erreicht' },
  { value: 'brand_interaction', label: 'Mit Marke interagiert' },
  { value: 'challenge_completed', label: 'Challenge abgeschlossen' },
  { value: 'product_scanned', label: 'Produkt gescannt' }
];

const thenOptions = [
  { value: 'show_challenge', label: 'Challenge anzeigen' },
  { value: 'send_reward', label: 'Belohnung senden' },
  { value: 'start_minigame', label: 'Minispiel starten' },
  { value: 'unlock_content', label: 'Exklusiven Inhalt freischalten' },
  { value: 'special_notification', label: 'Spezielle Benachrichtigung' }
];

// Mock brands for demo
const mockBrands = [
  { id: 'brand-1', name: 'SportBrand' },
  { id: 'brand-2', name: 'FashionCo' },
  { id: 'brand-3', name: 'BeautyWorld' }
];

const BrandTriggerConfigurator: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [triggerCondition, setTriggerCondition] = useState('');
  const [triggerAction, setTriggerAction] = useState('');
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('');
  const [selectedTab, setSelectedTab] = useState('create');
  const [triggers, setTriggers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();

  const handleSaveTrigger = async () => {
    if (!selectedBrand || !triggerCondition || !triggerAction) {
      toast({
        title: "Fehlende Angaben",
        description: "Bitte fülle alle erforderlichen Felder aus.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create condition and action objects
      const conditionObject = {
        type: triggerCondition.split('_')[0],
        value: triggerCondition.split('_')[1] || triggerCondition,
        original: triggerCondition,
        location: locationName || undefined
      };
      
      const actionObject = {
        type: triggerAction.split('_')[0],
        value: triggerAction.split('_')[1] || triggerAction,
        original: triggerAction
      };

      // In a real app, we would use the actual brand ID from authentication
      // For demo, we'll use the mock brand ID
      const { error } = await supabase.from('context_triggers').insert({
        brand_id: selectedBrand,
        created_by: 'brand',
        trigger_condition: conditionObject,
        trigger_action: actionObject,
        description: description || `${getConditionLabel(triggerCondition)} → ${getActionLabel(triggerAction)}`,
        active: true
      });

      if (error) throw error;

      toast({
        title: "Trigger erstellt",
        description: "Der Brand-Trigger wurde erfolgreich erstellt.",
      });

      // Reset form
      setTriggerCondition('');
      setTriggerAction('');
      setDescription('');
      setLocationName('');
      
      // Reload triggers
      loadTriggers(selectedBrand);
      
    } catch (error) {
      console.error('Error saving brand trigger:', error);
      toast({
        title: "Fehler beim Speichern",
        description: "Der Trigger konnte nicht gespeichert werden.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadTriggers = async (brandId: string) => {
    if (!brandId) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('context_triggers')
        .select('*')
        .eq('brand_id', brandId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setTriggers(data || []);
    } catch (error) {
      console.error('Error loading brand triggers:', error);
      toast({
        title: "Fehler beim Laden",
        description: "Die Trigger konnten nicht geladen werden.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTrigger = async (id: string, currentActive: boolean) => {
    try {
      const { error } = await supabase
        .from('context_triggers')
        .update({ active: !currentActive })
        .eq('id', id);

      if (error) throw error;

      setTriggers(triggers.map(trigger => 
        trigger.id === id ? { ...trigger, active: !currentActive } : trigger
      ));

      toast({
        title: `Trigger ${!currentActive ? 'aktiviert' : 'deaktiviert'}`,
        description: `Der Trigger wurde erfolgreich ${!currentActive ? 'aktiviert' : 'deaktiviert'}.`,
      });
    } catch (error) {
      console.error('Error toggling trigger:', error);
    }
  };

  const getConditionLabel = (value: string) => {
    return whenOptions.find(option => option.value === value)?.label || value;
  };

  const getActionLabel = (value: string) => {
    return thenOptions.find(option => option.value === value)?.label || value;
  };

  return (
    <Card className="w-full max-w-2xl bg-jillr-dark border-jillr-neonPurple/30">
      <CardHeader>
        <CardTitle className="text-xl text-white">Automatisierte Trigger</CardTitle>
        <CardDescription>
          Erstelle automatisierte Trigger für Nutzer basierend auf ihrem Verhalten
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Brand auswählen</h3>
            <Select value={selectedBrand} onValueChange={(value) => {
              setSelectedBrand(value);
              loadTriggers(value);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Wähle eine Marke" />
              </SelectTrigger>
              <SelectContent>
                {mockBrands.map(brand => (
                  <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedBrand && (
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="w-full">
                <TabsTrigger value="create" className="flex-1">Trigger erstellen</TabsTrigger>
                <TabsTrigger value="manage" className="flex-1">Trigger verwalten</TabsTrigger>
              </TabsList>
              
              <TabsContent value="create" className="space-y-4 pt-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-2">WENN Nutzer...</h3>
                  <Select value={triggerCondition} onValueChange={setTriggerCondition}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wähle eine Bedingung" />
                    </SelectTrigger>
                    <SelectContent>
                      {whenOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {triggerCondition === 'store_visit' && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Standort/Filiale</h3>
                    <Input 
                      placeholder="Name des Standorts" 
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      className="bg-jillr-darkBlue border-gray-700"
                    />
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-2">DANN...</h3>
                  <Select value={triggerAction} onValueChange={setTriggerAction}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wähle eine Aktion" />
                    </SelectTrigger>
                    <SelectContent>
                      {thenOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Beschreibung (Optional)</h3>
                  <Input 
                    placeholder="Beschreibung für diesen Trigger" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-jillr-darkBlue border-gray-700"
                  />
                </div>

                <Button 
                  onClick={handleSaveTrigger} 
                  disabled={isLoading || !triggerCondition || !triggerAction} 
                  className="w-full bg-gradient-to-r from-jillr-neonPurple to-jillr-neonBlue"
                >
                  {isLoading ? 'Wird gespeichert...' : 'Trigger speichern'}
                </Button>
              </TabsContent>
              
              <TabsContent value="manage" className="pt-4">
                {isLoading ? (
                  <p className="text-center py-4">Lade Trigger...</p>
                ) : triggers.length > 0 ? (
                  <div className="space-y-3">
                    {triggers.map(trigger => (
                      <div 
                        key={trigger.id} 
                        className={`p-3 rounded-lg border ${
                          trigger.active 
                            ? 'border-jillr-neonGreen/40 bg-jillr-neonGreen/5'
                            : 'border-gray-700 bg-jillr-darkBlue/30'
                        }`}
                      >
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{trigger.description}</h4>
                            <p className="text-sm text-gray-400">
                              Erstellt am {new Date(trigger.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{trigger.active ? 'Aktiv' : 'Inaktiv'}</span>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleToggleTrigger(trigger.id, trigger.active)}
                            >
                              {trigger.active ? 'Deaktivieren' : 'Aktivieren'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-4 text-gray-400">
                    Keine Trigger gefunden. Erstelle einen neuen Trigger.
                  </p>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandTriggerConfigurator;
