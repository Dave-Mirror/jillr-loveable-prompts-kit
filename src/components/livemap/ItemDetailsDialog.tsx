
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Gift, Package, Target, Users, Info } from 'lucide-react';

interface ItemDetailsDialogProps {
  selectedItem: any;
  onClose: () => void;
  onAction: () => void;
}

const ItemDetailsDialog: React.FC<ItemDetailsDialogProps> = ({ 
  selectedItem, 
  onClose, 
  onAction 
}) => {
  if (!selectedItem) return null;

  const getIconForItemType = (type: string) => {
    switch (type) {
      case 'easteregg': return <Gift className="text-yellow-500" />;
      case 'drop': return <Package className="text-blue-500" />;
      case 'challenge': return <Target className="text-red-500" />;
      case 'teamevent': return <Users className="text-purple-500" />;
      default: return <Info />;
    }
  };

  const getActionText = () => {
    switch (selectedItem.type) {
      case 'challenge': return 'Join Challenge';
      case 'drop': return 'Reserve Product';
      case 'easteregg': return 'Claim Reward';
      default: return 'Participate';
    }
  };

  return (
    <Dialog open={!!selectedItem} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIconForItemType(selectedItem.type)}
            {selectedItem.title}
          </DialogTitle>
          <DialogDescription>
            {selectedItem.description}
            
            {selectedItem.expiresIn && (
              <div className="mt-2 p-2 bg-muted rounded-md">
                <p className="text-sm font-medium">Expires in: {selectedItem.expiresIn}</p>
              </div>
            )}
            
            {selectedItem.reward && (
              <div className="mt-2 p-2 bg-amber-500/10 text-amber-400 rounded-md">
                <p className="text-sm font-medium">Reward: {selectedItem.reward}</p>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onAction} className="neon-button">
            {getActionText()}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailsDialog;
