
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { createTrigger, getRewards } from '@/services/mockHypocampusService';
import { ContextTrigger, Reward } from '@/types/hypocampus';

// Erweiterte Trigger-Bedingungen
const whenOptions = [
  // Zeit-basierte Trigger
  { value: 'time_morning', label: 'Morgens (6-11 Uhr)', category: 'time' },
  { value: 'time_noon', label: 'Mittags (11-14 Uhr)', category: 'time' },
  { value: 'time_evening', label: 'Abends (14-22 Uhr)', category: 'time' },
  { value: 'time_night', label: 'Nachts (22-6 Uhr)', category: 'time' },
  { value: 'time_weekend', label: 'Am Wochenende', category: 'time' },
  { value: 'time_weekday', label: 'Wochentags', category: 'time' },
  
  // Orts-basierte Trigger
  { value: 'location_home', label: 'Zu Hause', category: 'location' },
  { value: 'location_work', label: 'Auf Arbeit', category: 'location' },
  { value: 'location_shopping', label: 'Im Geschäft', category: 'location' },
  { value: 'location_gym', label: 'Im Fitnessstudio', category: 'location' },
  { value: 'location_restaurant', label: 'Im Restaurant', category: 'location' },
  
  // Aktivitäts-basierte Trigger
  { value: 'activity_camera', label: 'Kamera geöffnet', category: 'activity' },
  { value: 'activity_challenge', label: 'Challenge gestartet', category: 'activity' },
  { value: 'activity_upload', label: 'Inhalt hochgeladen', category: 'activity' },
  { value: 'activity_browse', label: 'App länger als 10 Min genutzt', category: 'activity' },
  { value: 'activity_sharing', label: 'Inhalte geteilt', category: 'activity' },
  
  // Wetter-basierte Trigger
  { value: 'weather_sunny', label: 'Sonniges Wetter', category: 'weather' },
  { value: 'weather_rainy', label: 'Regnerisches Wetter', category: 'weather' },
  { value: 'weather_cold', label: 'Kaltes Wetter (<10°C)', category: 'weather' },
  { value: 'weather_warm', label: 'Warmes Wetter (>20°C)', category: 'weather' },
  
  // Stimmungs-basierte Trigger
  { value: 'mood_happy', label: 'Gute Stimmung', category: 'mood' },
  { value: 'mood_tired', label: 'Müde', category: 'mood' },
  { value: 'mood_motivated', label: 'Motiviert', category: 'mood' },
  { value: 'mood_creative', label: 'Kreativ', category: 'mood' },
  
  // Social-basierte Trigger
  { value: 'social_followers', label: 'Neue Follower', category: 'social' },
  { value: 'social_likes', label: 'Viele Likes erhalten', category: 'social' },
  { value: 'social_comments', label: 'Kommentare erhalten', category: 'social' },
  
  // Erfolgs-basierte Trigger
  { value: 'achievement_level', label: 'Level aufgestiegen', category: 'achievement' },
  { value: 'achievement_badge', label: 'Badge erhalten', category: 'achievement' },
  { value: 'achievement_streak', label: 'Tagesstreak erreicht', category: 'achievement' },
];

