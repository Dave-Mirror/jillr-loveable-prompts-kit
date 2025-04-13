
import React from 'react';
import { Button } from '@/components/ui/button';
import { Map, Gift, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExplorePromoBanner = () => {
  const navigate = useNavigate();
  
  return (
    <div className="neon-card mb-6 cursor-pointer" onClick={() => navigate('/livemap')}>
      <div className="neon-card-content p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-jillr-neonPurple/20">
              <Map className="h-6 w-6 text-jillr-neonPurple" />
            </div>
            <div>
              <h3 className="font-bold">🆕 Live Map Now Available!</h3>
              <p className="text-sm text-muted-foreground">
                Discover hidden Easter eggs, exclusive drops, and challenge spots near you!
              </p>
            </div>
          </div>
          <Button size="sm" onClick={(e) => {
            e.stopPropagation();
            navigate('/livemap');
          }}>
            Explore Map <MapPin className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExplorePromoBanner;
