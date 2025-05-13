
import React from 'react';
import { MapElement } from '@/types/livemap';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Clock, Target, Trophy, MapPin, Gift, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ItemDetailsDialogProps {
  selectedItem: MapElement | null;
  onClose: () => void;
  onAction?: () => void;
}

const ItemDetailsDialog: React.FC<ItemDetailsDialogProps> = ({ 
  selectedItem, 
  onClose,
  onAction
}) => {
  if (!selectedItem) return null;

  const getIcon = () => {
    switch (selectedItem.type) {
      case 'easteregg': return <Gift className="h-5 w-5 text-yellow-500" />;
      case 'drop': return <Target className="h-5 w-5 text-blue-500" />;
      case 'challenge': return <Trophy className="h-5 w-5 text-red-500" />;
      case 'teamevent': return <Users className="h-5 w-5 text-purple-500" />;
      default: return <MapPin className="h-5 w-5" />;
    }
  };

  const getActionButton = () => {
    switch (selectedItem.type) {
      case 'easteregg': 
        return <Button onClick={onAction}>Collect Easter Egg</Button>;
      case 'drop': 
        return <Button onClick={onAction}>Claim Drop</Button>;
      case 'challenge': 
        return <Button onClick={onAction}>Join Challenge</Button>;
      case 'teamevent': 
        return <Button onClick={onAction}>Join Event</Button>;
      default: 
        return <Button onClick={onAction}>View Details</Button>;
    }
  };

  const getTypeLabel = () => {
    switch (selectedItem.type) {
      case 'easteregg': return 'Easter Egg';
      case 'drop': return 'Product Drop';
      case 'challenge': return 'Challenge';
      case 'teamevent': return 'Team Event';
      default: return 'Map Item';
    }
  };

  return (
    <Dialog open={Boolean(selectedItem)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg bg-jillr-dark border-jillr-border">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {getIcon()}
            <DialogTitle className="text-lg">{selectedItem.title}</DialogTitle>
          </div>
          <Badge variant="outline" className="self-start mt-1">
            {getTypeLabel()}
          </Badge>
        </DialogHeader>
        
        <div className="space-y-4">
          <AspectRatio ratio={16/9} className="bg-jillr-darkAccent rounded-md overflow-hidden">
            <img 
              src={`/assets/onboarding-${selectedItem.type === 'easteregg' ? 'rewards' : 
                selectedItem.type === 'challenge' ? 'intro' : 'map'}.webp`} 
              alt={selectedItem.title} 
              className="w-full h-full object-cover"
            />
          </AspectRatio>
          
          <DialogDescription>
            {selectedItem.description}
          </DialogDescription>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            {selectedItem.reward && (
              <div className="flex items-center gap-2 p-2 rounded-md bg-jillr-darkAccent">
                <Trophy className="h-4 w-4 text-jillr-neonGreen" />
                <span>{selectedItem.reward}</span>
              </div>
            )}
            
            {selectedItem.expiresIn && (
              <div className="flex items-center gap-2 p-2 rounded-md bg-jillr-darkAccent">
                <Clock className="h-4 w-4 text-jillr-neonPink" />
                <span>Expires in {selectedItem.expiresIn}</span>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>Close</Button>
          {getActionButton()}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailsDialog;
