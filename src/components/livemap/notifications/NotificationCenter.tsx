
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Bell, Clock, Trash2, BellOff, BellRing } from 'lucide-react';
import { Notification, NotificationSettings } from '@/types/livemap';
import { useLiveMap } from '@/hooks/useLiveMap';
import { Badge } from '@/components/ui/badge';
import { format, formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const NotificationCenter: React.FC = () => {
  const { notifications, clearNotification, notificationSettings, updateNotificationSettings } = useLiveMap();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [view, setView] = useState<'notifications' | 'settings'>('notifications');

  const handleNotificationAction = (notification: Notification) => {
    if (notification.navigateTo) {
      navigate(notification.navigateTo);
    } else if (notification.challengeId) {
      navigate(`/challenge/${notification.challengeId}`);
    }
    clearNotification(notification.id);
  };

  const handleClearAll = () => {
    notifications.forEach(notification => {
      clearNotification(notification.id);
    });
    toast({
      title: "Alle Benachrichtigungen gelöscht",
      description: "Deine Benachrichtigungsliste wurde geleert.",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'drop': return <Badge variant="default" className="bg-blue-500">Drop</Badge>;
      case 'challenge': return <Badge variant="default" className="bg-red-500">Challenge</Badge>;
      case 'easteregg': return <Badge variant="default" className="bg-yellow-500">Easter Egg</Badge>;
      case 'teamevent': return <Badge variant="default" className="bg-purple-500">Team Event</Badge>;
      default: return <Badge variant="default" className="bg-jillr-neonPurple">Jillr</Badge>;
    }
  };

  return (
    <Card className="bg-jillr-dark border-jillr-border">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="h-5 w-5 text-jillr-neonPurple" />
          Benachrichtigungen
        </CardTitle>
        
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("text-sm", view === 'notifications' && "bg-jillr-darkAccent")}
            onClick={() => setView('notifications')}
          >
            <BellRing className="h-4 w-4 mr-1" />
            Mitteilungen
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn("text-sm", view === 'settings' && "bg-jillr-darkAccent")}
            onClick={() => setView('settings')}
          >
            <BellOff className="h-4 w-4 mr-1" />
            Einstellungen
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        {view === 'notifications' ? (
          <>
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mb-2 opacity-20" />
                <p className="text-muted-foreground">
                  Keine Benachrichtigungen vorhanden
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                {notifications.map((notification) => (
                  <div key={notification.id} className="relative bg-jillr-darkAccent p-3 rounded-lg">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {getNotificationIcon(notification.type)}
                          <h4 className="font-semibold">{notification.title}</h4>
                        </div>
                        <p className="text-sm mt-1 text-gray-300">{notification.message}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDistanceToNow(new Date(notification.time), { addSuffix: true })}
                          </span>
                          <Button 
                            variant="default" 
                            size="sm" 
                            onClick={() => handleNotificationAction(notification)}
                            className="text-xs"
                          >
                            {notification.actionText}
                          </Button>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6 absolute top-2 right-2"
                        onClick={() => clearNotification(notification.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Passe deine Benachrichtigungseinstellungen an, um nur für dich relevante Mitteilungen zu erhalten.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm flex items-center gap-2">
                  <Badge variant="default" className="bg-blue-500 h-5">Drop</Badge>
                  Neue Product Drops
                </label>
                <Switch 
                  checked={notificationSettings.newDrops}
                  onCheckedChange={(checked) => updateNotificationSettings('newDrops', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm flex items-center gap-2">
                  <Badge variant="default" className="bg-red-500 h-5">Challenge</Badge>
                  Neue Challenges
                </label>
                <Switch 
                  checked={notificationSettings.newChallenges}
                  onCheckedChange={(checked) => updateNotificationSettings('newChallenges', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm flex items-center gap-2">
                  <Badge variant="default" className="bg-yellow-500 h-5">Easter Egg</Badge>
                  Easter Eggs in der Nähe
                </label>
                <Switch 
                  checked={notificationSettings.nearbyEasterEggs}
                  onCheckedChange={(checked) => updateNotificationSettings('nearbyEasterEggs', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm flex items-center gap-2">
                  <Badge variant="default" className="bg-purple-500 h-5">Team</Badge>
                  Team Events
                </label>
                <Switch 
                  checked={notificationSettings.teamEvents}
                  onCheckedChange={(checked) => updateNotificationSettings('teamEvents', checked)}
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      {view === 'notifications' && notifications.length > 0 && (
        <CardFooter className="border-t border-jillr-border pt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={handleClearAll}
          >
            <Trash2 className="h-3 w-3 mr-2" />
            Alle löschen
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default NotificationCenter;
