
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { createTrigger, getRewards } from '@/services/mockHypocampusService';
import { ContextTrigger, Reward } from '@/types/hypocampus';

// Trigger condition options
const whenOptions = [
  { value: 'time_morning', label: 'Morgens (6-11 Uhr)' },
  { value: 'time_noon', label: 'Mittags (11-14 Uhr)' },
  { value: 'time_evening', label: 'Abends (14-22 Uhr)' },
  { value: 'time_night', label: 'Nachts (22-6 Uhr)' },
  { value: 'location_home', label: 'Zu Hause' },
  { value: 'location_work', label: 'Auf Arbeit' },
  { value: 'location_shopping', label: 'Im Geschäft' },
  { value: 'activity_camera', label: 'Kamera geöffnet' },
  { value: 'activity_challenge', label: 'Challenge gestartet' },
  { value: 'activity_upload', label: 'Inhalt hochgeladen' },
  { value: 'weather_sunny', label: 'Sonniges Wetter' },
  { value: 'weather_rainy', label: 'Regnerisches Wetter' },
  { value: 'mood_happy', label: 'Gute Stimmung' },
  { value: 'mood_tired', label: 'Müde' }
];

// Trigger action options
const thenOptions = [
  { value: 'reward_xp_small', label: 'Kleine XP-Belohnung (25 XP)' },
  { value: 'reward_xp_medium', label: 'Mittlere XP-Belohnung (50 XP)' },
  { value: 'reward_xp_large', label: 'Große XP-Belohnung (100 XP)' },
  { value: 'challenge_suggest', label: 'Challenge vorschlagen' },
  { value: 'challenge_start', label: 'Challenge automatisch starten' },
  { value: 'avatar_change', label: 'Avatar verändert sich' },
  { value: 'reward_show', label: 'Belohnung anzeigen' }
];

const TriggerConfigurator: React.FC = () => {
  const [triggerCondition, setTriggerCondition] = useState('');
  const [triggerAction, setTriggerAction] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rewards, setRewards] = useState<Reward[]>([]);
  
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
      // Parse the condition type and value
      const [conditionType, conditionValue] = triggerCondition.split('_');
      
      // Parse action type and potential reward
      const [actionType, actionValue, actionAmount] = triggerAction.split('_');
      
      // Find matching reward if this is a reward action
      let rewardId: string | undefined;
      if (actionType === 'reward') {
        const matchingReward = rewards.find(r => 
          r.reward_type === 'xp' && 
          ((actionValue === 'xp_small' && r.value === 25) ||
           (actionValue === 'xp_medium' && r.value === 50) ||
           (actionValue === 'xp_large' && r.value === 100))
        );
        rewardId = matchingReward?.id;
      }
      
      // Prepare trigger object
      const newTrigger: Omit<ContextTrigger, 'id' | 'created_at' | 'updated_at'> = {
        user_id: user.id,
        name: description || `${getConditionLabel(triggerCondition)} → ${getActionLabel(triggerAction)}`,
        description: description || `Auto-generated trigger for ${conditionType} ${conditionValue}`,
        category: conditionType,
        condition_type: triggerCondition,
        target_value: { 
          type: conditionType,
          value: conditionValue
        },
        action_type: triggerAction,
        reward_id: rewardId,
        active: true
      };

      // Save trigger using our service
      await createTrigger(newTrigger);

      toast({
        title: "Trigger gespeichert",
        description: "Dein persönlicher Trigger wurde erfolgreich erstellt.",
      });

      // Reset the form
      setTriggerCondition('');
      setTriggerAction('');
      setDescription('');
      
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

  const getConditionLabel = (value: string) => {
    return whenOptions.find(option => option.value === value)?.label || value;
  };

  const getActionLabel = (value: string) => {
    return thenOptions.find(option => option.value === value)?.label || value;
  };

  return (
    <Card className="w-full max-w-2xl bg-jillr-dark border-jillr-neonPurple/30 hover:border-jillr-neonPurple/50 transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-white">Meine Trigger & Belohnungen</CardTitle>
        <CardDescription>
          Erstelle automatisierte Reaktionen basierend auf deinem Verhalten und Kontext
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300">WENN...</h3>
          <Select value={triggerCondition} onValueChange={setTriggerCondition}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Wähle eine Bedingung" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Zeit</SelectLabel>
                {whenOptions.filter(o => o.value.startsWith('time_')).map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Ort</SelectLabel>
                {whenOptions.filter(o => o.value.startsWith('location_')).map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Aktivität</SelectLabel>
                {whenOptions.filter(o => o.value.startsWith('activity_')).map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Wetter</SelectLabel>
                {whenOptions.filter(o => o.value.startsWith('weather_')).map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Stimmung</SelectLabel>
                {whenOptions.filter(o => o.value.startsWith('mood_')).map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300">DANN...</h3>
          <Select value={triggerAction} onValueChange={setTriggerAction}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Wähle eine Aktion" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Belohnungen</SelectLabel>
                {thenOptions.filter(o => o.value.startsWith('reward_')).map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Challenges</SelectLabel>
                {thenOptions.filter(o => o.value.startsWith('challenge_')).map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Avatar</SelectLabel>
                {thenOptions.filter(o => o.value.startsWith('avatar_')).map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300">Beschreibung (Optional)</h3>
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
      </CardContent>
    </Card>
  );
};

export default TriggerConfigurator;
