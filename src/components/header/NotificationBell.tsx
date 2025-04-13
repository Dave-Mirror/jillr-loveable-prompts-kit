
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotificationBell: React.FC = () => {
  return (
    <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 bg-white/10 relative">
      <Bell size={18} />
      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-jillr-neonPink"></span>
    </Button>
  );
};

export default NotificationBell;
