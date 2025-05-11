
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { getTriggersForUser, getTriggersForBrand, updateTrigger } from '@/services/mockHypocampusService';
import { ContextTrigger } from '@/types/hypocampus';
import { 
  Clock, 
  MapPin, 
  ActivityIcon, 
  CloudRain, 
  SmilePlus, 
  Zap, 
  Award, 
  Star, 
  Search,
  Users,
  Bell,
  ThumbsUp
} from 'lucide-react';

interface TriggerDashboardProps {
  userRole?: 'personal' | 'brand';
}

const TriggerDashboard: React.FC<TriggerDashboardProps> = ({ userRole = 'personal' }) => {
  const [triggers, setTriggers] = useState<ContextTrigger[]>([]);
  const [filteredTriggers, setFilteredTriggers] = useState<ContextTrigger[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchTriggers = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        let data;
        
        if (userRole === 'brand' && user.brand_id) {
          // Wenn Markenansicht und Nutzer hat eine Brand-ID
          data = await getTriggersForBrand(user.brand_id);
        } else {
          // Standard: Persönliche Trigger des Nutzers laden
          data = await getTriggersForUser(user.id);
        }
        
        setTriggers(data);
        setFilteredTriggers(data);
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
  }, [user, toast, userRole]);

  // Filter-Logik
  useEffect(() => {
    let result = [...triggers];
    
    // Textsuche
    if (searchQuery) {
      result = result.filter(
        trigger => 
          trigger.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          (trigger.description && trigger.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Kategorie-Filter
    if (categoryFilter !== 'all') {
      result = result.filter(trigger => trigger.category === categoryFilter);
    }
    
    // Status-Filter
    if (statusFilter !== 'all') {
      result = result.filter(trigger => {
        if (statusFilter === 'active') return trigger.active;
        if (statusFilter === 'inactive') return !trigger.active;
        return true;
      });
    }
    
    setFilteredTriggers(result);
  }, [triggers, searchQuery, categoryFilter, statusFilter]);

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

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setStatusFilter('all');
  };

  const getConditionIcon = (category: string) => {
    switch (category) {
      case 'time': return <Clock className="h-4 w-4 text-jillr-neonBlue" />;
      case 'location': return <MapPin className="h-4 w-4 text-jillr-neonGreen" />;
      case 'activity': return <ActivityIcon className="h-4 w-4 text-jillr-neonPurple" />;
      case 'weather': return <CloudRain className="h-4 w-4 text-jillr-neonBlue" />;
      case 'mood': return <SmilePlus className="h-4 w-4 text-jillr-neonPink" />;
      case 'social': return <Users className="h-4 w-4 text-jillr-neonBlue" />;
      case 'achievement': return <Award className="h-4 w-4 text-yellow-400" />;
      default: return <Star className="h-4 w-4 text-yellow-400" />;
    }
  };

  const getActionIcon = (actionType: string) => {
    if (actionType?.startsWith('reward_')) return <Award className="h-4 w-4 text-yellow-400" />;
    if (actionType?.startsWith('challenge_')) return <Star className="h-4 w-4 text-jillr-neonGreen" />;
    if (actionType?.startsWith('avatar_')) return <ActivityIcon className="h-4 w-4 text-jillr-neonPink" />;
    if (actionType?.startsWith('notification_')) return <Bell className="h-4 w-4 text-jillr-neonBlue" />;
    if (actionType?.startsWith('brand_')) return <ThumbsUp className="h-4 w-4 text-jillr-neonGreen" />;
    return <Zap className="h-4 w-4 text-jillr-neonPurple" />;
  };

  const getCategoryName = (category: string): string => {
    const categories: Record<string, string> = {
      'time': 'Zeit',
      'location': 'Ort',
      'activity': 'Aktivität',
      'weather': 'Wetter',
      'mood': 'Stimmung',
      'social': 'Social Media',
      'achievement': 'Erfolge'
    };
    
    return categories[category] || 'Sonstiges';
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
        <CardTitle className="text-xl text-white">
          {userRole === 'brand' ? 'Marken-Trigger' : 'Meine Trigger'}
        </CardTitle>
        <CardDescription>
          {filteredTriggers.length > 0
            ? `Du hast ${filteredTriggers.length} Trigger, davon ${filteredTriggers.filter(t => t.active).length} aktiv`
            : 'Du hast noch keine Trigger erstellt'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Trigger suchen..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow bg-jillr-darkBlue/40 border-gray-700"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex-1 min-w-[150px]">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Kategorien</SelectItem>
                  <SelectItem value="time">Zeit</SelectItem>
                  <SelectItem value="location">Ort</SelectItem>
                  <SelectItem value="activity">Aktivität</SelectItem>
                  <SelectItem value="weather">Wetter</SelectItem>
                  {userRole !== 'brand' && (
                    <>
                      <SelectItem value="mood">Stimmung</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="achievement">Erfolge</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1 min-w-[150px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Status</SelectItem>
                  <SelectItem value="active">Aktiv</SelectItem>
                  <SelectItem value="inactive">Inaktiv</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={resetFilters}
              className="flex-none"
              title="Filter zurücksetzen"
            >
              <Zap className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {filteredTriggers.length > 0 ? (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-3">
              {filteredTriggers.map((trigger) => (
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
                        {getCategoryName(trigger.category || '')}
                      </Badge>
                      <span className="text-xs text-gray-400">
                        {new Date(trigger.created_at).toLocaleDateString('de-DE')}
                      </span>
                      {trigger.brand_id && (
                        <Badge className="bg-jillr-neonPurple/20 text-jillr-neonPurple text-xs">
                          Marke
                        </Badge>
                      )}
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
                        {trigger.target_value?.type === 'social' && 'Social: '}
                        {trigger.target_value?.type === 'achievement' && 'Erfolg: '}
                        {trigger.target_value?.value || ''}
                        {trigger.target_value?.frequency > 1 && ` (${trigger.target_value.frequency}x täglich)`}
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
                        {trigger.action_type?.split('_')[0] === 'notification' && 'Benachrichtigung: '}
                        {trigger.action_type?.split('_')[0] === 'brand' && 'Marke: '}
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
              {searchQuery || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'Keine Trigger entsprechen den Filterkriterien.'
                : 'Du hast noch keine Trigger erstellt. Erstelle deinen ersten Trigger, um automatische Reaktionen zu definieren.'}
            </p>
            {(searchQuery || categoryFilter !== 'all' || statusFilter !== 'all') && (
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={resetFilters}
              >
                Filter zurücksetzen
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TriggerDashboard;
