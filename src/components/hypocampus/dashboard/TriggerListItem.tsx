
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
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
  Users,
  Bell,
  ThumbsUp
} from 'lucide-react';

interface TriggerListItemProps {
  trigger: ContextTrigger;
  onToggle: (id: string, active: boolean) => void;
}

const TriggerListItem: React.FC<TriggerListItemProps> = ({ trigger, onToggle }) => {
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

  return (
    <div 
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
        onCheckedChange={() => onToggle(trigger.id, trigger.active)}
        className="ml-2"
      />
    </div>
  );
};

export default TriggerListItem;