// Erweiterte Trigger-Aktionen
const thenOptions = [
  // XP-Belohnungen
  { value: 'reward_xp_small', label: 'Kleine XP-Belohnung (25 XP)', category: 'reward' },
  { value: 'reward_xp_medium', label: 'Mittlere XP-Belohnung (50 XP)', category: 'reward' },
  { value: 'reward_xp_large', label: 'Große XP-Belohnung (100 XP)', category: 'reward' },
  { value: 'reward_xp_booster', label: 'XP-Booster (48 Stunden)', category: 'reward' },
  
  // Challenge-bezogene Aktionen
  { value: 'challenge_suggest', label: 'Challenge vorschlagen', category: 'challenge' },
  { value: 'challenge_start', label: 'Challenge automatisch starten', category: 'challenge' },
  { value: 'challenge_reminder', label: 'Challenge-Erinnerung senden', category: 'challenge' },
  
  // Avatar-bezogene Aktionen
  { value: 'avatar_change', label: 'Avatar verändert sich', category: 'avatar' },
  { value: 'avatar_accessory', label: 'Avatar-Accessoire freischalten', category: 'avatar' },
  
  // Benachrichtigungen
  { value: 'notification_motivational', label: 'Motivierende Nachricht senden', category: 'notification' },
  { value: 'notification_tip', label: 'Tipp des Tages senden', category: 'notification' },
  
  // Marken-spezifische Aktionen
  { value: 'brand_coupon', label: 'Rabatt-Coupon senden', category: 'brand' },
  { value: 'brand_exclusive', label: 'Exklusiven Inhalt freischalten', category: 'brand' },
  
  // Sonstige Aktionen
  { value: 'reward_show', label: 'Belohnung anzeigen', category: 'other' },
  { value: 'share_achievement', label: 'Erfolg automatisch teilen', category: 'other' },
];

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
  const [isAdvanced, setIsAdvanced] = useState(false);
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
        name: description || `${getConditionLabel(triggerCondition)} → ${getActionLabel(triggerAction)}`,
        description: description || `Auto-generated trigger for ${conditionType} ${conditionValue}`,
        category: conditionType,
        condition_type: triggerCondition,
        target_value: { 
          type: conditionType,
          value: conditionValue,
          // Erweiterte Eigenschaften für fortgeschrittene Trigger
          frequency: frequency[0],
          priority: priority[0],
          requires_multiple_conditions: requiresMultipleConditions
        },
        action_type: triggerAction,
        reward_id: rewardId,
        active: true,
        user_id: user.id,
        // Für Marken-Trigger
        ...(triggerType === 'brand' && user.brand_id ? { brand_id: user.brand_id } : {})
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
      setActiveTab('basic');
      setIsAdvanced(false);
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

  const getConditionLabel = (value: string) => {
    return whenOptions.find(option => option.value === value)?.label || value;
  };

  const getActionLabel = (value: string) => {
    return thenOptions.find(option => option.value === value)?.label || value;
  };
  
  const filteredWhenOptions = triggerType === 'brand' 
    ? whenOptions.filter(o => ['location', 'time', 'weather', 'activity'].includes(o.category)) 
    : whenOptions;
    
  const filteredThenOptions = triggerType === 'brand'
    ? thenOptions.filter(o => ['reward', 'challenge', 'brand', 'notification'].includes(o.category))
    : thenOptions;

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
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-300">WENN...</h3>
              <Select value={triggerCondition} onValueChange={setTriggerCondition}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Wähle eine Bedingung" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Zeit</SelectLabel>
                    {filteredWhenOptions.filter(o => o.category === 'time').map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Ort</SelectLabel>
                    {filteredWhenOptions.filter(o => o.category === 'location').map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Aktivität</SelectLabel>
                    {filteredWhenOptions.filter(o => o.category === 'activity').map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Wetter</SelectLabel>
                    {filteredWhenOptions.filter(o => o.category === 'weather').map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectGroup>
                  {triggerType !== 'brand' && (
                    <>
                      <SelectGroup>
                        <SelectLabel>Stimmung</SelectLabel>
                        {filteredWhenOptions.filter(o => o.category === 'mood').map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Social Media</SelectLabel>
                        {filteredWhenOptions.filter(o => o.category === 'social').map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Erfolge</SelectLabel>
                        {filteredWhenOptions.filter(o => o.category === 'achievement').map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectGroup>
                    </>
                  )}
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
                    {filteredThenOptions.filter(o => o.category === 'reward').map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Challenges</SelectLabel>
                    {filteredThenOptions.filter(o => o.category === 'challenge').map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectGroup>
                  {triggerType !== 'brand' && (
                    <SelectGroup>
                      <SelectLabel>Avatar</SelectLabel>
                      {filteredThenOptions.filter(o => o.category === 'avatar').map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectGroup>
                  )}
                  <SelectGroup>
                    <SelectLabel>Benachrichtigungen</SelectLabel>
                    {filteredThenOptions.filter(o => o.category === 'notification').map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectGroup>
                  {triggerType === 'brand' && (
                    <SelectGroup>
                      <SelectLabel>Marken-Aktionen</SelectLabel>
                      {filteredThenOptions.filter(o => o.category === 'brand').map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectGroup>
                  )}
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
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-300">Häufigkeit</h3>
                <span className="text-sm text-gray-400">{frequency[0]}x pro Tag</span>
              </div>
              <Slider
                value={frequency}
                onValueChange={setFrequency}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-300">Priorität</h3>
                <span className="text-sm text-gray-400">{priority[0]}/10</span>
              </div>
              <Slider
                value={priority}
                onValueChange={setPriority}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-300">Mehrfache Bedingungen</h3>
                <Switch 
                  checked={requiresMultipleConditions}
                  onCheckedChange={setRequiresMultipleConditions}
                />
              </div>
              <p className="text-xs text-gray-400">
                Wenn aktiviert, muss dieser Trigger zusammen mit anderen Bedingungen erfüllt sein
              </p>
            </div>
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
