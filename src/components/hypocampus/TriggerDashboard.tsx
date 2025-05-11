
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { getTriggersForUser, updateTrigger } from '@/services/mockHypocampusService';
import { ContextTrigger } from '@/types/hypocampus';
import { Clock, MapPin, ActivityIcon, CloudRain, SmilePlus, Zap, Award, Star } from 'lucide-react';

const TriggerDashboard: React.FC = () => {
  const [triggers, setTriggers] = useState<ContextTrigger[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchTriggers = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const data = await getTriggersForUser(user.id);
        setTriggers(data);
      } catch (error) {
        console.error('Error fetching triggers:', error);
        toast({
          title: "Fehler beim Laden der Trigger",
          description: "Deine Trigger konnten nicht geladen werden. Bitte versuche es später erneut.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTriggers();
  }, [user, toast]);

  const handleToggleTrigger = async (id: string, currentActive: boolean) => {
    try {
      await updateTrigger(id, { active: !currentActive });

      // Update local state
      setTriggers(triggers.map(trigger => 
        trigger.id === id ? { ...trigger, active: !currentActive } : trigger
      ));

      toast({
        title: `Trigger ${!currentActive ? 'aktiviert' : 'deaktiviert'}`,
        description: `Der Trigger wurde erfolgreich ${!currentActive ? 'aktiviert' : 'deaktiviert'}.`,
      });
    } catch (error) {
      console.error('Error updating trigger:', error);
      toast({
        title: "Fehler",
        description: "Der Status des Triggers konnte nicht geändert werden.",
        variant: "destructive"
      });
    }
  };

  const getConditionIcon = (category: string) => {
    switch (category) {
      case 'time': return <Clock className="h-4 w-4 text-jillr-neonBlue" />;
      case 'location': return <MapPin className="h-4 w-4 text-jillr-neonGreen" />;
      case 'activity': return <ActivityIcon className="h-4 w-4 text-jillr-neonPurple" />;
      case 'weather': return <CloudRain className="h-4 w-4 text-jillr-neonBlue" />;
      case 'mood': return <SmilePlus className="h-4 w-4 text-jillr-neonPink" />;
      default: return <Star className="h-4 w-4 text-yellow-400" />;
    }
  };

  const getActionIcon = (actionType: string) => {
    if (actionType.startsWith('reward_')) return <Award className="h-4 w-4 text-yellow-400" />;
    if (actionType.startsWith('challenge_')) return <Star className="h-4 w-4 text-jillr-neonGreen" />;
    if (actionType.startsWith('avatar_')) return <ActivityIcon className="h-4 w-4 text-jillr-neonPink" />;
    return <Zap className="h-4 w-4 text-jillr-neonPurple" />;
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl bg-jillr-dark border-jillr-neonBlue/30">
        <CardHeader>
          <CardTitle className="text-xl text-white">Meine Trigger</CardTitle>
          <CardDescription>Lädt...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl bg-jillr-dark border-jillr-neonBlue/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-white">Meine Trigger</CardTitle>
        <CardDescription>
          {triggers.length > 0
            ? `Du hast ${triggers.length} Trigger, davon ${triggers.filter(t => t.active).length} aktiv`
            : 'Du hast noch keine Trigger erstellt'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {triggers.length > 0 ? (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-3">
              {triggers.map((trigger) => (
                <div 
                  key={trigger.id} 
                  className={`p-3 rounded-lg border ${
                    trigger.active 
                      ? 'border-jillr-neonBlue/40 bg-jillr-neonBlue/5'
                      : 'border-gray-700 bg-jillr-darkBlue/30'
                  } flex justify-between items-center`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {trigger.category || 'Benutzerdefiniert'}
                      </Badge>
                      <span className="text-xs text-gray-400">
                        {new Date(trigger.created_at).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                    <p className="font-medium mb-2">{trigger.name || trigger.description || 'Kein Titel'}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded text-xs">
                        {getConditionIcon(trigger.category || '')}
                        <span>WENN</span>
                      </div>
                      <div className="text-xs text-gray-300">
                        {trigger.target_value?.type === 'time' && 'Uhrzeit: '}
                        {trigger.target_value?.type === 'location' && 'Ort: '}
                        {trigger.target_value?.type === 'activity' && 'Aktivität: '}
                        {trigger.target_value?.type === 'weather' && 'Wetter: '}
                        {trigger.target_value?.type === 'mood' && 'Stimmung: '}
                        {trigger.target_value?.value || ''}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded text-xs">
                        {getActionIcon(trigger.action_type)}
                        <span>DANN</span>
                      </div>
                      <div className="text-xs text-gray-300">
                        {trigger.action_type?.split('_')[0] === 'reward' && 'Belohnung: '}
                        {trigger.action_type?.split('_')[0] === 'challenge' && 'Challenge: '}
                        {trigger.action_type?.split('_')[0] === 'avatar' && 'Avatar: '}
                        {trigger.action_type?.split('_')[1] || ''}
                      </div>
                    </div>
                  </div>
                  <Switch 
                    checked={trigger.active}
                    onCheckedChange={() => handleToggleTrigger(trigger.id, trigger.active)}
                    className="ml-2"
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">
              Du hast noch keine Trigger erstellt. Erstelle deinen ersten Trigger, um automatische Reaktionen zu definieren.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TriggerDashboard;
