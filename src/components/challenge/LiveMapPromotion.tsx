
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Map, Gift, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LiveMapPromotion = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="glassmorphism border-0">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Map className="h-5 w-5 text-jillr-neonPurple" />
          Discover More on Live Map
        </CardTitle>
        <CardDescription>
          Find hidden Easter eggs and exclusive drops around you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Gift className="h-4 w-4 text-yellow-400" />
            <span className="text-sm">Easter Eggs</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-blue-400" />
            <span className="text-sm">Product Drops</span>
          </div>
        </div>
        <Button className="w-full" onClick={() => navigate('/livemap')}>
          Open Live Map
        </Button>
      </CardContent>
    </Card>
  );
};

export default LiveMapPromotion;
