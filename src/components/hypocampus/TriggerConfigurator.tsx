
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { getRewards } from '@/services/mockHypocampusService';
import { Reward } from '@/types/hypocampus';
import TriggerBasicSettings from './TriggerBasicSettings';
import TriggerAdvancedSettings from './TriggerAdvancedSettings';
import { saveTrigger } from './services/triggerService';

interface TriggerConfiguratorProps {
  triggerType?: 'personal' | 'brand';
}

const TriggerConfigurator: React.FC<TriggerConfiguratorProps> = ({ triggerType = 'personal' }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [triggerCondition, setTriggerCondition] = useState('');
  const [triggerAction, setTriggerAction] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [frequency, setFrequency] = useState<number[]>([1]); // Einmal pro Tag Standardwert
  const [priority, setPriority] = useState<number[]>([5]); // Mittlere Priorität Standardwert
  const [requiresMultipleConditions, setRequiresMultipleConditions] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Load available rewards
    const loadRewards = async () => {
      try {
        const rewardsData = await getRewards();
        setRewards(rewardsData);
      } catch (err) {
        console.error('Failed to load rewards:', err);
      }
    };
    
    loadRewards();
  }, []);

  const handleSaveTrigger = async () => {
    if (!triggerCondition || !triggerAction) {
      toast({
        title: "Fehlende Angaben",
        description: "Bitte wähle Bedingung und Aktion aus.",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Nicht angemeldet",
        description: "Bitte melde dich an, um Trigger zu speichern.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      await saveTrigger({
        user,
        triggerCondition,
        triggerAction,
        description,
        frequency: frequency[0],
        priority: priority[0],
        requiresMultipleConditions,
        triggerType,
        rewards
      });

      toast({
        title: "Trigger gespeichert",
        description: "Dein persönlicher Trigger wurde erfolgreich erstellt.",
      });

      // Reset the form
      setTriggerCondition('');
      setTriggerAction('');
      setDescription('');
      setActiveTab('basic');
      setFrequency([1]);
      setPriority([5]);
      setRequiresMultipleConditions(false);
      
    } catch (error) {
      console.error('Error saving trigger:', error);
      toast({
        title: "Fehler beim Speichern",
        description: "Der Trigger konnte nicht gespeichert werden. Bitte versuche es später erneut.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl bg-jillr-dark border-jillr-neonPurple/30 hover:border-jillr-neonPurple/50 transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-white">
          {triggerType === 'brand' ? 'Marken-Trigger erstellen' : 'Meine Trigger & Belohnungen'}
        </CardTitle>
        <CardDescription>
          Erstelle automatisierte Reaktionen basierend auf {triggerType === 'brand' ? 'Nutzerverhalten' : 'deinem Verhalten'} und Kontext
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Basis</TabsTrigger>
            <TabsTrigger value="advanced">Erweitert</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-6">
            <TriggerBasicSettings 
              triggerCondition={triggerCondition}
              setTriggerCondition={setTriggerCondition}
              triggerAction={triggerAction}
              setTriggerAction={setTriggerAction}
              description={description}
              setDescription={setDescription}
              triggerType={triggerType}
            />
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <TriggerAdvancedSettings 
              frequency={frequency}
              setFrequency={setFrequency}
              priority={priority}
              setPriority={setPriority}
              requiresMultipleConditions={requiresMultipleConditions}
              setRequiresMultipleConditions={setRequiresMultipleConditions}
            />
          </TabsContent>
        </Tabs>

        <Button 
          onClick={handleSaveTrigger} 
          disabled={isLoading || !triggerCondition || !triggerAction} 
          className="w-full bg-gradient-to-r from-jillr-neonPurple to-jillr-neonBlue"
        >
          {isLoading ? 'Wird gespeichert...' : 'Trigger speichern'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TriggerConfigurator;
