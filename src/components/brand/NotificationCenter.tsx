
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  Play,
  AlertCircle,
  Bell,
  Eye,
  Download,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for notifications
const notifications = [
  {
    id: 1,
    type: 'ugc_completed',
    title: 'Top Creator Completed Your Challenge',
    description: '@dancerstar123 has completed your "Summer Dance" challenge.',
    userImage: 'https://i.pravatar.cc/150?img=1',
    timestamp: '2 hours ago',
    status: 'unread',
    action: 'View UGC',
    actionLink: '/ugc/12345',
  },
  {
    id: 2,
    type: 'ugc_trending',
    title: 'Your Challenge is Trending',
    description: 'Your "Product Showcase" challenge is gaining traction with 1,500+ views in the last hour.',
    userImage: '',
    timestamp: '3 hours ago',
    status: 'unread',
    action: 'See Stats',
    actionLink: '/stats/12345',
  },
  {
    id: 3,
    type: 'ugc_download',
    title: 'UGC Ready for Download',
    description: '5 new verified submissions are ready for download and use.',
    userImage: '',
    timestamp: '5 hours ago',
    status: 'read',
    action: 'Download',
    actionLink: '/download/12345',
  },
  {
    id: 4,
    type: 'sales_update',
    title: 'Sales Increase Detected',
    description: 'Your product sales have increased by 22% since the start of your challenge.',
    userImage: '',
    timestamp: '1 day ago',
    status: 'read',
    action: 'View Report',
    actionLink: '/sales/12345',
  },
];

// Helper function to render icon based on notification type
const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'ugc_completed':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'ugc_trending':
      return <Play className="h-5 w-5 text-jillr-neonPurple" />;
    case 'ugc_download':
      return <Download className="h-5 w-5 text-blue-500" />;
    case 'sales_update':
      return <ShoppingCart className="h-5 w-5 text-jillr-neonGreen" />;
    default:
      return <AlertCircle className="h-5 w-5 text-gray-500" />;
  }
};

const NotificationCenter = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <Badge variant="outline" className="px-2 py-1">
            {notifications.filter(n => n.status === 'unread').length} new
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`flex items-start gap-4 p-3 rounded-lg border ${
                notification.status === 'unread' 
                  ? 'bg-muted/30 border-jillr-neonPurple/30' 
                  : 'bg-background border-border'
              }`}
            >
              <div className="mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{notification.title}</h4>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {notification.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {notification.description}
                </p>
                <div className="mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                  >
                    {notification.type === 'ugc_completed' ? (
                      <Eye className="mr-1 h-3 w-3" />
                    ) : notification.type === 'ugc_download' ? (
                      <Download className="mr-1 h-3 w-3" />
                    ) : (
                      <></>
                    )}
                    {notification.action}
                  </Button>
                </div>
              </div>
              {notification.userImage && (
                <div className="flex-shrink-0">
                  <img
                    src={notification.userImage}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
