
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface StatusBadgeProps {
  level: number;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ level }) => {
  if (level >= 10) {
    return (
      <Badge variant="outline" className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-300 text-black border-0">
        <Star className="h-3 w-3" />
        VIP Status
      </Badge>
    );
  }
  
  if (level >= 5 && level < 10) {
    return (
      <Badge variant="outline" className="flex items-center gap-1 bg-gradient-to-r from-slate-300 to-slate-100 text-black border-0">
        <Star className="h-3 w-3" />
        Premium Status
      </Badge>
    );
  }
  
  return null;
};

export default StatusBadge;
