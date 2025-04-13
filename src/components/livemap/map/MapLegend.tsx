
import React from 'react';
import { Button } from '@/components/ui/button';
import { Gift, Package, Target, Users } from 'lucide-react';

const MapLegend = () => {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
      <Button size="sm" variant="secondary" className="bg-yellow-500/20 text-yellow-400 border border-yellow-500">
        <Gift className="mr-1 h-4 w-4" /> Easter Eggs
      </Button>
      <Button size="sm" variant="secondary" className="bg-blue-500/20 text-blue-400 border border-blue-500">
        <Package className="mr-1 h-4 w-4" /> Product Drops
      </Button>
      <Button size="sm" variant="secondary" className="bg-red-500/20 text-red-400 border border-red-500">
        <Target className="mr-1 h-4 w-4" /> Challenges
      </Button>
      <Button size="sm" variant="secondary" className="bg-purple-500/20 text-purple-400 border border-purple-500">
        <Users className="mr-1 h-4 w-4" /> Team Events
      </Button>
    </div>
  );
};

export default MapLegend;
