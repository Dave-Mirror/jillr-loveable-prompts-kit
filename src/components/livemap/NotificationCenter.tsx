
import React from 'react';
import { Bell, Gift, Package, Target, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { useLiveMap } from '@/hooks/useLiveMap';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const NotificationCenter = () => {
  const { notifications, clearNotification, notificationSettings, updateNotificationSettings } = useLiveMap();
  const navigate = useNavigate();

  const getIconForNotificationType = (type: string) => {
    switch (type) {
      case 'easteregg': return <Gift className="text-yellow-400" />;
      case 'drop': return <Package className="text-blue-400" />;
      case 'challenge': return <Target className="text-red-400" />;
      case 'teamevent': return <Users className="text-purple-400" />;
      default: return <Bell />;
    }
  };

  const handleActionClick = (notification: any) => {
    if (notification.challengeId) {
      navigate(`/challenge/${notification.challengeId}`);
    } else if (notification.navigateTo) {
      navigate(notification.navigateTo);
    }
  };

  return (
    <div className="space-y-6 py-2">
      <div>
        <h3 className="text-lg font-semibold mb-2">Notifications</h3>
        
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {notifications.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <Bell className="h-10 w-10 mx-auto mb-2 opacity-30" />
              <p>No new notifications</p>
              <p className="text-sm">We'll notify you when there are new events nearby!</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="relative bg-card p-3 rounded-lg">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={() => clearNotification(notification.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
                
                <div className="flex gap-3">
                  <div className="p-2 rounded-full bg-muted">
                    {getIconForNotificationType(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(notification.time).toLocaleString()}
                    </p>
                    
                    {notification.actionText && (
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-sm mt-1"
                        onClick={() => handleActionClick(notification)}
                      >
                        {notification.actionText}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Notification Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="new-drops">New product drops</Label>
              <p className="text-xs text-muted-foreground">Get notified about exclusive drops nearby</p>
            </div>
            <Switch
              id="new-drops"
              checked={notificationSettings.newDrops}
              onCheckedChange={(checked) => updateNotificationSettings('newDrops', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="new-challenges">New challenges</Label>
              <p className="text-xs text-muted-foreground">Get notified about new challenges</p>
            </div>
            <Switch
              id="new-challenges"
              checked={notificationSettings.newChallenges}
              onCheckedChange={(checked) => updateNotificationSettings('newChallenges', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="nearby-eastereggs">Nearby easter eggs</Label>
              <p className="text-xs text-muted-foreground">Get notified when you're near an easter egg</p>
            </div>
            <Switch
              id="nearby-eastereggs"
              checked={notificationSettings.nearbyEasterEggs}
              onCheckedChange={(checked) => updateNotificationSettings('nearbyEasterEggs', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="team-events">Team events</Label>
              <p className="text-xs text-muted-foreground">Get notified about team challenges and battles</p>
            </div>
            <Switch
              id="team-events"
              checked={notificationSettings.teamEvents}
              onCheckedChange={(checked) => updateNotificationSettings('teamEvents', checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
