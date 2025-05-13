
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TimeFilterProps } from './types';

const TimeFilter: React.FC<TimeFilterProps> = ({ timeFilter, setTimeFilter }) => {
  return (
    <div className="space-y-2">
      <h5 className="text-xs text-white/70">Time</h5>
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={timeFilter === 'now' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setTimeFilter('now')}
        >
          Live Now
        </Badge>
        <Badge 
          variant={timeFilter === 'today' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setTimeFilter('today')}
        >
          Today
        </Badge>
        <Badge 
          variant={timeFilter === 'week' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setTimeFilter('week')}
        >
          This Week
        </Badge>
        <Badge 
          variant={timeFilter === 'all' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setTimeFilter('all')}
        >
          All Time
        </Badge>
      </div>
    </div>
  );
};

export default TimeFilter;
