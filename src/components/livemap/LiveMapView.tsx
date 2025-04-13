
import React, { useEffect, useRef, useState } from 'react';
import { useLiveMap } from '@/hooks/useLiveMap';
import { Button } from '@/components/ui/button';
import { Gift, Package, Target, Users, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Challenge } from '@/components/challenge/types';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { joinChallenge } from '@/utils/challenge';
import { useAuth } from '@/hooks/useAuth';

const LiveMapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const { mapData, activeMapElements, loadingMap } = useLiveMap();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // This would normally initialize the map using a mapping library like Mapbox or Leaflet
    // For now, we'll use a placeholder div with a background image for demonstration
    console.log("Map would initialize here with actual mapping library");
  }, []);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
  };

  const handleJoinChallenge = () => {
    if (selectedItem?.type === 'challenge') {
      joinChallenge(selectedItem.id, user, navigate);
    } else if (selectedItem?.type === 'drop') {
      toast({
        title: "Product Reserved!",
        description: `You've reserved ${selectedItem.title}. Pick it up within the next 24 hours!`,
      });
    } else if (selectedItem?.type === 'easteregg') {
      toast({
        title: "Easter Egg Found!",
        description: `You've unlocked ${selectedItem.reward}!`,
      });
    }
    setSelectedItem(null);
  };

  const getIconForItemType = (type: string) => {
    switch (type) {
      case 'easteregg': return <Gift className="text-yellow-500" />;
      case 'drop': return <Package className="text-blue-500" />;
      case 'challenge': return <Target className="text-red-500" />;
      case 'teamevent': return <Users className="text-purple-500" />;
      default: return <Info />;
    }
  };

  return (
    <div className="w-full h-[70vh] relative rounded-lg glassmorphism overflow-hidden">
      {loadingMap ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <>
          <div 
            ref={mapContainer} 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
              backgroundBlendMode: "overlay",
              backgroundColor: "rgba(0,0,0,0.3)"
            }}
          >
            {/* Map items would be dynamically positioned in a real implementation */}
            {activeMapElements.map((item) => (
              <div 
                key={item.id}
                className="absolute cursor-pointer hover-scale transition-all duration-300 hover:z-10"
                style={{ 
                  top: `${item.position.y}%`, 
                  left: `${item.position.x}%` 
                }}
                onClick={() => handleItemClick(item)}
              >
                <div className={`p-2 rounded-full ${
                  item.type === 'easteregg' ? 'bg-yellow-500/20 border-2 border-yellow-500' :
                  item.type === 'drop' ? 'bg-blue-500/20 border-2 border-blue-500' :
                  item.type === 'challenge' ? 'bg-red-500/20 border-2 border-red-500' :
                  'bg-purple-500/20 border-2 border-purple-500'
                }`}>
                  {getIconForItemType(item.type)}
                </div>
              </div>
            ))}
          </div>
          
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
        </>
      )}

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedItem && getIconForItemType(selectedItem.type)}
              {selectedItem?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedItem?.description}
              
              {selectedItem?.expiresIn && (
                <div className="mt-2 p-2 bg-muted rounded-md">
                  <p className="text-sm font-medium">Expires in: {selectedItem.expiresIn}</p>
                </div>
              )}
              
              {selectedItem?.reward && (
                <div className="mt-2 p-2 bg-amber-500/10 text-amber-400 rounded-md">
                  <p className="text-sm font-medium">Reward: {selectedItem.reward}</p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleJoinChallenge} className="neon-button">
              {selectedItem?.type === 'challenge' ? 'Join Challenge' : 
               selectedItem?.type === 'drop' ? 'Reserve Product' : 
               selectedItem?.type === 'easteregg' ? 'Claim Reward' : 'Participate'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LiveMapView;
