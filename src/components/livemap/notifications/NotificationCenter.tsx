
import React from 'react';
import { useLiveMap } from '@/hooks/useLiveMap';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Gift, Package, Target, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotificationCenter = () => {
  const { 
    notifications, 
    clearNotification, 
    notificationSettings, 
    updateNotificationSettings 
  } = useLiveMap();
  const navigate = useNavigate();

  const getIconForType = (type: string) => {
    switch (type) {
      case 'easteregg': return <Gift className="h-5 w-5 text-yellow-500" />;
      case 'drop': return <Package className="h-5 w-5 text-blue-500" />;
      case 'challenge': return <Target className="h-5 w-5 text-red-500" />;
      case 'teamevent': return <Users className="h-5 w-5 text-purple-500" />;
      default: return <Gift className="h-5 w-5" />;
    }
  };

  const handleNotificationAction = (notification: any) => {
    if (notification.navigateTo) {
      navigate(notification.navigateTo);
    } else if (notification.challengeId) {
      navigate(`/challenge/${notification.challengeId}`);
    }
    clearNotification(notification.id);
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    
    // Less than a minute
    if (diffMs < 60000) {
      return 'Just now';
    }
    
    // Less than an hour
    if (diffMs < 3600000) {
      const minutes = Math.floor(diffMs / 60000);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    // Less than a day
    if (diffMs < 86400000) {
      const hours = Math.floor(diffMs / 3600000);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    // Default to date
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Notifications</h3>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No new notifications</p>
              <p className="text-sm">Check back later for updates!</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="p-3 bg-muted/20 rounded-lg border border-border">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getIconForType(notification.type)}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTime(notification.time)}
                      </span>
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="h-auto p-0"
                        onClick={() => handleNotificationAction(notification)}
                      >
                        {notification.actionText}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Notification Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="new-drops">New Product Drops</Label>
              <p className="text-xs text-muted-foreground">Notify when new product drops are available</p>
            </div>
            <Switch 
              id="new-drops"
              checked={notificationSettings.newDrops}
              onCheckedChange={(checked) => updateNotificationSettings('newDrops', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="new-challenges">New Challenges</Label>
              <p className="text-xs text-muted-foreground">Notify when new challenges are posted</p>
            </div>
            <Switch 
              id="new-challenges"
              checked={notificationSettings.newChallenges}
              onCheckedChange={(checked) => updateNotificationSettings('newChallenges', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="nearby-eggs">Nearby Easter Eggs</Label>
              <p className="text-xs text-muted-foreground">Notify when easter eggs are nearby</p>
            </div>
            <Switch 
              id="nearby-eggs"
              checked={notificationSettings.nearbyEasterEggs}
              onCheckedChange={(checked) => updateNotificationSettings('nearbyEasterEggs', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="team-events">Team Events</Label>
              <p className="text-xs text-muted-foreground">Notify about upcoming team events</p>
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
